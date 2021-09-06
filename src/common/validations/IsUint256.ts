import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
const Web3 = require('web3');
const BN = Web3.utils.BN

export default function IsUint256(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUint256',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return +value < (Math.pow(2, 256) - 1)
        },
      },
    });
  };


}