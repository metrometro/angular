import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

const emailMask = /\S+@\S+\.\S+/;

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl<string>): ValidationErrors | null {
        return emailMask.test(control.value) ? null : { 'length': true };
    }
}
