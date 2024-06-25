import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('contra')?.value;
    const confirmPassword = control.get('contra2')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}