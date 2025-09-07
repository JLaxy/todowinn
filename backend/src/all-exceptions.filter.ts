import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma';
import { PrismaClientValidationError } from 'generated/prisma/runtime/library';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Initialize default response
    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal Server Error',
    };

    // Handle Prisma errors first
    if (this.isPrismaError(exception)) {
      const prismaResponse = this.handlePrismaErrors(exception, request.url);
      response.status(prismaResponse.statusCode).json(prismaResponse);
      return; // stop further handling
    }

    // Handle HttpExceptions
    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    }

    // Send default response
    response.status(myResponseObj.statusCode).json(myResponseObj);
    super.catch(exception, host);
  }

  /**
   * Type guard for Prisma errors
   */
  private isPrismaError(exception: any): boolean {
    return (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof PrismaClientValidationError
    );
  }

  /**
   * Handles Prisma-specific errors
   */
  private handlePrismaErrors(exception: any, path: string): MyResponseObj {
    if (exception instanceof PrismaClientValidationError) {
      return {
        statusCode: 422,
        timestamp: new Date().toISOString(),
        path: '', // will be set in catch()
        response: exception.message.replace(/\n/g, ''),
      };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // map known request errors (P2002, P2025, etc.)
      let statusCode = HttpStatus.BAD_REQUEST;
      switch (exception.code) {
        case 'P2002':
          statusCode = 409; // Conflict
          break;
        case 'P2025':
          statusCode = 404; // Not found
          break;
      }
      return {
        statusCode,
        timestamp: new Date().toISOString(),
        path,
        response: exception.message.replace(/\n/g, ''),
      };
    }
    // fallback
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path,
      response: 'Prisma Error',
    };
  }
}
