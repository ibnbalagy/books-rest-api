import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto as CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '@shared/shared';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

}
