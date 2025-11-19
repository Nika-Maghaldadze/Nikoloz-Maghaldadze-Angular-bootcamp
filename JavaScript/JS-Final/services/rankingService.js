export class RankingService {
    constructor(transcriptService) {
        this.transcript = transcriptService;
    }

    rankTerm(termId, studentRepo) {
        const students = studentRepo.getAll();
        const list = [];

        for (const s of students) {
            const tr = this.transcript.buildTranscript(s.id);
            const term = tr[termId];
            if (!term) continue;

            const gpa = this.computeTermGPA(term.rows);
            const credits = this.computeCredits(term.rows);

            list.push({ student: s, gpa, credits });
        }

        list.sort((a, b) => {
            if (b.gpa !== a.gpa) return b.gpa - a.gpa;
            if (b.credits !== a.credits) return b.credits - a.credits;
            if (a.student.lastName !== b.student.lastName)
                return a.student.lastName.localeCompare(b.student.lastName);
            if (a.student.firstName !== b.student.firstName)
                return a.student.firstName.localeCompare(b.student.firstName);
            return a.student.id.localeCompare(b.student.id);
        });

        return list.map((e, i) => ({ rank: i + 1, ...e }));
    }

    computeTermGPA(rows) {
        let pts = 0;
        let cr = 0;
        for (const r of rows) {
            if (!r.gpa) continue;
            pts += r.gpa * r.creditHours;
            cr += r.creditHours;
        }
        if (cr === 0) return 0;
        return pts / cr;
    }

    computeCredits(rows) {
        return rows.reduce((s, r) => s + r.creditHours, 0);
    }
}
