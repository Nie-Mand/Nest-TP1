import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
} from 'class-validator';

import { Status } from 'src/@types/enums';

export class TodoQueryDto {
  @IsOptional()
  text: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsNumberString()
  page: number;
}

export class TodoCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class TodoUpdateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
