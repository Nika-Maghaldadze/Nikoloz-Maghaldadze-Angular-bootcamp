// src/index.js
import StudentRepository from "./repositories/StudentRepository.js";
import SubjectRepository from "./repositories/SubjectRepository.js";
import TermRepository from "./repositories/TermRepository.js";
import AssessmentRepository from "./repositories/AssessmentRepository.js";
import ScoreRepository from "./repositories/ScoreRepository.js";
import EnrollmentRepository from "./repositories/EnrollmentRepository.js";
import AttendanceRepository from "./repositories/AttendanceRepository.js";
import GradingSchemeRepository from "./repositories/GradingSchemeRepository.js";

import ValidationService from "./services/ValidationService.js";
import CalculationService from "./services/CalculationService.js";
import PolicyManager from "./services/PolicyManager.js";
import SISService from "./services/SISService.js";
import CLI from "./cli/CLI.js";

function bootstrap() {
  const studentRepo = new StudentRepository();
  const subjectRepo = new SubjectRepository();
  const termRepo = new TermRepository();
  const assessmentRepo = new AssessmentRepository();
  const scoreRepo = new ScoreRepository();
  const enrollmentRepo = new EnrollmentRepository();
  const attendanceRepo = new AttendanceRepository();
  const gradingSchemeRepo = new GradingSchemeRepository();

  const repos = {
    students: studentRepo,
    subjects: subjectRepo,
    terms: termRepo,
    assessments: assessmentRepo,
    scores: scoreRepo,
    enrollments: enrollmentRepo,
    attendance: attendanceRepo,
    gradingSchemes: gradingSchemeRepo,
  };

  const validator = new ValidationService(repos);
  const policyManager = new PolicyManager(repos);
  const calculator = new CalculationService(repos, policyManager, validator);
  const sis = new SISService(repos, validator, calculator, policyManager);

  repos.gradingSchemes.createScheme({
    id: "A-F",
    name: "Standard A-F",
    mapping: {
      A: { min: 90, max: 100 },
      B: { min: 80, max: 89 },
      C: { min: 70, max: 79 },
      D: { min: 60, max: 69 },
      F: { min: 0, max: 59 },
    },
  });

  repos.terms.createTerm({
    name: "Fall 2024",
    startDate: "2024-09-01",
    endDate: "2024-12-20",
  });

  const cli = new CLI(sis);
  cli.start();
}

bootstrap();
