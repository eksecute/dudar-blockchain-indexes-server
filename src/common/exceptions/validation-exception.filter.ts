import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from "@nestjs/common";
import {Response} from "express";


@Catch(HttpException)
export default class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const responseBody = {
      statusCode,
      error: exception.response.error ? exception.response.error : undefined,
      message: exception.response.message ?
        Array.isArray(exception.response.message)
          ? exception.response.message.join('; ') : exception.response.message
        : undefined
    };

    response
      .status(statusCode)
      .json(responseBody)
  }
}