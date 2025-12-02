import { Component } from "@angular/core";

export interface Seat {
    code: string;
    status: "available" | "selected" | "booked";
    user?: {
        firstName: string;
        lastName: string;
        age: number;
    };
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public seats: Seat[] = [];
    public selectedSeats: Seat[] = [];

    public rows = ["A", "B", "C", "D", "E"];
    public cols = [1, 2, 3, 4, 5, 6, 7, 8];

    ngOnInit() {
        const saved = localStorage.getItem("seats");
        if (saved) this.seats = JSON.parse(saved);
        else this.generateSeats();
    }

    generateSeats() {
        for (let row of this.rows) {
            for (let col of this.cols) {
                this.seats.push({
                    code: `${row}${col}`,
                    status: "available",
                });
            }
        }
    }

    getSeatsByRow(row: string) {
        return this.seats.filter((s) => s.code.startsWith(row));
    }

    onSeatClick(seat: Seat) {
        if (seat.status === "booked") return;

        if (seat.status === "available") {
            seat.status = "selected";
            seat.user = { firstName: "", lastName: "", age: 0 };
            this.selectedSeats = [...this.selectedSeats, seat];
        } else {
            seat.status = "available";
            seat.user = undefined;
            this.selectedSeats = this.selectedSeats.filter(
                (s) => s.code !== seat.code
            );
        }
    }

    saveSeatsToStorage() {
        localStorage.setItem("seats", JSON.stringify(this.seats));
    }

    onSubmitAllForms() {
        this.selectedSeats.forEach((s) => (s.status = "booked"));
        this.saveSeatsToStorage();
        this.selectedSeats = [];
    }
}
