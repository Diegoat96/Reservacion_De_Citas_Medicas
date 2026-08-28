import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita, EstadoCita } from '../../models/cita';
import { CitasService } from '../../services/citas.service';

const OPCIONES_ESTADO: EstadoCita[] = ['Programada', 'Atendida', 'Cancelada'];
const OPCIONES_FILTRO: ('Todas' | EstadoCita)[] = [
  'Todas',
  ...OPCIONES_ESTADO,
];
const OPCIONES_SI_NO: boolean[] = [true, false];

@Component({
  selector: 'app-listado-citas',
  standalone: false,
  templateUrl: './listado-citas.component.html',
  styleUrl: './listado-citas.component.css',
})
export class ListadoCitasComponent implements OnInit {
  protected citas: Cita[] = [];
  protected filtro: 'Todas' | EstadoCita = 'Todas';
  protected indiceEdicion: number | null = null;
  protected formularioEdicion!: FormGroup;
  protected readonly OPCIONES_ESTADO = OPCIONES_ESTADO;
  protected readonly OPCIONES_FILTRO = OPCIONES_FILTRO;
  protected readonly OPCIONES_SI_NO = OPCIONES_SI_NO;

  constructor(
    private readonly citasService: CitasService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.actualizarCitas();
    this.inicializarFormulario();
  }

  protected get indicesFiltrados(): number[] {
    return this.citas
      .map((cita, indice) => ({ cita, indice }))
      .filter(({ cita }) => this.filtro === 'Todas' || cita.estado === this.filtro)
      .map(({ indice }) => indice);
  }

  protected citaEn(indice: number): Cita {
    return this.citas[indice];
  }

  protected estadoCss(estado: EstadoCita): string {
    return estado.toLowerCase();
  }

  protected cambiarFiltro(evento: Event): void {
    const seleccion = (evento.target as HTMLSelectElement).value;
    if (this.esOpcionDeFiltro(seleccion)) {
      this.filtro = seleccion;
      this.cancelarEdicion();
    }
  }

  protected iniciarEdicion(indice: number): void {
    const cita = this.citaEn(indice);
    this.indiceEdicion = indice;
    this.formularioEdicion.patchValue({
      nombrePaciente: cita.nombrePaciente,
      dpi: cita.dpi,
      correo: cita.correo ?? '',
      telefono: cita.telefono,
      especialidad: cita.especialidad,
      medico: cita.medico,
      fecha: cita.fecha,
      hora: cita.hora,
      motivoConsulta: cita.motivoConsulta,
      primeraConsulta: cita.primeraConsulta ?? false,
      estado: cita.estado,
    });
  }

  protected cancelarEdicion(): void {
    this.indiceEdicion = null;
  }

  protected guardarEdicion(): void {
    if (this.indiceEdicion === null || this.formularioEdicion.invalid) {
      return;
    }
    const cita: Cita = {
      ...this.formularioEdicion.value,
      correo: this.formularioEdicion.value.correo || undefined,
      primeraConsulta: this.formularioEdicion.value.primeraConsulta === true,
    };
    this.citasService.editarCita(this.indiceEdicion, cita);
    this.cancelarEdicion();
    this.actualizarCitas();
  }

  protected cambiarEstado(indice: number, estado: EstadoCita): void {
    const cita = this.citaEn(indice);
    if (cita.estado === estado) {
      return;
    }
    if (estado === 'Cancelada' && !confirm('¿Desea cancelar esta cita?')) {
      return;
    }
    this.citasService.cambiarEstado(indice, estado);
    this.cancelarEdicion();
    this.actualizarCitas();
  }

  protected eliminarCita(indice: number): void {
    const cita = this.citaEn(indice);
    const confirmar = confirm(
      `¿Desea eliminar la cita de ${cita.nombrePaciente}? Esta acción no se puede deshacer.`,
    );
    if (!confirmar) {
      return;
    }
    this.citasService.eliminarCita(indice);
    this.cancelarEdicion();
    this.actualizarCitas();
  }

  private esOpcionDeFiltro(valor: string): valor is 'Todas' | EstadoCita {
    return OPCIONES_FILTRO.includes(valor as 'Todas' | EstadoCita);
  }

  private actualizarCitas(): void {
    this.citas = this.citasService.obtenerCitas();
  }

  private inicializarFormulario(): void {
    this.formularioEdicion = this.fb.group({
      nombrePaciente: ['', Validators.required],
      dpi: ['', Validators.required],
      correo: ['', Validators.email],
      telefono: ['', Validators.required],
      especialidad: ['', Validators.required],
      medico: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivoConsulta: ['', Validators.required],
      primeraConsulta: [false],
      estado: ['Programada', Validators.required],
    });
  }
}
