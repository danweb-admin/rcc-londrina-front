import { Paroquia } from "./paroquia";

export interface GrupoOracao {
    id: string;
    name: string;
    paroquiaId: string;
    type: string;
    dayOfWeek: string;
    local: string;
    time: string;
    foundationDate: string;
    address: string;
    neighborhood: string;
    zipCode: string;
    decanatoId: string;
    city: string;
    email: string;
    site: string;
    telephone: string;
    active: boolean;
    numberOfParticipants: number;
    createdAt: string;
    updatedAt: string;
    formsUrl: string;
    csvUrl: string;
    paroquiaCapela: Paroquia;
}