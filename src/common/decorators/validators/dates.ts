import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { isAfter, isEqual, isValid, startOfToday } from 'date-fns'

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return (
            isValid(new Date(value)) &&
            (isAfter(new Date(value), startOfToday()) ||
              isEqual(new Date(value), startOfToday()))
          )
        },
      },
    })
  }
}

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsAfterDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return relatedValue
            ? isAfter(new Date(value), new Date(relatedValue))
            : true
        },
      },
    })
  }
}
