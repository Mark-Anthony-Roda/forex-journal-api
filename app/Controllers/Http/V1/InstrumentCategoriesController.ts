import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import InstrumentCategory from 'App/Models/InstrumentCategory'
import InstrumentCategoryValidator from 'App/Validators/InstrumentCategoryValidator'

export default class InstrumentCategoriesController {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(InstrumentCategoryValidator)

    try {
      const instrumentCategory = await InstrumentCategory.create({
        ...validated,
        creatorId: request.user.id,
      })

      return response.status(201).json(instrumentCategory)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async update({ params, request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(InstrumentCategoryValidator)

    const { id } = params

    const instrumentCategory = await InstrumentCategory.query().where({ id }).first()

    if (!instrumentCategory) throw new NotFoundException('Instrument category not found')

    try {
      instrumentCategory.name = validated.name
      await instrumentCategory.save()

      return response.status(200).json(instrumentCategory)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async index({ request, response }: HttpContextContract): Promise<void> {
    const { page = 1, limit = 10 } = request.qs()

    try {
      const instrumentCategories = await InstrumentCategory.query().paginate(page, limit)

      return response.status(200).json(instrumentCategories)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<void> {
    const { id } = params

    const instrumentCategory = await InstrumentCategory.query().where({ id }).first()

    if (!instrumentCategory) throw new NotFoundException('Instrument category not found')

    return response.status(200).json(instrumentCategory)
  }

  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    const { id } = params

    const instrumentCategory = await InstrumentCategory.query().where({ id }).first()

    if (!instrumentCategory) throw new NotFoundException('Instrument category not found')

    try {
      await instrumentCategory.delete()

      return response.status(204).json({ message: 'deleted' })
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
