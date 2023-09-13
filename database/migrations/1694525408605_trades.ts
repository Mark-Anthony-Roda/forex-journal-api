import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'trades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('formatted_id')
      table
        .integer('instrument_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('instruments')
        .onDelete('restrict')

      table
        .integer('account_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('accounts')
        .onDelete('restrict')

      table.enu('position', ['Buy', 'Sell']).notNullable().index()
      table.float('entry', 13, 5).notNullable()
      table.float('stop_loss', 13, 5).nullable()
      table.float('target', 13, 5).nullable()
      table
        .enu('status', ['Win', 'Lose', 'Break even', 'On going', 'Pending'])
        .notNullable()
        .index()
      table.float('profit', 13, 4).nullable()
      table.float('volume', 3, 2).notNullable()
      table.enu('session', ['Sydney', 'Asia', 'London', 'New York']).notNullable().index()
      table.enu('month', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).nullable().index()
      table.integer('year').nullable().index()

      table.string('date_open').nullable()
      table.string('date_end').nullable()

      table.string('timeframe')

      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('restrict')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
