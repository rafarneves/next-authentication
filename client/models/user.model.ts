import { Site } from "./site.model"

export interface User {
    id?: number
    nome: string
    email: string
    senha?: string
    createdAt?: Date
    sites?: Site[]
}