export class Exception extends Error {
  public readonly statusCode: number;

  constructor(statusCode = 500, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
