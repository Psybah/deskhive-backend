import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEmployeeDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/signup')
	@ApiOperation({ summary: 'Create a new user' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
	}

	@Post('/signup/employee')
	@ApiBearerAuth()
	@UseGuards(JwtGuard, AuthorizationGuard)
	// role decorator to set list of user roles that can access this endpoint - requires authorization guard
	@Role('ADMIN')
	@ApiOperation({ summary: 'Create a new admin or hub manager' })
	createEmployee(@Body() data: CreateEmployeeDto) {
		return this.userService.createEmployee(data);
	}

	@Get()
	@ApiBearerAuth()
	@UseGuards(JwtGuard, AuthorizationGuard)
	// role decorator to set list of user roles that can access this endpoint - requires authorization guard
	@Role(['ADMIN', 'HUB_MANAGER'])
	@ApiOperation({ summary: 'Get all users' })
	findAll() {
		return this.userService.findAll();
	}

	// boilerplate code from nestjs

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.userService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.userService.remove(+id);
	// }
}
