import { GrupoOracao } from "./grupo-oracao";

export interface Servo {
    id: number;
    name: string;
    birthday: string;
    neighborhood: string;
    cpf: string;
    email: string;
    cellPhone: string;
    mainMinistry: string;
    secondaryMinistry: string;
    grupoOracaoId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    grupoOracao: GrupoOracao
}