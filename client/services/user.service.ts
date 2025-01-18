import { User } from "../models/user.model";
import api from "./api";

export class UserService {
    
    async create(user: User, siteIds?: number[]): Promise<User> {
        const payload = { ...user, sites: siteIds || [] }
        const response = await api.post<User>('/users', payload);
        return response.data
    }

    async login(email: string, senha: string): Promise<string> {
        const response = await api.post<{token: string}>('/login', { email, senha })
        return response.data.token
    }

    async getAll(): Promise<User[]> {
        const response = await api.get<User[]>('/users');
        return response.data;
    }

    async getById(userId: number): Promise<User> {
        const response = await api.get<User>(`/users/${userId}`)
        return response.data
    }

    async update(userId: number, userData: Partial<User>): Promise<User> {
        const response = await api.put<User>(`/users/${userId}`, userData)
        return response.data
    }

    async delete(userId: number): Promise<void> {
        await api.delete(`/users/${userId}`)
    }
}