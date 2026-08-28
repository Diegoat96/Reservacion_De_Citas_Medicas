import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { FormularioCitaComponent } from './components/formulario-cita/formulario-cita.component';
import { ListadoCitasComponent } from './components/listado-citas/listado-citas.component';

@NgModule({
  declarations: [App, FormularioCitaComponent, ListadoCitasComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
