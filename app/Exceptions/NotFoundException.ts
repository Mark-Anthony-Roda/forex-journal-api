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
| new NotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundException extends Exception {
  constructor(message: string) {
    super(message, 404)

    this.message = message
  }

  public async handle(error: this, { response }: HttpContextContract): Promise<void> {
    response.status(404).send({
      code: 404,
      message: 'Not Found',
      errors: error.message,
    })
  }
}
