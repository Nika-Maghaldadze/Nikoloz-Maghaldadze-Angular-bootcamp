export class Subject {
    #id;
    #code;
    #name;
    #creditHours;
    #gradingSchemeId;
    #mode;
    constructor(id, code, name, creditHours, gradingSchemeId, mode) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.creditHours = creditHours;
        this.gradingSchemeId = gradingSchemeId;
        this.mode = mode;
    }
}
