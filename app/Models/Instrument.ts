import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import InstrumentCategory from './InstrumentCategory'
import User from './User'

export default class Instrument extends BaseModel {
  @afterCreate()
  public static async populateOtherColumns(instrument: Instrument): Promise<void> {
    const formattedId = instrument.id.toString().padStart(4, '0')

    instrument.formattedId = `I-${instrument.createdAt.toFormat('ddMMyyyy')}-${formattedId}`

    await instrument.save()
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public formattedId: string

  @column()
  public name: string

  @column()
  public instrumentCategoryId: number

  @column()
  public creatorId: number

  @belongsTo(() => User, {
    foreignKey: 'creatorId',
  })
  public creator: BelongsTo<typeof User>

  @belongsTo(() => InstrumentCategory, {
    foreignKey: 'instrumentCategoryId',
  })
  public instrumentCategory: BelongsTo<typeof InstrumentCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
