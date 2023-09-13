import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserInstrumentValidator from 'App/Validators/UserInstrumentValidator'

export default class UserInstrumentsController {
  public async __invoke({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(UserInstrumentValidator)

    const user = await User.query().where({ email: request.user.email }).first()

    if (user) {
      await user.related('instruments').sync(validated.instrument_ids)
    }

    return response.status(200).json({ message: 'successfully saved' })
  }
}
