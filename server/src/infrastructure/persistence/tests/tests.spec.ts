import { User } from "../../../core/entities/users.entity";
import { PrismaUserRepository } from "../repositories/user.prisma.repository";

describe('PrismaUserRepository', () => {
	const prisma = {
		user: {
			create: jest.fn(),
		},
	};

	it('should save user in database', async () => {
		prisma.user.create.mockResolvedValue({
			id: 'abc',
			username: 'kylian_mbappe',
			email: 'kylian_mbappe@gmail.com',
			password: 'abc',
			firstname: 'Kylian',
			lastname: 'Mbappe',
			phoneNumber: '0123456789',
		});

		const repo = new PrismaUserRepository(prisma as any);

		const user = new User(
			'abc',
			'kylian_mbappe',
			'kylian_mbappe@gmail.com',
			'abc',
			'Kylian',
			'Mbappe',
			'0123456789',
			null
		);

		await repo.save(user);

		expect(prisma.user.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				username: 'kylian_mbappe',
				email: 'kylian_mbappe@gmail.com',
			}),
		});
	});
});