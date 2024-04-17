import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Validate } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      throw new HttpException({
        message: 'Input validation failed',
        errors: errors.map(error => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        })),
      }, HttpStatus.BAD_REQUEST);
    }

    const jwt = await this.authService.login(loginDto);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'Logged in successfully', jwt };
  }
}
