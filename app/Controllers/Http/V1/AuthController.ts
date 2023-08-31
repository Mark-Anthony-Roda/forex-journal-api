import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/AuthValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async loginAdmin({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(AuthValidator)

    const { email, password, remember } = validated

    const user = await User.query().where({ email, isAdmin: true, deletedAt: null }).first()

    let isSame = false

    if (user) isSame = await Hash.verify(user.password, password)

    if (!user || !isSame) throw new UnAuthorizedException('Invalid Credentials')

    await user.load('avatar')
    await user.refresh()

    const jwtObj = {
      userId: user.formattedId,
      email: user.email,
    }

    const token = jwt.sign(jwtObj, Env.get('APP_SECRET'))

    let jwtCookie = `JWT=${token}; Domain=${Env.get('COOKIE_DOMAIN') || 'localhost'};`

    if (remember) jwtCookie = `${jwtCookie} Max-Age=315360000;`

    response.append('Set-cookie', jwtCookie)

    return response.status(200).send({
      token: token,
      data: user,
    })
  }
}
