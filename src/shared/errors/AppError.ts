export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }

  static notFound(message: string = 'Não encontrado') {
    return new AppError(message, 404);
  }

  static badRequest(message: string = 'Requisição inválida') {
    return new AppError(message, 400);
  }

  static conflict(message: string = 'Conflito') {
    return new AppError(message, 409);
  }
}
