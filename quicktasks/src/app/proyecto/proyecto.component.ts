import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TareaComponent } from "../tarea/tarea.component";
import { Proyecto } from '../interfaces/proyecto';
import { ProyectoService } from '../servicios/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule, TareaComponent,
    MatIconModule, MatTooltipModule
  ],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export class ProyectoComponent implements OnInit {
  constructor(
    private proyectoService: ProyectoService,
    public dialogTarea: MatDialog,
    public dialogProyecto: MatDialog
  ) {}

  crearTarea(): void {
    const dialogRef = this.dialogTarea.open(FormTareaComponent, {
      data: {
        crear: true,
        proyecto: this.proyecto,
      }
    });
  }



  ngOnInit(): void {
    console.log(this.proyecto);
    
  }
  @Input()
  proyecto!: Proyecto;


  actualizarProyecto() {
    const dialogRef = this.dialogProyecto.open(FormComponent, {
      data: {
        crear: false,
        proyecto: this.proyecto,
      },
    });
    dialogRef.afterClosed().subscribe((result: Proyecto) => {
      if (result) {
        this.proyectoService.actualizarProyecto(result).subscribe(data => {
          console.log(data);
        });
      }
    });
  }
  
  
  eliminarProyecto(id: string) {
    this.proyectoService.eliminarProyecto(id).subscribe(proyecto => {
      console.log("se actualiza el proyecto: " , proyecto);
    });
  }


  
}
