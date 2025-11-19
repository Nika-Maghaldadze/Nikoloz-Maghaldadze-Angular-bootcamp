export class LeaderboardService {
    constructor(gradingService) {
        this.grade = gradingService;
    }

    create(subjectId, termId, enrollmentRepo, studentRepo, subjectRepo) {
        const subject = subjectRepo.getById(subjectId);

        const enrolls = enrollmentRepo
            .getAll()
            .filter((e) => e.subjectId === subjectId && e.termId === termId);

        const list = [];
        for (const e of enrolls) {
            const raw = this.grade.computeFinalPercent({
                studentId: e.studentId,
                subjectId,
                termId,
            });
            const curved = this.grade.applyCurve(raw);

            list.push({
                student: studentRepo.getById(e.studentId),
                percent: curved,
                completedAt: e.completedAt,
            });
        }

        list.sort((a, b) => {
            if (b.percent !== a.percent) return b.percent - a.percent;
            if (a.completedAt && b.completedAt)
                return a.completedAt.localeCompare(b.completedAt);
            return a.student.lastName.localeCompare(b.student.lastName);
        });

        return list;
    }
}
