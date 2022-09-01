import { AbstractControl, ValidationErrors } from '@angular/forms';

export function finishNotBeforeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const startDate = new Date(control.get('conditions.startDate')?.value);
  const finishDate = new Date(control.get('conditions.finishDate')?.value);
  if (startDate > finishDate) {
    return { 'Finish date before start date': true };
  }
  return null;
}
