import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/@types/enums';

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
