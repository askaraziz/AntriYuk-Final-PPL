import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Users from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    const users = await Users.all()

    if (users.length == 0) {      
      await Users.create({
        fullName: "Admin",
        password: "admin123",
        profileUrl: "",
        role: "ADMIN",
        status: "AKTIF",
      })
    }
  }
}