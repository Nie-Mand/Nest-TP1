export enum Status {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
  WAITING = 'WAITING',
}

export interface Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: Status;
}
