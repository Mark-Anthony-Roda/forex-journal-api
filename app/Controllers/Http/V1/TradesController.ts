import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Trade from 'App/Models/Trade'
import TradeValidator from 'App/Validators/TradeValidator'
import moment from 'moment'

export default class TradesController {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(TradeValidator)

    try {
      const additionals: { month?: number; year?: number } | undefined = {}

      if (validated.date_open) {
        const dateOpen = moment(validated.date_open)
        additionals.month = dateOpen.month() + 1
        additionals.year = dateOpen.year()
      }

      const trade = await Trade.create({
        ...additionals,
        position: validated.position,
        entry: validated.entry,
        target: validated.target,
        status: validated.status,
        volume: validated.volume,
        session: validated.session,
        timeframe: validated.timeframe,
        instrumentId: validated.instrument_id,
        stopLoss: validated.stop_loss,
        profit: validated.profit,
        dateOpen: validated.date_open,
        dateEnd: validated.date_end,
        userId: request.user.id,
      })

      return response.status(201).json(trade)
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async index({ request, response }: HttpContextContract): Promise<void> {
    const { page = 1, limit = 10 } = request.qs()

    try {
      const trades = await Trade.query()
        .where({ userId: request.user.id })
        .preload('instrument')
        .paginate(page, limit)

      return response.status(200).json(trades)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async show({ params, request, response }: HttpContextContract): Promise<void> {
    const { id } = params
    const trade = await Trade.query()
      .where({ userId: request.user.id, id })
      .preload('instrument')
      .first()

    if (!trade) throw new NotFoundException('Trade not found')

    return response.status(200).json(trade)
  }

  public async destroy({ params, request, response }: HttpContextContract): Promise<void> {
    const { id } = params
    const trade = await Trade.query()
      .where({ userId: request.user.id, id })
      .preload('instrument')
      .first()

    if (!trade) throw new NotFoundException('Trade not found')

    await trade.delete()

    return response.status(204).json({ message: 'deleted' })
  }
}
