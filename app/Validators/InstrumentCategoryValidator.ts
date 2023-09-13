import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InstrumentCategoryValidator {
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

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      this.refs.id.value
        ? rules.unique({
            table: 'instrument_categories',
            column: 'name',
            whereNot: { id: this.refs.id.value },
          })
        : rules.unique({ table: 'instrument_categories', column: 'name' }),
    ]),
  })

  public messages: CustomMessages = {
    'name.string': 'Name is invalid',
    'name.required': 'Name is required',
    'name.unique': 'Name already exist',
  }
}
