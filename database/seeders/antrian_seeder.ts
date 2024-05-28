import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Antrian from '../../app/models/antrian.js'

export default class extends BaseSeeder {
  async run() {
    const antrian = await Antrian.all()

    if (antrian.length == 0) {      
      await Antrian.create({
        noAntrian: 1,
        statusDilayani: false,
      })
    }
  }
}