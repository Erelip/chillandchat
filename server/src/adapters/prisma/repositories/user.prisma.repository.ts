import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '../../../core/interfaces/user.repository.interface';
import { User } from '../../../core/entities/users.entity';
import { UserMapper } from '../../../core/mappers/user.mapper';

@Injectable()
export class PrismaUserRepository
  implements UserRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(username: string, email: string, hashedPassword: string): Promise<User> {
		const userPrismaEntity = await this.prisma.user.create({
				data: {
          username: username,
          email: email,
          password: hashedPassword
        },
		});
    const domain = UserMapper.toDomain(userPrismaEntity)
    return domain;
	}

  async findAll(): Promise<User[]> {
    const userPrismaEntities = await this.prisma.user.findMany();
    return userPrismaEntities.map((user) => UserMapper.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userPrismaEntity) return null;
    return UserMapper.toDomain(userPrismaEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userPrismaEntity) return null;
    return UserMapper.toDomain(userPrismaEntity);
  }

  async findByUsername(username: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!userPrismaEntity) return null;
    return UserMapper.toDomain(userPrismaEntity);
  }

  async findAllButMe(id: string): Promise<User[]> {
    const userPrismaEntities = await this.prisma.user.findMany({
      where: {
        NOT: {
          id: id
        },
      },
    });
    return userPrismaEntities.map((user) => UserMapper.toDomain(user));
  }
}