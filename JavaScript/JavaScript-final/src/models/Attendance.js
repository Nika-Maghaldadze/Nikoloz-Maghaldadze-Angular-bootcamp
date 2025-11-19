import { assertId, assertDateStringISO, assertEnum } from "../utils/validator.js";

export default class Attendance {
  constructor(id, enrollmentId, date, status = "present") {
    this.id = assertId(id, "attendance.id");
    this.enrollmentId = assertId(enrollmentId, "attendance.enrollmentId");
    this.date = assertDateStringISO(date, "attendance.date");
    this.status = assertEnum(
      status,
      ["present", "absent", "late", "excused"],
      "attendance.status"
    );
  }
}
