import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserInstrumentValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    instrument_ids: schema
      .array()
      .members(schema.number([rules.exists({ table: 'instruments', column: 'id' })])),
  })

  public messages: CustomMessages = {
    'instrument_ids.array': 'Instruments is invalid',
    'instrument_ids.required': 'Instruments required',
    'instrument_ids.*.number': 'Instruments is invalid',
    'instrument_ids.*.number.exists': 'Other instrument/s not found',
  }
}
