import { IsNotEmpty } from 'class-validator';

export class TodoCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
