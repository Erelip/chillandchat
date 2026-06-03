    type User = {
        id: number;
        username: string;
        email: string;
        password: string;
    };

    export class GetUsers {
        async getUserByEmail(email: string) : Promise<User | null> {
            const user = Users.find((u) => u.email === email);
            return user || null;
        }
        async getUserByUsername(username: string) : Promise<User | null> {
            const user = Users.find((u) => u.username === username);
            return user || null;
        }
        async getUserById(id: string) : Promise<User | null> {
            const user = Users.find((u) => u.id === parseInt(id));
            return user || null;
        }
        async getAllUsers() : Promise<User[]> {
            return Users;
        }
    }

    const Users : User[] = [
        {
            id: 1,
            username: 'john_doe',
            email: 'john_doe@gmail.com',
            password: 'passwordjohn_doe',
        },
        {
            id: 2,
            username: 'jane_doe',
            email: 'jane_doe@gmail.com',
            password: 'passwordjane_doe',
        },
        {
            id: 3,
            username: 'bob_smith',
            email: 'bob_smith@gmail.com',
            password: 'passwordbob_smith',
        },
        {
            id: 4,
            username: 'alice_jones',
            email: 'alice_jones@gmail.com',
            password: 'passwordalice_jones',
        }

    ]