import AccountService from '@ioc:AccountService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Account from 'App/Models/Account'
import Trade from 'App/Models/Trade'
import TradeValidator from 'App/Validators/TradeValidator'

export default class TradesController {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(TradeValidator)

    const trx = await Database.transaction()
    try {
      let account: Account | null = null

      if (validated.date_open) {
        const dateOpen = new Date(validated.date_open)

        const additionals: { month: number; year: number } = {
          month: dateOpen.getMonth() + 1,
          year: dateOpen.getFullYear(),
        }

        account = await AccountService.getOrCreateAccount(additionals, account, request.user, trx)
      }

      const payload: any = {
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
        accountId: account?.id,
      }

      if (account) {
        payload.month = account.month
        payload.year = account.year
      }

      const trade = await Trade.create(payload, { client: trx })

      await trx.commit()
      return response.status(201).json(trade)
    } catch (error) {
      await trx.rollback()
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  public async update({ params, request, response }: HttpContextContract): Promise<void> {
    const validated = await request.validate(TradeValidator)
    const trx = await Database.transaction()

    const { id } = params

    const trade = await Trade.query(trx)
      .where({ userId: request.user.id, id })
      .preload('instrument')
      .first()

    if (!trade) throw new NotFoundException('Trade not found')

    try {
      let account: Account | null = null

      if (validated.date_open) {
        const dateOpen = new Date(validated.date_open)
        const additionals: { month: number; year: number } = {
          month: dateOpen.getMonth() + 1,
          year: dateOpen.getFullYear(),
        }

        account = await AccountService.getOrCreateAccount(additionals, account, request.user, trx)
      }

      trade.position = validated.position
      trade.entry = validated.entry
      trade.target = validated.target
      trade.status = validated.status
      trade.volume = validated.volume
      trade.session = validated.session
      trade.timeframe = validated.timeframe
      trade.instrumentId = validated.instrument_id
      trade.stopLoss = validated.stop_loss
      trade.profit = validated.profit
      trade.dateOpen = validated.date_open
      trade.dateEnd = validated.date_end
      trade.accountId = account?.id

      if (account) {
        trade.month = account.month
        trade.year = account.year
      }
      await trade.save()

      await trx.commit()

      return response.status(200).json(trade)
    } catch (error) {
      await trx.rollback()
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
