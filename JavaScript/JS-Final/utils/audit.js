// FILE: utils/audit.js
export function auditWeights(assessments, tolerance = 0.01) {
    if (!Array.isArray(assessments)) {
        return {
            ok: false,
            totalWeight: 0,
            differenceFrom100: -100,
            violatingAssessments: [],
        };
    }
    const totalWeight = assessments.reduce((sum, a) => {
        const w = a && typeof a.weightPercent === "number" && !isNaN(a.weightPercent)
                ? a.weightPercent
                : 0;
        return sum + w;
    }, 0);

    const diff = totalWeight - 100;
    const ok = Math.abs(diff) <= tolerance;

    return {
        ok,
        totalWeight,
        differenceFrom100: diff,
        violatingAssessments: ok
            ? []
            : assessments
                  .filter((a) => a && typeof a.id !== "undefined")
                  .map((a) => a.id),
    };
}
