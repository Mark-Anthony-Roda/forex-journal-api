import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      isAdmin: true,
      firstName: 'Mark Anthony',
      lastName: 'Roda',
      email: 'rodamarkanthony90@gmail.com',
      password: '8qLsG6PfN2o5',
      isVerified: true,
    })
  }
}
