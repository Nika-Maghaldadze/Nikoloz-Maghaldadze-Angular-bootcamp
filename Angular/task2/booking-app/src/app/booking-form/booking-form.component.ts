import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Seat } from "../app.component";

@Component({
    selector: "app-booking-form",
    templateUrl: "./booking-form.component.html",
    styleUrls: ["./booking-form.component.scss"],
})
export class BookingFormComponent implements OnInit, OnChanges {
    @Input() selectedSeats: Seat[] = [];
    @Output() submitAllForms = new EventEmitter<void>();

    forms: { [seatCode: string]: FormGroup } = {};
    showErrors = false;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes["selectedSeats"]) {
            this.buildForms();
        }
    }

    buildForms() {
        this.selectedSeats.forEach((seat) => {
            if (!this.forms[seat.code]) {
                this.forms[seat.code] = new FormGroup({
                    firstName: new FormControl(
                        seat.user?.firstName || "",
                        Validators.required
                    ),
                    lastName: new FormControl(
                        seat.user?.lastName || "",
                        Validators.required
                    ),
                    age: new FormControl(seat.user?.age || "", [
                        Validators.required,
                        Validators.min(1),
                        Validators.max(100),
                    ]),
                });

                // update seat.user as user types
                this.forms[seat.code].valueChanges.subscribe((value) => {
                    if (this.forms[seat.code].valid) {
                        seat.user = value;
                    }
                });
            }
        });
    }

    onSubmit() {
        this.showErrors = true;

        const allValid = Object.values(this.forms).every((f) => f.valid);
        if (!allValid) return;

        this.submitAllForms.emit();
    }
}
