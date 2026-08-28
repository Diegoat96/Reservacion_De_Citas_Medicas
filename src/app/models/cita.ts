export type EstadoCita = 'Programada' | 'Atendida' | 'Cancelada';

export interface Cita {
  nombrePaciente: string;
  dpi: string;
  correo?: string;
  telefono: string;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  motivoConsulta: string;
  primeraConsulta?: boolean;
  estado: EstadoCita;
}
