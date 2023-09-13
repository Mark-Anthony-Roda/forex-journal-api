import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  afterCreate,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import Instrument from './Instrument'
import User from './User'
import Account from './Account'

export default class Trade extends BaseModel {
  @afterCreate()
  public static async populateOtherColumns(trade: Trade): Promise<void> {
    const formattedId = trade.id.toString().padStart(4, '0')

    trade.formattedId = `T-${trade.createdAt.toFormat('ddMMyyyy')}-${formattedId}`

    await trade.save()
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public formattedId: string

  @column()
  public instrumentId: number

  @column()
  public accountId?: number

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
  public month?: number

  @column({ serializeAs: null })
  public year?: number

  @column()
  public dateOpen?: string

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

  @belongsTo(() => Account, {
    foreignKey: 'accountId',
  })
  public account: BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
