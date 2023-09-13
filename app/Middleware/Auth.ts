import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class Auth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.headers().authorization?.split(' ')[1]

    const { include } = request.qs()
    if (!token) throw new UnAuthorizedException('Token not found')
    try {
      const decoded: any = jwt.verify(token, Env.get('APP_SECRET'), {})

      const user = await User.query()
        .where({
          email: decoded.email,
          deletedAt: null,
        })
        .apply((scopes) => scopes.queryRelations(include))
        .first()

      if (!user) throw new UnAuthorizedException('Token invalid or token expired')

      request.user = user
    } catch (error) {
      throw new UnAuthorizedException('Token invalid or token expired')
    }

    await next()
  }
}
