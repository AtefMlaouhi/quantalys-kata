import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common';
import { IApiErrorResponse } from '@quantalys/shared/domain';
import { Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error: string = (exception as TypeORMError).message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database exception occurred';

    switch ((exception as TypeORMError).constructor) {
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        error = (exception as EntityNotFoundError).message;
        message = `Object not found`;
        break;
      case QueryFailedError:
        status = HttpStatus.BAD_REQUEST;
        error = (exception as QueryFailedError).message;
        message = error.toLowerCase().includes('unique')
          ? `Entity is not unique`
          : `Database query failed`;
        break;
    }
    response.status(status).json(generateErrorResponse(error, message));
  }
}

const generateErrorResponse = (error: string, message: string): IApiErrorResponse => ({
  message,
  error,
});
