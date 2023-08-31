import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  afterCreate,
  beforeSave,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import File from './File'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @afterCreate()
  public static async populateOtherColumns(user: User): Promise<void> {
    const formattedId = user.id.toString().padStart(4, '0')
    let userCode = 'U'
    if (user.isAdmin) userCode = 'AD'

    user.formattedId = `${userCode}-${user.createdAt.toFormat('ddMMyyyy')}-${formattedId}`

    await user.save()
  }

  @beforeSave()
  public static async hashPassword(user: User): Promise<void> {
    user.fullName = `${user.firstName} ${user.lastName ?? ''}`.trim()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public formattedId: string

  @column()
  public isAdmin: boolean

  @column()
  public avatarId: number

  @column()
  public firstName: string

  @column()
  public lastName?: string

  @column()
  public fullName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public forgotPasswordCode?: string

  @column()
  public isVerified: boolean

  @belongsTo(() => File, {
    foreignKey: 'avatarId',
  })
  public avatar: BelongsTo<typeof File>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt?: DateTime
}
