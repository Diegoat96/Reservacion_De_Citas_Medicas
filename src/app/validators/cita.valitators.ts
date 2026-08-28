import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// DPI: exactamente 13 dígitos, sin espacios ni guiones
export function dpiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // deja que 'required' maneje el vacío
    const valido = /^\d{13}$/.test(control.value);
    return valido ? null : { dpiInvalido: true };
  };
}

// Teléfono: acepta 8 dígitos, con o sin guion en medio (ej: 55510101 o 5551-0101)
export function telefonoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const valido = /^\d{4}-?\d{4}$/.test(control.value);
    return valido ? null : { telefonoInvalido: true };
  };
}

// Fecha: no puede ser anterior a hoy
export function fechaNoAnteriorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(control.value);
    return fechaSeleccionada < hoy ? { fechaInvalida: true } : null;
  };
}