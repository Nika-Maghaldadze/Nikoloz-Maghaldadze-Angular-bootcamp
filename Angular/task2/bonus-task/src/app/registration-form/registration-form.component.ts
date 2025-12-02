import { Component, Input, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";
import { FormField } from "./form-config";

@Component({
    selector: "app-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
    @Input() fields: FormField[] = [];
    form!: FormGroup;

    strength = 0;
    strengthLabel = "";
    errors: Record<string, string | null> = {};

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const controls: any = {};

        this.fields.forEach((field) => {
            const validators = [Validators.required];

            if (field.type === "email") validators.push(Validators.email);
            if (field.key === "password")
                validators.push(this.passwordValidator);
            if (field.key === "confirmPassword")
                validators.push(this.confirmPasswordValidator.bind(this));

            controls[field.key] = ["", validators];
            this.errors[field.key] = null;
        });

        this.form = this.fb.group(controls);
        Object.keys(this.form.controls).forEach((key) => {
            this.form.get(key)?.valueChanges.subscribe((value) => {
                this.validateField(key, value);
            });
        });
        this.form.get("password")?.valueChanges.subscribe((value) => {
            this.updateStrength(value || "");
            this.form
                .get("confirmPassword")
                ?.updateValueAndValidity({ emitEvent: false });
        });
    }
    passwordValidator(control: AbstractControl): ValidationErrors | null {
        const v = control.value || "";
        const valid =
            v.length >= 8 &&
            /[A-Z]/.test(v) &&
            /[0-9]/.test(v) &&
            /[^A-Za-z0-9]/.test(v);

        return valid ? null : { weakPassword: true };
    }

    confirmPasswordValidator(
        control: AbstractControl
    ): ValidationErrors | null {
        if (!control.parent) return null;

        const pass = control.parent.get("password")?.value;
        const confirm = control.value;
        return pass === confirm ? null : { mismatch: true };
    }

    validateField(key: string, value: string): void {
        const control = this.form.get(key);
        if (!control) return;

        if (control.hasError("required")) {
            this.errors[key] = "This field is required";
            return;
        }

        if (control.hasError("email")) {
            this.errors[key] = "Invalid email format";
            return;
        }

        if (control.hasError("weakPassword")) {
            this.errors[key] = "Password is too weak";
            return;
        }

        if (control.hasError("mismatch")) {
            this.errors[key] = "Passwords do not match";
            return;
        }

        this.errors[key] = null;
        return;
    }

    minLength(v: string): boolean {
        return v?.length >= 8;
    }
    hasUppercase(v: string): boolean {
        return /[A-Z]/.test(v);
    }
    hasNumber(v: string): boolean {
        return /[0-9]/.test(v);
    }
    hasSpecial(v: string): boolean {
        return /[^A-Za-z0-9]/.test(v);
    }

    updateStrength(value: string) {
        let score = 0;
        if (this.minLength(value)) score++;
        if (this.hasUppercase(value)) score++;
        if (this.hasNumber(value)) score++;
        if (this.hasSpecial(value)) score++;

        this.strength = score;

        this.strengthLabel =
            score === 0
                ? "Very Weak"
                : score === 1
                ? "Weak"
                : score === 2
                ? "Good"
                : score === 3
                ? "Strong"
                : "Very Strong";
    }

    submit() {
        if (this.form.invalid) return;
        console.log("Form submitted:", this.form.value);
        this.form.reset();
        this.strength = 0;
        this.strengthLabel = "";
        Object.keys(this.errors).forEach((key) => {
            this.errors[key] = null;
        });
        this.form
            .get("confirmPassword")
            ?.updateValueAndValidity({ emitEvent: false });
    }
}
