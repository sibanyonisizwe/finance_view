import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Utility} from "../utils/utility";

export class CustomValidator {
  static min(min: number): ValidatorFn {
    return minValidator(min);
  }

  static max(max: number): ValidatorFn {
    return maxValidator(max);
  }
}

export function minValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null;  // don't validate empty values to allow optional controls
    }
    // const value = parseFloat(control.value);
    const value = Utility.currencyStringToNumber(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
    return !isNaN(value) && value < min ? {'min': {'min': min, 'actual': control.value}} : null;
  };
}

export function maxValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null;  // don't validate empty values to allow optional controls
    }
    const value = Utility.currencyStringToNumber(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
    return !isNaN(value) && value > max ? {'max': {'max': max, 'actual': control.value}} : null;
  };
}

function isEmptyInputValue(value: any): boolean {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  return value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}
