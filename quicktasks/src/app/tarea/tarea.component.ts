import { Component, Input } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Tarea } from '../interfaces/tarea';
import { MatButtonModule } from '@angular/material/button';
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
  @Input()
  tarea!: Tarea;
  panelOpenState = false;
}
