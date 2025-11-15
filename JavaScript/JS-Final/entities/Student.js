export class Student {
    #id;
    #firstName;
    #lastName;
    #gradeLevel;
    constructor(id, firstName, lastName, gradeLevel, gradeName = null, section = null) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#gradeLevel = gradeLevel;
        if(gradeName) {
            this.gradeName = gradeName;
        }
        if(section) {
            this.section = section;
        }
    }
}
