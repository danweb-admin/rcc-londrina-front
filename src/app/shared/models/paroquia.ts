import { Decanato } from "./decanato";

export interface Paroquia {
    id: number;
    name: string;
    address: string;
    neighborhood: string;
    city: string;
    decanatoId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    decanatoSetor: Decanato
}