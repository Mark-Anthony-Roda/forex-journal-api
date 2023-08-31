import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
  constructor(message: string) {
    super(message, 401)

    this.message = message
  }

  public async handle(error: this, { response }: HttpContextContract): Promise<void> {
    response.status(401).send({
      code: 401,
      message: 'Unauthorized',
      errors: error.message,
    })
  }
}
