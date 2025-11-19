import { round2 } from "../utils/math.js";

export class TranscriptService {
    constructor(
        enrollmentRepo,
        subjectRepo,
        termRepo,
        attendanceRepo,
        gradingService
    ) {
        this.enroll = enrollmentRepo;
        this.subject = subjectRepo;
        this.term = termRepo;
        this.att = attendanceRepo;
        this.grade = gradingService;
    }

    buildTranscript(studentId) {
        const enrollments = this.enroll
            .getAll()
            .filter((e) => e.studentId === studentId);

        const terms = {};

        for (const e of enrollments) {
            const t = this.term.getById(e.termId);
            const subj = this.subject.getById(e.subjectId);

            const raw = this.grade.computeFinalPercent({
                studentId,
                subjectId: e.subjectId,
                termId: e.termId,
            });
            const curved = this.grade.applyCurve(raw);
            const letter = this.grade.mapLetter(
                curved,
                subj.gradingSchemeId,
                subj.mode
            );
            const gpa = this.grade.mapGPA(
                letter,
                subj.gradingSchemeId,
                subj.mode
            );

            const attRate = this.computeAttendanceRate(
                studentId,
                e.subjectId,
                e.termId
            );

            if (!terms[t.id]) terms[t.id] = { term: t, rows: [] };

            terms[t.id].rows.push({
                subjectCode: subj.code,
                subjectName: subj.name,
                creditHours: subj.creditHours,
                finalPercent: round2(curved),
                letter,
                gpa,
                status: e.status,
                attempt: e.attemptNumber,
                attendanceRate: attRate,
            });
        }

        return terms;
    }

    computeAttendanceRate(studentId, subjectId, termId) {
        const recs = this.att
            .getAll()
            .filter(
                (a) =>
                    a.studentId === studentId &&
                    a.subjectId === subjectId &&
                    a.termId === termId
            );
        if (recs.length === 0) return 1;

        const policy = 0.5;
        let p = 0;
        for (const r of recs) {
            if (r.status === "P") p += 1;
            else if (r.status === "L") p += policy;
        }
        return p / recs.length;
    }
}
