import { Hero } from "./hero";

export interface Response {
    exito: number;
    mensaje: string | null;
    dato: Hero[];
}
