import { Tarea } from "./tarea";

export interface Proyecto {
    id: string;
    name: string;
    description: string;
    imagenUrl:string;
    tarea: Tarea[]
}
