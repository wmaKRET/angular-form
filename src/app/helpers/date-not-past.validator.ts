import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateNotPastValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control?.value) {
    const todaysDate = new Date();
    const startDate = new Date(control.value);
    if (startDate < todaysDate) {
      return { 'Invalid date': true };
    }
  }
  return null;
}
