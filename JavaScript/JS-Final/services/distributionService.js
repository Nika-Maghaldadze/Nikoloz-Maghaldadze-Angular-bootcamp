import { average, stddev } from "../utils/math.js";

export class DistributionService {
    constructor(gradingService) {
        this.grade = gradingService;
    }

    distribution(subjectId, termId, enrollmentRepo) {
        const enrolls = enrollmentRepo
            .getAll()
            .filter((e) => e.subjectId === subjectId && e.termId === termId);

        const values = enrolls.map((e) =>
            this.grade.applyCurve(
                this.grade.computeFinalPercent({
                    studentId: e.studentId,
                    subjectId,
                    termId,
                })
            )
        );

        return {
            values,
            average: average(values),
            median: this.median(values),
            stddev: stddev(values),
        };
    }

    median(arr) {
        if (arr.length === 0) return 0;
        const s = [...arr].sort((a, b) => a - b);
        const m = Math.floor(s.length / 2);
        if (s.length % 2 === 0) return (s[m - 1] + s[m]) / 2;
        return s[m];
    }
}
