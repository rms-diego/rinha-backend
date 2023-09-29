export class Exception {
  public readonly statusCode: number;

  constructor(statusCode = 500) {
    this.statusCode = statusCode;
  }
}
