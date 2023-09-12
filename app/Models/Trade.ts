import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Instrument from './Instrument'
import User from './User'

export default class Trade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public instrumentId: number

  @column()
  public position: 'Buy' | 'Sell'

  @column()
  public entry: number

  @column()
  public stopLoss?: number

  @column()
  public target?: number

  @column()
  public profit?: number

  @column()
  public status: 'Win' | 'Lose' | 'Break even' | 'On going' | 'Pending'

  @column()
  public volume: number

  @column()
  public session: 'Sydney' | 'Asia' | 'London' | 'New York'

  @column({ serializeAs: null })
  public month: number

  @column({ serializeAs: null })
  public year: number

  @column()
  public dateOpen: string

  @column()
  public dateEnd?: string

  @column()
  public timeframe: string

  @column({ serializeAs: null })
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Instrument, {
    foreignKey: 'instrumentId',
  })
  public instrument: BelongsTo<typeof Instrument>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
