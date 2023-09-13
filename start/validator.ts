import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('isDate', (value, _, options) => {
  if (new Date(value).toString() === 'Invalid date')
    options.errorReporter.report(
      options.pointer,
      'isDate',
      'isDate validation failed',
      options.arrayExpressionPointer
    )
})
