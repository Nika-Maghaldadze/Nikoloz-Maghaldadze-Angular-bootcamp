export const policy = {
    tolerance: 0.01,
    lateCutoff: 14,
    incompleteDays: 14,
    normalize: false,
    attendanceThreshold: 0.8,
    minPassLetter: "D",
    allowScoreUpdateAfterLock: false,
    curve: { type: "none" },
    retakePolicy: "latest",
};

export function updatePolicy(updates) {
    Object.assign(policy, updates);
    return policy;
}
