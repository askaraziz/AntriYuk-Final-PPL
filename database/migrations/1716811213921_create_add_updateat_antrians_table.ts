import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'antrians'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('updatedAt').defaultTo(this.now())
    })

  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}