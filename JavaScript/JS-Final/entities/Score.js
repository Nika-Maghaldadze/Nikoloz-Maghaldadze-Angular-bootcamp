export class Score {
    constructor({
        id,
        assessmentId,
        studentId,
        points,
        recordedAt
    }){
        this.id = id;
        this.assessmentId = assessmentId;
        this.studentId = studentId;
        this.points = points;
        this.recordedAt = recordedAt;
    }
}