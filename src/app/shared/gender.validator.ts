import { AbstractControl } from '@angular/forms';

export function genderValidator(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /default/.test(control.value);

  return forbidden ? {forbiddenName: {value: control.value}} : null;
}
