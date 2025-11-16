import { BaseRepository } from "./baseRepository.js";
export class AttendanceRepository extends BaseRepository {
    constructor() {
        super("attendance");
    }
}
export const attendanceRepo = new AttendanceRepository();
