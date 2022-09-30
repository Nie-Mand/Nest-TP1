import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  findAll(): string {
    console.log(`This action returns all premier`);
    return 'This action returns all premier';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(`This action returns a #${params.id} premier`);
    return `This action returns a #${params.id} premier`;
  }

  @Post()
  create(): string {
    console.log(`This action adds a new premier`);
    return 'This action adds a new premier';
  }

  @Put(':id')
  update(@Param() params): string {
    console.log(`This action updates a #${params.id} premier`);
    return `This action updates a #${params.id} premier`;
  }

  @Patch(':id')
  partialUpdate(@Param() params): string {
    console.log(`This action updates a #${params.id} premier, partially`);
    return `This action updates a #${params.id} premier, partially`;
  }

  @Delete(':id')
  remove(@Param() params): string {
    console.log(`This action removes a #${params.id} premier`);
    return `This action removes a #${params.id} premier`;
  }
}
