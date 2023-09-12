import { validator } from '@ioc:Adonis/Core/Validator'
import moment from 'moment'

validator.rule('isDate', (value, _, options) => {
  if (moment(value).toString() === 'Invalid date')
    options.errorReporter.report(
      options.pointer,
      'isDate',
      'isDate validation failed',
      options.arrayExpressionPointer
    )
})
