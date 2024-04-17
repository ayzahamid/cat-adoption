import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
  private userService: UserService;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    userService: UserService,
  ) {
    this.userService = userService;
  }

  async register(registerDto: RegisterDto) {
    const user = new User();
    user.username = registerDto.username;
    user.email = registerDto.email;
    user.password = await bcrypt.hash(registerDto.password, 10);
    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ jwt: string }> {
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid input');
    }
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (user) {
      const jwtPayload: JwtPayload = {id: user.id, email: user.email, password: user.password };
      const jwt = this.jwtService.sign(jwtPayload);
      return { jwt };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmailAndPassword(email, password);
    if (user) {
      return user;
    }
    return null;
  }
}
