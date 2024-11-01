import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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

  constructor(
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<ProyectoService>,
    @Inject(MAT_DIALOG_DATA) public data: {
      crear: boolean;
      proyecto: Proyecto,
    },
  ){
    if(!this.data.crear){
      this.name = this.data.proyecto.name
      this.description = this.data.proyecto.description
      this.imagenUrl  = this.data.proyecto.imagenUrl
    }
  }
  name: string = '';
  description: string = '';
  imagenUrl: string = '';

  agregarProyecto() {
    const proyectoActualizado: Proyecto = {
      ...this.data.proyecto,
      name: this.name, // Actualiza el nombre
      description: this.description // Actualiza la descripción
    };

    if(this.data.crear){

      const nuevoProyecto: Proyecto = {
        id: Date.now().toString(), // Generar un ID único basado en la fecha actual
        name: this.name,
        description: this.description,
        tarea: [],
        imagenUrl: this.imagenUrl // Añadir el campo de imagen si es necesario
      };
      this.proyectoService.agregarProyecto(nuevoProyecto).subscribe(data => {
        console.log("agregar");
      });
    }else{
      this.proyectoService.actualizarProyecto(proyectoActualizado).subscribe()
    }
    this.dialogRef.close(proyectoActualizado); 
  }
}
