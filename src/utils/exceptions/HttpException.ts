export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    if (code !== undefined) {
      this.code = code;
    }
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Ressource introuvable', code = 'NOT_FOUND') {
    super(404, message, code);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Requête invalide', code = 'BAD_REQUEST') {
    super(400, message, code);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Non authentifié', code = 'UNAUTHORIZED') {
    super(401, message, code);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Accès interdit', code = 'FORBIDDEN') {
    super(403, message, code);
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'Conflit', code = 'CONFLICT') {
    super(409, message, code);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Erreur interne du serveur', code = 'INTERNAL_ERROR') {
    super(500, message, code);
  }
}


