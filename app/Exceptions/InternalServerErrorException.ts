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
| new InternalServerErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InternalServerErrorException extends Exception {
  constructor(message: string) {
    super(message, 500)

    this.message = message
  }

  public async handle(error: this, { response }: HttpContextContract): Promise<void> {
    response.status(500).send({
      code: 500,
      message: 'Internal Server Error',
      errors: error.message,
    })
  }
}
