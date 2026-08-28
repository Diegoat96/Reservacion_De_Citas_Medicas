import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoCitasComponent } from './components/listado-citas/listado-citas.component';
import { FormularioCitaComponent } from './components/formulario-cita/formulario-cita.component';

const routes: Routes = [
  { path: '', component: ListadoCitasComponent },
  { path: 'nueva-cita', component: FormularioCitaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
