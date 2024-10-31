import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Proyecto } from '../interfaces/proyecto';
import { ProyectoService } from '../servicios/proyecto.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(private proyectoService: ProyectoService){}
  name: string = '';
  description: string = '';
  imagenUrl: string = '';

  agregarProyecto() {
    const nuevoProyecto: Proyecto = {
      id: Date.now().toString(), // Generar un ID único basado en la fecha actual
      name: this.name,
      description: this.description,
      tarea: [],
      imagenUrl: this.imagenUrl // Añadir el campo de imagen si es necesario
    };
    this.proyectoService.agregarProyecto(nuevoProyecto);
  }
}
