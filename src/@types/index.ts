export type createPersonBody = {
  apelido: string;
  nome: string;
  nascimento: Date;
  stack: Array<string>;
};

export interface createPersonDTO extends createPersonBody {
  userId: string;
}
