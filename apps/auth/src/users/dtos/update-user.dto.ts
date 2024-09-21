import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { User } from "../../../../../libs/shared/src/entities/user.entity";

class UpdateUserDto extends PartialType(CreateUserDto) {}