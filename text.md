- Transaction
- DTO de resposta
- Interface do repo
- get recommender

export class AppError extends Error {
constructor(
public message: string,
public statusCode = 400
) {
super(message);
}
}

export class NotFoundError extends AppError {
constructor(message = "Não encontrado") {
super(message, 404);
}
}

export class BadRequestError extends AppError {
constructor(message = "Requisição inválida") {
super(message, 400);
}
}

if (!user) {
throw new NotFoundError("Usuário não existe");
}

if (!passwordMatch) {
throw new BadRequestError("Senha inválida");
}
