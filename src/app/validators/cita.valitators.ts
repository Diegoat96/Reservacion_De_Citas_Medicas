import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CitasService } from '../services/citas.service';

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


//Citas:permitir editar una cita sin que choque consigo misma
export function horarioChoqueValidator(
  citasService: CitasService,
  obtenerIndiceActual: () => number | null
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const medico = formGroup.get('medico')?.value;
    const fecha = formGroup.get('fecha')?.value;
    const hora = formGroup.get('hora')?.value;
    if (!medico || !fecha || !hora) return null;
    const indiceActual = obtenerIndiceActual();
    const citas = citasService.obtenerCitas();
    const hayChoque = citas.some((cita, indice) =>
      indice !== indiceActual &&
      cita.medico === medico &&
      cita.fecha === fecha &&
      cita.hora === hora
    );
    return hayChoque ? { horarioChoque: true } : null;
  };
}