export class Assessment {
    constructor({
        id,
        subjectId,
        termId,
        name,
        type,
        maxPoints,
        weightPercent,
        dueDate = null,
        locked = false
    }) {
        this.id = id;
        this.subjectId = subjectId;
        this.termId = termId;
        this.name = name;
        this.type = type;
        this.maxPoints = maxPoints;
        this.weightPercent = weightPercent;
        this.dueDate = dueDate;
        this.locked = locked;
    }
}
