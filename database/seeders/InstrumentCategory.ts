import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import InstrumentCategory from 'App/Models/InstrumentCategory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const categories = [{ name: 'Forex', creatorId: 1 }]
    await InstrumentCategory.updateOrCreateMany('name', categories)
  }
}
