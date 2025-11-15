export class Enrollment {
    constructor({
        id,
        studentId,
        subjectId,
        termId,
        status = "active",
        createdAt,
        droppedAt = null,
        completedAt = null,
        attemptNumber = 1,
    }) {
        this.id = id;
        this.studentId = studentId;
        this.subjectId = subjectId;
        this.termId = termId;
        this.status = status;
        this.createdAt = createdAt;
        this.droppedAt = droppedAt;
        this.completedAt = completedAt;
        this.attemptNumber = attemptNumber;
    }
}
