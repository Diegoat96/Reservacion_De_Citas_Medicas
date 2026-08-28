import { Injectable } from '@angular/core';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private citas: Cita[] = [
    {
      nombrePaciente: 'Ana López',
      dpi: '1234567890101',
      correo: 'ana.lopez@example.com',
      telefono: '5551-0101',
      especialidad: 'Cardiología',
      medico: 'Dr. Mario Reyes',
      fecha: '2026-09-01',
      hora: '09:00',
      motivoConsulta: 'Chequeo de rutina',
      primeraConsulta: false,
      estado: 'Programada',
    },
    {
      nombrePaciente: 'Luis Pérez',
      dpi: '1234567890102',
      correo: 'luis.perez@example.com',
      telefono: '5551-0102',
      especialidad: 'Dermatología',
      medico: 'Dra. Carla Soto',
      fecha: '2026-09-01',
      hora: '10:30',
      motivoConsulta: 'Control de acné',
      primeraConsulta: true,
      estado: 'Atendida',
    },
    {
      nombrePaciente: 'María Gómez',
      dpi: '1234567890103',
      correo: 'maria.gomez@example.com',
      telefono: '5551-0103',
      especialidad: 'Pediatría',
      medico: 'Dr. Jorge Mena',
      fecha: '2026-09-02',
      hora: '11:00',
      motivoConsulta: 'Vacuna anual',
      primeraConsulta: false,
      estado: 'Cancelada',
    },
  ];

  constructor() {}

  obtenerCitas(): Cita[] {
    return [...this.citas];
  }

  agregarCita(cita: Cita): void {
    this.citas.push({ ...cita });
  }

  editarCita(indice: number, cita: Cita): void {
    if (indice >= 0 && indice < this.citas.length) {
      this.citas[indice] = { ...cita };
    }
  }

  eliminarCita(indice: number): void {
    if (indice >= 0 && indice < this.citas.length) {
      this.citas.splice(indice, 1);
    }
  }

  cambiarEstado(indice: number, estado: Cita['estado']): void {
    if (indice >= 0 && indice < this.citas.length) {
      this.citas[indice] = { ...this.citas[indice], estado };
    }
  }
}
