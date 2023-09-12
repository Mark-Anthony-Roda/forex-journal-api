import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TradeValidator {
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
    instrument_id: schema.number([rules.exists({ table: 'instruments', column: 'id' })]),
    position: schema.enum(['Buy', 'Sell'] as const),
    entry: schema.number(),
    stop_loss: schema.number.optional(),
    target: schema.number.optional(),
    status: schema.enum(['Win', 'Lose', 'Break even', 'On going', 'Pending'] as const),
    profit: schema.number.optional(),
    volume: schema.number(),
    session: schema.enum(['Sydney', 'Asia', 'London', 'New York'] as const),
    date_open: schema.string.optional([rules.isDate()]),
    date_end: schema.string.optional([rules.isDate()]),
    timeframe: schema.string(),
  })

  public messages: CustomMessages = {
    'instrument_id.required': 'Insturment is required',
    'instrument_id.exists': 'Insturment not found',
    'instrument_id.number': 'Insturment is invalid',
    'position.required': 'Position is required',
    'position.enum': 'The position values must be one of {{ options.choices }}',
    'entry.required': 'Entry price is required',
    'entry.number': 'Entry price is invalid',
    'stop_loss.number': 'Stop loss price is invalid',
    'target.number': 'Target price is invalid',
    'status.required': 'Status is required',
    'status.enum': 'The status values must be one of {{ options.choices }}',
    'profit.number': 'Profit price is invalid',
    'volume.required': 'Volume is invalid',
    'volume.number': 'Volume is invalid',
    'session.required': 'Session is required',
    'session.enum': 'The session values must be one of {{ options.choices }}',
    'timeframe.required': 'Timeframe is required',
    'timeframe.string': 'Timeframe is invalid',
    'date_open.string': 'Date open is invalid',
    'date_open.isDate': 'Date open is invalid',
    'date_end.string': 'Date end is invalid',
    'date_end.isDate': 'Date end is invalid',
  }
}
