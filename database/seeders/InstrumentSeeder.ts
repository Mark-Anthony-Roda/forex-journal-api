import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Instrument from 'App/Models/Instrument'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const instrument = [
      { name: 'EUR/USD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/USD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'USD/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'USD/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/USD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/USD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'USD/CAD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/GBP', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/AUD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/CAD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'EUR/NZD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/AUD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/CAD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'GBP/NZD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/CAD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/NZD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'AUD/SGD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/CAD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/SGD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/GBP', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'NZD/EUR', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/CHF', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/SGD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/GBP', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/EUR', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/AUD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CAD/NZD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CHF/JPY', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CHF/GBP', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CHF/AUD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CHF/NZD', instrumentCategoryId: 1, creatorId: 1 },
      { name: 'CHF/SGD', instrumentCategoryId: 1, creatorId: 1 },
      // Add more Forex pairs here as needed
    ]

    await Instrument.updateOrCreateMany('name', instrument)

    const user = await User.query().where({ email: 'rodamarkanthony90@gmail.com' }).first()

    if (user) {
      await user.related('instruments').sync([1, 2, 3, 4, 5, 6, 7])
    }
  }
}
