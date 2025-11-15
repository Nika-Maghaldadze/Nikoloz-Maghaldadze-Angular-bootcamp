export class Attendance {
    constructor({
        id,
        studentId,
        subjectId,
        termId,
        date,
        status
    }){
        this.id = id;
        this.studentId = studentId;
        this.subjectId = subjectId;
        this.termId = termId;
        this.date = date;
        this.status = status;
    }
}