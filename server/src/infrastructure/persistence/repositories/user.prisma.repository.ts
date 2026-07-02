import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '../../../core/interfaces/user.repository.interface';
import { User } from '../../../core/entities/users.entity';
import { UserPrismaMapper } from '../mappers/user.prisma.mapper';

@Injectable()
export class PrismaUserRepository
  implements UserRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

	async save(user: User): Promise<User> {
		const userPrismaEntity = await this.prisma.user.create({
				data: {
          username: user.username,
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar
        },
		});
    const domain = UserPrismaMapper.toDomain(userPrismaEntity)
    return domain;
	}

	async update(user: User): Promise<User> {
		const userPrismaEntity = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar
      },
		});
    const domain = UserPrismaMapper.toDomain(userPrismaEntity)
    return domain;
	}

  async findAll(): Promise<User[]> {
    const userPrismaEntities = await this.prisma.user.findMany();
    return userPrismaEntities.map((user) => UserPrismaMapper.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userPrismaEntity) return null;
    return UserPrismaMapper.toDomain(userPrismaEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userPrismaEntity) return null;
    return UserPrismaMapper.toDomain(userPrismaEntity);
  }

  async findByUsername(username: string): Promise<User | null> {
    const userPrismaEntity = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!userPrismaEntity) return null;
    return UserPrismaMapper.toDomain(userPrismaEntity);
  }

  async findAllButMe(id: string): Promise<User[]> {
    const userPrismaEntities = await this.prisma.user.findMany({
      where: {
        NOT: {
          id: id
        },
      },
    });
    return userPrismaEntities.map((user) => UserPrismaMapper.toDomain(user));
  }
}