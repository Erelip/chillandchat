import { PrismaClient } from './generated/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { environment } from '../../../environments/environment.dev';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

	constructor() {
		const pool = new PrismaPg({ connectionString: environment.DATABASE_URL });
		super({ adapter: pool });
	}

	async onModuleInit() {
		await this.$connect();
	}
}