import { usuario } from "../models/usuario.model";
 
export class UsuarioRepository {
 
    private usuarios: usuario[] = [
        {
            id: 1,
            nombre: "Eduardo",
            email: "eduardo@gmail.com",
            rol: "admin"
        },
        {
            id: 2,
            nombre: "Carlos",
            email: "carlos@gmail.com",
            rol: "user"
        },
        {
            id: 3,
            nombre: "Ana",
            email: "ana@gmail.com",
            rol: "user"
        }
    ];
 
    obtenerTodos(): usuario[] {
 
        return this.usuarios;
 
    }
 
    obtenerPorId(id: number): usuario | undefined {
 
        return this.usuarios.find(
            usuario => usuario.id === id
        );
 
    }
 
}