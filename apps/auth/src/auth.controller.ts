import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize, User } from '@shared/shared';
import { UserDto } from './users/dtos/user.dto';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dtos/create-user.dto';
import { SigninDto } from './users/dtos/signin.dto';
import { CurrentUser } from '@shared/shared/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('signup')
  @Serialize(UserDto)
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
      const user = await this.authService.signup(createUserDto)
      session.userId = user.id
      return user
  }

  @Post('signin')
  @Serialize(UserDto)
  async signin(@Body() signinDto: SigninDto, @Session() session: any) {
      const user = await this.authService.signin(signinDto)
      console.log(session)
      session.userId = user.id
      return user
  }

  @Get()
  @Serialize(UserDto)
  getUsers() {
      return this.usersService.find({})
  }

  @Get('profile')
  @Serialize(UserDto)
  getUserProfile(@CurrentUser() user: User) {
    return user
  }
}
