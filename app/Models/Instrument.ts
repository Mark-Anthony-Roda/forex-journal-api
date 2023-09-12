import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import InstrumentCategory from './InstrumentCategory'

export default class Instrument extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public instrumentCategoryId: number

  @belongsTo(() => InstrumentCategory, {
    foreignKey: 'instrumentCategoryId',
  })
  public instrumentCategory: BelongsTo<typeof InstrumentCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
