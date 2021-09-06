import {HttpException, HttpStatus} from "@nestjs/common";

export default function (err) {
  const errorMessage = err.message;

  if (errorMessage.includes('execution reverted')) {
    // const errorCode = errorMessage.split(':')[2].trim();
    // const message = `Couldn't find data: ${errorCode}`;

    throw new HttpException({
      status: HttpStatus.OK,
      message: errorMessage
    }, HttpStatus.OK)
  } else {
    console.error(err);
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: errorMessage,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}