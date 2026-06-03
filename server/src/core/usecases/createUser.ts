type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

export class CreateUsers {
    async createUser(registerInput: { username: string; email: string; password: string }) : Promise<User | null> {
        const user = Users.find((u) => u.email === registerInput.email);
        if (user) return null;

        const newUser = {
            id: Users.length + 1,
            username: registerInput.username,
            email: registerInput.email,
            password: registerInput.password,
        };
        Users.push(newUser);
        return newUser;
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