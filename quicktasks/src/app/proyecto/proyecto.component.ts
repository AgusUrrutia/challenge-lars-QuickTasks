import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TareaComponent } from "../tarea/tarea.component";
import { Proyecto } from '../interfaces/proyecto';
import { ProyectoService } from '../servicios/proyecto.service';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule, TareaComponent,
  ],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export class ProyectoComponent implements OnInit {
  constructor(private proyectoService: ProyectoService) {}
  ngOnInit(): void {
    console.log(this.proyecto);
    
  }
  @Input()
  proyecto!: Proyecto;




  actualizarProyecto(proyecto: Proyecto) {
    const proyectoActualizado = { ...proyecto, name: 'Proyecto Modificado' };
    this.proyectoService.actualizarProyecto(proyectoActualizado);
  }
  
  eliminarProyecto(id: string) {
    this.proyectoService.eliminarProyecto(id);
  }
}
