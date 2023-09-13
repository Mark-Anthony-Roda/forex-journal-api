import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Instrument from 'App/Models/Instrument'
import InstrumentValidator from 'App/Validators/InstrumentValidator'

export default class InstrumentsController {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(InstrumentValidator)

    try {
      const instrument = await Instrument.create({
        name: validated.name,
        instrumentCategoryId: validated.instrument_category_id,
        creatorId: request.user.id,
      })

      return response.status(201).json(instrument)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async update({ params, request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(InstrumentValidator)

    const { id } = params

    const instrument = await Instrument.query().where({ id }).first()

    if (!instrument) throw new NotFoundException('Instrument not found')

    try {
      instrument.name = validated.name
      instrument.instrumentCategoryId = validated.instrument_category_id

      await instrument.save()

      return response.status(200).json(instrument)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async index({ request, response }: HttpContextContract): Promise<void> {
    const { page = 1, limit = 10 } = request.qs()

    try {
      const instruments = await Instrument.query().paginate(page, limit)

      return response.status(200).json(instruments)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<void> {
    const { id } = params

    const instrument = await Instrument.query().where({ id }).first()

    if (!instrument) throw new NotFoundException('Instrument not found')

    return response.status(200).json(instrument)
  }

  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    const { id } = params

    const instrument = await Instrument.query().where({ id }).first()

    if (!instrument) throw new NotFoundException('Instrument not found')

    try {
      await instrument.delete()
      return response.status(204).json({ message: 'deleted' })
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
