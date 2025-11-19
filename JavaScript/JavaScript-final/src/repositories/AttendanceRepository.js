import Repository from "./Repository.js";
import Attendance from "../models/Attendance.js";

export default class AttendanceRepository extends Repository {
  constructor() {
    super("Attendance");
  }

  createAttendance(data) {
    const id = this.generateId();
    const attendance = new Attendance(
      id,
      data.enrollmentId,
      data.date,
      data.status
    );
    return this.create(attendance);
  }

  findByEnrollment(enrollmentId) {
    return this.findWhere((a) => a.enrollmentId === enrollmentId);
  }
}
