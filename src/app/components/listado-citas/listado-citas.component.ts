import { Component, OnInit } from '@angular/core';
import { Cita } from '../../models/cita';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-listado-citas',
  standalone: false,
  templateUrl: './listado-citas.component.html',
  styleUrl: './listado-citas.component.css',
})
export class ListadoCitasComponent implements OnInit {
  protected citas: Cita[] = [];

  constructor(private readonly citasService: CitasService) {}

  ngOnInit(): void {
    this.actualizarCitas();
  }

  protected estadoCss(estado: Cita['estado']): string {
    return estado.toLowerCase();
  }

  private actualizarCitas(): void {
    this.citas = this.citasService.obtenerCitas();
  }
}
