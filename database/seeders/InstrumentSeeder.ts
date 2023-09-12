import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Instrument from 'App/Models/Instrument'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const instrument = [
      { name: 'EUR/USD', instrumentCategoryId: 1 },
      { name: 'GBP/USD', instrumentCategoryId: 1 },
      { name: 'USD/JPY', instrumentCategoryId: 1 },
      { name: 'AUD/USD', instrumentCategoryId: 1 },
      { name: 'USD/CAD', instrumentCategoryId: 1 },
      // Add more Forex pairs here as needed
    ]

    await Instrument.updateOrCreateMany('name', instrument)
  }
}
