import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '../../../core/interfaces/user.repository.interface';
import { User } from '../entities/user';

@Injectable()
export class PrismaUserRepository
  extends UserRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

	async save(username: string, email: string, password: string): Promise<User> {
		const createdUser = await this.prisma.user.create({
				data: {
					username,
					email,
					password,
				},
		});
		return new User(
      createdUser.id,
      createdUser.username,
      createdUser.email,
      createdUser.password,
    );
	}

  async findAll(): Promise<User[]> {
    const createdUser = await this.prisma.user.findMany();
    return createdUser.map((user) => new User(
      user.id,
      user.username,
      user.email,
      user.password,
    ));
  }

  async findById(id: string): Promise<User | null> {
    const createdUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!createdUser) return null;
    return new User(
      createdUser.id,
      createdUser.username,
      createdUser.email,
      createdUser.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const createdUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!createdUser) return null;
    return new User(
      createdUser.id,
      createdUser.username,
      createdUser.email,
      createdUser.password,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const createdUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!createdUser) return null;
    return new User(
      createdUser.id,
      createdUser.username,
      createdUser.email,
      createdUser.password,
    );
  }
}