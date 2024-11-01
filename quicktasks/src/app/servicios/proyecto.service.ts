import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { Tarea } from '../interfaces/tarea';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private proyectosSubject = new BehaviorSubject<Proyecto[]>([]);
  proyectos$: Observable<Proyecto[]> = this.proyectosSubject.asObservable();
  private baseUrl = 'https://6724140e493fac3cf24d0da6.mockapi.io/api/v1/Project';

  constructor(private http: HttpClient) {}

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.baseUrl}`).pipe(
      switchMap((proyectos: Proyecto[]) => {
        const proyectosConTareas$ = proyectos.map(proyecto =>
          this.obtenerTareasPorProyectoId(proyecto.id).pipe(
            map((tareas: Tarea[]) => {
              proyecto.tarea = tareas; 
              return proyecto;
            }),
            catchError(error => {
              console.error(`Error al obtener tareas para el proyecto ${proyecto.id}:`, error);
              proyecto.tarea = [];
              return of(proyecto);
            })
          )
        );
  

        return forkJoin(proyectosConTareas$);
      }),
      tap((proyectosCompletos: Proyecto[]) => {
        this.proyectosSubject.next(proyectosCompletos);
      })
    );
  }
  
  obtenerTareasPorProyectoId(proyectoId: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.baseUrl}/${proyectoId}/Task`);
  }

  agregarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.baseUrl}`, proyecto).pipe(
      tap((nuevoProyecto: Proyecto) => {
        const proyectos = this.proyectosSubject.value;
        this.proyectosSubject.next([...proyectos, nuevoProyecto]);
      })
    );
  }

  actualizarProyecto(proyectoActualizado: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.baseUrl}/${proyectoActualizado.id}`, proyectoActualizado).pipe(
      tap((proyecto: Proyecto) => {
        const proyectos = this.proyectosSubject.value.map(p => 
          p.id === proyecto.id ? proyecto : p
        );
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  eliminarProyecto(proyectoId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${proyectoId}`).pipe(
      tap(() => {
        const proyectos = this.proyectosSubject.value.filter(p => p.id !== proyectoId);
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  agregarTarea(proyectoId: string, tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.baseUrl}/${proyectoId}/Task`, tarea).pipe(
      tap((nuevaTarea: Tarea) => {
        const proyectos = this.proyectosSubject.value.map(proyecto => {
          if (proyecto.id === proyectoId) {
            return { ...proyecto, tarea: [...proyecto.tarea, nuevaTarea] }; 
          }
          return proyecto;
        });
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  eliminarTarea(proyectoId: string, tareaId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${proyectoId}/Task/${tareaId}`).pipe(
      tap(() => {
        const proyectos = this.proyectosSubject.value.map(proyecto => {
          if (proyecto.id === proyectoId) {
            return {
              ...proyecto,
              tarea: proyecto.tarea.filter(tarea => tarea.id !== tareaId) 
            };
          }
          return proyecto;
        });
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  actualizarTarea(proyectoId: string, tareaActualizada: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.baseUrl}/${proyectoId}/Task/${tareaActualizada.id}`, tareaActualizada).pipe(
      tap((tarea: Tarea) => {
        const proyectos = this.proyectosSubject.value.map(proyecto => {
          if (proyecto.id === proyectoId) {
            const tareasActualizadas = proyecto.tarea.map(t => 
              t.id === tarea.id ? tarea : t
            );
            return { ...proyecto, tarea: tareasActualizadas };
          }
          return proyecto;
        });
        this.proyectosSubject.next(proyectos);
      })
    );
  }
}
