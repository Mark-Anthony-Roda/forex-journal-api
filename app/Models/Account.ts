import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Account extends BaseModel {
  @afterCreate()
  public static async populateOtherColumns(account: Account): Promise<void> {
    const formattedId = account.id.toString().padStart(4, '0')

    account.formattedId = `AC-${account.createdAt.toFormat('ddMMyyyy')}-${formattedId}`

    await account.save()
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public formattedId: string

  @column()
  public month: number

  @column()
  public year: number

  @column()
  public capital: number

  @column()
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
