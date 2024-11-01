import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProyectoComponent } from "./proyecto/proyecto.component";
import { Proyecto } from './interfaces/proyecto';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { ProyectoService } from './servicios/proyecto.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProyectoComponent, MatButtonModule, MatIconModule,MatTooltipModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(
    private proyectoService: ProyectoService,
    public dialogProyecto: MatDialog
  ) {}

  ngOnInit(): void {
    this.proyectoService.obtenerProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    })

    this.proyectoService.proyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }
  




  crearProyecto() {
    const dialogRef = this.dialogProyecto.open(FormComponent, {
      data: {
        crear: true,
      },
    });
  }
}
