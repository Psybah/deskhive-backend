import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto, RefreshDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  	constructor(private readonly authService: AuthService) {}

	@Post('')
	@ApiOperation({ summary: 'Login User' })
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	@UseGuards(LocalGuard)
	async login(@Body() authDto: AuthDto, @Req() req) {
		return req.user;
	}

	@Post('refresh')
    @ApiOperation({ summary: 'Refresh Access token' })
    @UseGuards(AuthGuard('refresh'))
    async refresh(@Body() refreshDto: RefreshDto) {
        return this.authService.refresh(refreshDto.refreshToken);
    }
}
