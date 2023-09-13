import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import { AccountDTO } from 'App/DataTransferObjects/Account'
import Account from 'App/Models/Account'
import User from 'App/Models/User'

export default class AccountService {
  public async getOrCreateAccount(
    columnToCheck: AccountDTO,
    account: Account | null,
    user: User,
    transaction: TransactionClientContract
  ) {
    account = await Account.query(transaction)
      .where({
        month: columnToCheck.month,
        year: columnToCheck.year,
        userId: user.id,
      })
      .first()

    if (!account) {
      account = await Account.create(
        {
          month: columnToCheck.month,
          year: columnToCheck.year,
          capital: 0,
          userId: user.id,
        },
        { client: transaction }
      )
    }

    return account
  }
}
