import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const roundsOfHashing = parseInt(process.env.SALT_ROUNDS);

@Injectable()
export class UserService {

	constructor (
		private prisma: PrismaService,
	) {}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	async createUser(createUserDto: CreateUserDto) {
		try {
			const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing);
			createUserDto.password = hashedPassword;
			const user = await this.prisma.user.create({
				data: createUserDto,
			});
			delete user.password; // Remove password from the response - we can properly format response later using response DTO's
			return {
				data: user,
				message: 'User created successfully',
			}
		}
		catch (error) {
			console.log(error)
			if (error.code === 'P2002') {
				throw new ConflictException('Email already exists');
			}
			throw new InternalServerErrorException('Internal server error');
		}
	}

	async createEmployee(data: CreateEmployeeDto) {
		try {
			const defaultPassword = crypto.randomBytes(5).toString('hex');
			const hashedPassword = await bcrypt.hash(defaultPassword, roundsOfHashing);
			
			const employee = await this.prisma.user.create({
				data: {
					...data,
					password: hashedPassword,
					isVerified: true,
				}
			});
			delete employee.password; // Remove password from the response - we can properly format response later using response DTO's
			return {
				data: {
					...employee,
					defaultPassword: defaultPassword,
				},
				"message": "Account created successfully",
			};
		} catch (error) {
			if (error.code === 'P2002') {
				throw new ConflictException('Email already exists');
			}
			throw new InternalServerErrorException('Internal server error');
		}
	}
	async findAll() {
		return await this.prisma.user.findMany({});
	}

	// boilerplate code from nestjs

	// findOne(id: number) {
	// 	return `This action returns a #${id} user`;
	// }

	// update(id: number, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
