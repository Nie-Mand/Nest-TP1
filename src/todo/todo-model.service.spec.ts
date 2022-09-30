import { Test, TestingModule } from '@nestjs/testing';
import { TodoModelService } from './todo-model.service';

describe('TodoModelService', () => {
  let service: TodoModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoModelService],
    }).compile();

    service = module.get<TodoModelService>(TodoModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
