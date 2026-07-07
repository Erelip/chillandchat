import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException, UnauthorizedException, BadRequestException } from '../../core/exceptions';

@Catch()
export class CoreExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof NotFoundException) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
      });
    }

    if (exception instanceof UnauthorizedException) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: exception.message,
      });
    }

    if (exception instanceof BadRequestException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: exception.message,
      });
    }

    throw exception;
  }
}