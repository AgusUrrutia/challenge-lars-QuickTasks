import { Component, Inject } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { ProyectoService } from '../servicios/proyecto.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Proyecto } from '../interfaces/proyecto';

@Component({
  selector: 'app-form-tarea',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './form-tarea.component.html',
  styleUrl: './form-tarea.component.scss'
})
export class FormTareaComponent {

  constructor(
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<ProyectoService>,
    @Inject(MAT_DIALOG_DATA) public data: {
      crear: boolean;
      proyecto: Proyecto,
      tarea: Tarea
    },
  ){
    if(!this.data.crear){
      this.name = this.data.tarea.name
      this.description = this.data.tarea.descripcion
    }
  }

  name: string = '';
  description: string = '';




  crearTarea() {
    let newId = "";
    const tareaActualizada: Tarea = {
      ...this.data.tarea,
      name: this.name, // Actualiza el nombre
      descripcion: this.description // Actualiza la descripción
    };

    if(this.data.crear){
      // Crear nueva tarea
      newId = (this.data.proyecto.tarea.length + 1).toString();
      const tareaCreada: Tarea = { 
        idProyecto: this.data.proyecto.id, 
        id: newId, 
        name: this.name, 
        descripcion: this.description 
      };
      this.proyectoService.agregarTarea(this.data.proyecto.id, tareaCreada).subscribe(proyecto => {
        console.log("se actualiza el proyecto: " , proyecto);
        
      });;
    } else {
      this.proyectoService.actualizarTarea(this.data.proyecto.id, tareaActualizada).subscribe();
    }
    this.dialogRef.close(tareaActualizada); 
  }




}
