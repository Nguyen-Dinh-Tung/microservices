import { registerDecorator, ValidationOptions } from 'class-validator';
import { regexPhoneNumber } from 'src/common/regex/phone-number.regex';

export function IsVietnamPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MinStringNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return regexPhoneNumber.test(value);
        },
        defaultMessage() {
          return `${propertyName} is not format phone number`;
        },
      },
    });
  };
}
