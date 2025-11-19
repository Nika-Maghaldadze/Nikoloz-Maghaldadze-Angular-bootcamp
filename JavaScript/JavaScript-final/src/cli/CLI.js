import readline from "node:readline";
import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../utils/errors.js";

export default class CLI {
  constructor(sisService) {
    this.sis = sisService;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question(prompt) {
    return new Promise((resolve) => this.rl.question(prompt, resolve));
  }

  async start() {
    console.log("=== School SIS CLI ===");

    let exit = false;
    while (!exit) {
      console.log("1) List students");
      console.log("2) Create student");
      console.log("3) List subjects");
      console.log("4) Create subject");
      console.log("5) Enroll student");
      console.log("6) Compute GPA for student");
      console.log("7) Create term");
      console.log("0) Exit");

      const choice = (await this.question("Select: ")).trim();

      try {
        switch (choice) {
          case "1":
            await this.handleListStudents();
            break;
          case "2":
            await this.handleCreateStudent();
            break;
          case "3":
            await this.handleListSubjects();
            break;
          case "4":
            await this.handleCreateSubject();
            break;
          case "5":
            await this.handleEnrollStudent();
            break;
          case "6":
            await this.handleComputeGPA();
            break;
          case "7":
            await this.handleCreateTerm();
            break;
          case "0":
            exit = true;
            break;
          default:
            console.log("Unknown option");
        }
      } catch (err) {
        this.handleError(err);
      }
    }

    this.rl.close();
    console.log("Bye.");
  }

  handleError(err) {
    if (
      err instanceof ValidationError ||
      err instanceof NotFoundError ||
      err instanceof ConflictError
    ) {
      console.log(`Error: ${err.message}`);
    } else {
      console.error("Unexpected error:", err);
    }
  }

  async handleListStudents() {
    const students = this.sis.listStudents();
    console.log("\nStudents:");
    if (students.length === 0) {
      console.log("  (none)");
      return;
    }
    for (const s of students) {
      console.log(
        `  [${s.id}] ${s.firstName} ${s.lastName} - grade: ${s.gradeLevel}`
      );
    }
  }

  async handleCreateStudent() {
    const firstName = await this.question("First name: ");
    const lastName = await this.question("Last name: ");
    const gradeLevel = await this.question(
      "Grade level (e.g. 9, 10, Bachelor-1): "
    );
    const guardianName = await this.question("Guardian name (optional): ");
    const email = await this.question("Email (optional): ");

    const student = this.sis.createStudent({
      firstName,
      lastName,
      gradeLevel,
      meta: { guardianName, email },
    });

    console.log("Created student:", student);
  }

  async handleListSubjects() {
    const subjects = this.sis.listSubjects();
    console.log("\nSubjects:");
    if (subjects.length === 0) {
      console.log("  (none)");
      return;
    }
    for (const s of subjects) {
      console.log(
        `  [${s.id}] ${s.code} - ${s.name} (${s.creditHours} credits, scheme=${s.gradingSchemeId})`
      );
    }
  }

  async handleCreateSubject() {
    const code = await this.question("Code (e.g. MATH101): ");
    const name = await this.question("Name: ");
    const creditHours = await this.question("Credit hours: ");
    const gradingSchemeId = await this.question("Grading scheme id: ");
    const mode = await this.question("Mode (graded/passfail) [graded]: ");

    const subject = this.sis.createSubject({
      code,
      name,
      creditHours,
      gradingSchemeId,
      mode: mode || "graded",
    });

    console.log("Created subject:", subject);
  }

  async handleEnrollStudent() {
    const studentId = Number(await this.question("Student id: "));
    const subjectId = Number(await this.question("Subject id: "));
    const termId = Number(await this.question("Term id: "));
    const attemptNumber = Number(
      (await this.question("Attempt number [1]: ")) || "1"
    );

    const enrollment = this.sis.enrollStudent(
      studentId,
      subjectId,
      termId,
      attemptNumber
    );

    console.log("Enrollment created:", enrollment);
  }

  async handleComputeGPA() {
    const studentId = Number(await this.question("Student id: "));
    const gpa = this.sis.getGPAForStudent(studentId);
    console.log(`GPA for student ${studentId}: ${gpa.toFixed(2)}`);
  }

  async handleCreateTerm() {
    console.log("\n=== Create Term ===");

    const name = await this.question("Term name (e.g. Fall 2024): ");
    const startDate = await this.question("Start date (YYYY-MM-DD): ");
    const endDate = await this.question("End date (YYYY-MM-DD): ");

    try {
      const term = this.sis.createTerm({
        name,
        startDate,
        endDate,
      });

      console.log("Created term:", term);
    } catch (err) {
      this.handleError(err);
    }
  }
}
