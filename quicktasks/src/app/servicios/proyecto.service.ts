import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private proyectosSubject = new BehaviorSubject<Proyecto[]>([]);
  proyectos$: Observable<Proyecto[]> = this.proyectosSubject.asObservable();

  constructor() {
    const proyectosIniciales: Proyecto[] = [
      {
        id: "1",
        name: "Proyecto Alpha",
        description: "Este es el primer proyecto de ejemplo, con varias tareas asignadas.",
        imagenUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg", // URL de imagen
        tarea: [
          { id: "1", name: "Tarea 1.1", descripcion: "Completar el análisis inicial del proyecto." },
          { id: "2", name: "Tarea 1.2", descripcion: "Reunión con el equipo para definir requisitos." },
          { id: "3", name: "Tarea 1.3", descripcion: "Desarrollar prototipos iniciales." }
        ]
      },
      {
        id: "2",
        name: "Proyecto Beta",
        description: "Proyecto para implementar mejoras en el sistema actual.",
        imagenUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg", // URL de imagen
        tarea: [
          { id: "1", name: "Tarea 2.1", descripcion: "Realizar investigación de mercado." },
          { id: "2", name: "Tarea 2.2", descripcion: "Actualizar la documentación técnica." }
        ]
      },
      {
        id: "3",
        name: "Proyecto Gamma",
        description: "Desarrollo de una aplicación web interactiva.",
        imagenUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg", // URL de imagen
        tarea: [
          { id: "1", name: "Tarea 3.1", descripcion: "Configurar entorno de desarrollo." },
          { id: "2", name: "Tarea 3.2", descripcion: "Crear estructura inicial del frontend." },
          { id: "3", name: "Tarea 3.3", descripcion: "Integrar API de autenticación de usuarios." },
          { id: "4", name: "Tarea 3.4", descripcion: "Realizar pruebas de usabilidad." }
        ]
      }
    ];
    this.proyectosSubject.next(proyectosIniciales);
  }

  agregarProyecto(proyecto: Proyecto): void {
    const proyectos = this.proyectosSubject.value;
    this.proyectosSubject.next([...proyectos, proyecto]);
  }


  actualizarProyecto(proyectoActualizado: Proyecto): void {
    const proyectos = this.proyectosSubject.value.map(proyecto =>
      proyecto.id === proyectoActualizado.id ? proyectoActualizado : proyecto
    );
    this.proyectosSubject.next(proyectos);
  }

  eliminarProyecto(proyectoId: string): void {
    const proyectos = this.proyectosSubject.value.filter(proyecto => proyecto.id !== proyectoId);
    this.proyectosSubject.next(proyectos);
  }
}
