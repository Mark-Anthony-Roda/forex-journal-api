import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('formatted_id')
      table.boolean('is_admin').defaultTo(false)
      table
        .integer('avatar_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('files')
        .onDelete('restrict')

      table.string('first_name').notNullable()
      table.string('last_name').nullable()
      table.string('full_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('forgot_password_code').nullable()
      table.boolean('is_verified').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
