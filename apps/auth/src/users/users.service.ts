import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { Errors, User } from '@shared/shared';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async create(createUserDto: CreateUserDto) {
        const [exists] = await this.usersRepository.find({ email: createUserDto.email })
        if (exists) {
            throw new BadRequestException(Errors.EMAIL_IN_USE)
        }
        const user = new User(createUserDto)
        return this.usersRepository.create(user)
    }

    async find(where: FindOptionsWhere<User>): Promise<User[]> {
        return this.usersRepository.find(where)
    }

    async findOne(where: FindOptionsWhere<User>): Promise<User> {
        return this.usersRepository.findOne(where)
    }
}
