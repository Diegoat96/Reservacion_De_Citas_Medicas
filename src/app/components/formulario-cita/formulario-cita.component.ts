import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';
import { CitasService } from '../../services/citas.service';
import {
  dpiValidator,
  telefonoValidator,
  fechaNoAnteriorValidator,
  horarioChoqueValidator
  
} from '../../validators/cita.valitators';

@Component({
  selector: 'app-formulario-cita',
  standalone: false,
  templateUrl: './formulario-cita.component.html',
  styleUrl: './formulario-cita.component.css'
})
export class FormularioCitaComponent {

  @Output() citaCreada = new EventEmitter<Cita>();

  especialidades: string[] = [
    'Medicina general',
    'Pediatría',
    'Odontología',
    'Psicología',
    'Nutrición'
  ];

  medicos: string[] = [
    'Dr. Carlos Ramírez',
    'Dra. Ana López',
    'Dr. Luis Morales',
    'Dra. Sofía Herrera',
    'Dr. Jorge Pineda'
  ];

  horas: string[] = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00'
  ];

  citaForm: FormGroup;

  constructor(private fb: FormBuilder, private citasService: CitasService) {
    this.citaForm = this.fb.group(
      {
        nombrePaciente: ['', [Validators.required, Validators.minLength(5)]],
        dpi: ['', [Validators.required, dpiValidator()]],
        correo: ['', [Validators.email]],
        telefono: ['', [Validators.required, telefonoValidator()]],
        especialidad: ['', Validators.required],
        medico: ['', Validators.required],
        fecha: ['', [Validators.required, fechaNoAnteriorValidator()]],
        hora: ['', Validators.required],
        motivoConsulta: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200)
        ]],
        primeraConsulta: [false]
      },
      {
        // Valida que no exista otra cita con el mismo médico, fecha y hora.
        // obtenerIndiceActual retorna null porque aquí siempre es un registro nuevo.
        validators: horarioChoqueValidator(this.citasService, () => null)
      }
    );
  }

  get contadorMotivo(): number {
    return this.citaForm.get('motivoConsulta')?.value?.length || 0;
  }

  get f() {
    return this.citaForm.controls;
  }

onSubmit(): void {
  if (this.citaForm.invalid) {
    this.citaForm.markAllAsTouched();
    return;
  }

  const nuevaCita: Cita = {
    ...this.citaForm.value,
    estado: 'Programada'
  };

  this.citasService.agregarCita(nuevaCita);
  this.citaCreada.emit(nuevaCita);
  this.citaForm.reset({ primeraConsulta: false });
}
}