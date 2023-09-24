// create user types
export type CreatePersonBody = {
  apelido: string;
  nome: string;
  nascimento: Date;
  stack: Array<string>;
};

export interface CreatePersonDTO extends CreatePersonBody {
  userId: string;
}

// find by id types

export type FindByIdParams = {
  id: string;
};

export type UserFound = {
  id: string;
  name: string;
  nickname: string;
  birth_date: Date;
  stacks: string[];
};
