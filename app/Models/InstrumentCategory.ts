import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class InstrumentCategory extends BaseModel {
  @afterCreate()
  public static async populateOtherColumns(instrumentCategory: InstrumentCategory): Promise<void> {
    const formattedId = instrumentCategory.id.toString().padStart(4, '0')

    instrumentCategory.formattedId = `IC-${instrumentCategory.createdAt.toFormat(
      'ddMMyyyy'
    )}-${formattedId}`

    await instrumentCategory.save()
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public formattedId: string

  @column()
  public name: string

  @column()
  public creatorId: number

  @belongsTo(() => User, {
    foreignKey: 'creatorId',
  })
  public creator: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt?: DateTime
}
