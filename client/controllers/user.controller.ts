import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {

    private userService: UserService

    constructor() {
        this.userService = new UserService();
    }

    async registerUser(nome: string, email: string, senha: string, siteIds?: number[]): Promise<string> {
        try {
            const user: User = { nome, email, senha };
            await this.userService.create(user, siteIds)
            return 'Usuário(a) cadastrado(a) com sucesso.'
        } catch (error: any) {
            return error.response?.data?.erro
        }
    }

    async loginUser(email: string, senha: string): Promise<string> {
        try {
            return await this.userService.login(email, senha)
        } catch (error: any) {
            return error.response?.data?.erro
        }
    }

    async fetchUsers(): Promise<User[] | string> {
        try {
            return await this.userService.getAll()
        } catch (error: any) {
            return error.response?.data?.erro;
        }
    }

    async fetchUserById(userId: number): Promise<User | string> {
        try {
            return await this.userService.getById(userId)
        } catch (error: any) {
            return error.response?.data?.erro;
        }
    }

    async updateUser(userId: number, userData: Partial<User>): Promise<string> {
        try {
            await this.userService.update(userId, userData)
            return 'Usuário(a) atualizado(a) com sucesso.'
        } catch (error: any) {
            return error.response?.data?.erro;
        }
    }

    async deleteUser(userId: number): Promise<string> {
        try {
            await this.userService.delete(userId)
            return 'Usuário(a) excluído com sucesso'
        } catch (error: any) {
            return error.response?.data?.erro;
        }
    }
}