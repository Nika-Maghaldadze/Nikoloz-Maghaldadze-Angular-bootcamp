import { NotFoundError } from "../utils/errors.js";
import { round4 } from "../utils/math.js";

export class GradingService {
    constructor(assessmentRepo, scoreRepo, schemeRepo, policyService, now) {
        this.assessmentRepo = assessmentRepo;
        this.scoreRepo = scoreRepo;
        this.schemeRepo = schemeRepo;
        this.policy = policyService;
        this.now = now;
    }

    computeFinalPercent({ studentId, subjectId, termId }) {
        const now = this.now();
        const policy = this.policy.get();

        const assessments = this.assessmentRepo
            .getAll()
            .filter((a) => a.subjectId === subjectId && a.termId === termId);

        let total = 0;

        for (const a of assessments) {
            const score = this.scoreRepo.findByAssessmentAndStudent(
                a.id,
                studentId
            );

            if (score) {
                total += (score.points / a.maxPoints) * a.weightPercent;
                continue;
            }

            if (!a.dueDate) {
                continue;
            }

            if (now > a.dueDate && policy.treatMissingAsZeroAfterDue) {
                total += 0 * a.weightPercent;
            }
        }

        return round4(total);
    }

    applyCurve(raw) {
        const curve = this.policy.get().curve;
        if (!curve || curve.type === "none") return raw;

        if (curve.type === "linear") {
            const lifted = raw + curve.addPercent;
            return Math.min(lifted, curve.maxCap ?? 100);
        }

        return raw;
    }

    mapLetter(percent, schemeId, subjectMode) {
        if (subjectMode === "passfail") return null;

        const scheme = this.schemeRepo.getById(schemeId);
        if (!scheme) throw NotFoundError("GradingScheme", schemeId);

        for (const bp of scheme.breakpoints) {
            if (percent >= bp.minPercent) return bp.letter;
        }
        return scheme.breakpoints.at(-1).letter;
    }

    mapGPA(letter, schemeId, subjectMode) {
        if (subjectMode === "passfail") return 0;
        const scheme = this.schemeRepo.getById(schemeId);
        const bp = scheme.breakpoints.find((b) => b.letter === letter);
        return bp.gpaPoints;
    }
}
