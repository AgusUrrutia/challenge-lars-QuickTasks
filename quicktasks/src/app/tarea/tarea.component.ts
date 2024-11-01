import { Component, Input } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Tarea } from '../interfaces/tarea';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';
import { Proyecto } from '../interfaces/proyecto';
import { ProyectoService } from '../servicios/proyecto.service';
@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  constructor(private proyectoService: ProyectoService,public dialog: MatDialog){}
  @Input()
  tarea!: Tarea;

  @Input()
  proyecto!: Proyecto;

  panelOpenState = false;


  eliminarTarea(): void {
    this.proyectoService.eliminarTarea(this.proyecto.id, this.tarea.id).subscribe(tarea => {
      console.log("se actualiza el tarea: " , tarea);
      
    });;
  }

  editarTarea(): void {
    const dialogRef = this.dialog.open(FormTareaComponent, {
      data: {
        crear: false,
        proyecto: this.proyecto,
        tarea: this.tarea
      },
    });
    dialogRef.afterClosed().subscribe((result: Tarea) => {
      if (result) {
        this.proyectoService.actualizarTarea(this.proyecto.id, result).subscribe(data => {
          console.log(data);
          
        });
      }
    });
  }
}
