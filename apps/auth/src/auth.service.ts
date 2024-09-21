import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './users/dtos/create-user.dto';
import { UsersService } from './users/users.service';
import { Errors, AuthUtils, User } from '@shared/shared';
import { SigninDto } from './users/dtos/signin.dto';

@Injectable()
export class AuthService {
  logger: Logger = new Logger(AuthService.name)
  constructor(
    private readonly usersService: UsersService
  ) { }

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto
    const users = await this.usersService.find({ email })
    if (users.length) {
      this.logger.warn(Errors.EMAIL_IN_USE,)
      throw new BadRequestException(Errors.EMAIL_IN_USE)
    }

    const salt = AuthUtils.saltify()
    const hash = await AuthUtils.hash(password, salt)
    const encryptedPassword = AuthUtils.encrypt(salt, hash)
    createUserDto.password = encryptedPassword
    const user = new User(createUserDto)
    return this.usersService.create(user)
  }

  async signin({ email, password }: SigninDto) {
    const [user] = await this.usersService.find({ email })
    if (!user) {
      throw new BadRequestException(Errors.INVALID_CREDENTIAL)
    }

    const [salt, storedHash] = user.password.split('.')
    const hash = await AuthUtils.hash(password, salt)
    if (storedHash !== hash.toString()) {
      throw new BadRequestException(Errors.INVALID_CREDENTIAL)
    }

    return user
  }
}
