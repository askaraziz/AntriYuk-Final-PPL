import type { HttpContext } from '@adonisjs/core/http'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Antrian from "../../models/antrian.js"


export default class AntriansController {
    public async index({ view }: HttpContext) {
        const dataAntrian = await Antrian.query().where('statusDilayani', false).orderBy('id', 'desc').first()
        // Assuming you also need to fetch info instansi from another table
        // const dataInfoInstansi = await InfoInstansi.first() // Assuming you have an InfoInstansi model
    
        return view.render('pages/ambilAntrian', {
          dataAntrian,
          // datainfoinstansi: dataInfoInstansi // Uncomment if using InfoInstansi model
        })
      }
    
    public async incrementQueue({ request, response }: HttpContext) {
      const newQueueNumber = request.input('antrianbaru')
      await Antrian.create({
        noAntrian: newQueueNumber,
        statusDilayani: false, // Example userId, replace with actual logic
      })
  
      response.redirect('/antrians')
    }

    async getAll({ response }: HttpContext) {
      try {
          // Mendapatkan semua data antrian dari database
          const allAntrian = await Antrian.all()

          // Mengembalikan data antrian sebagai JSON response
          return response.json({ success: true, data: allAntrian })
      } catch (error) {
          // Mengembalikan pesan error jika terjadi kesalahan
          return response.status(500).json({ success: false, message: 'Internal Server Error' })
      }
  }

  // Metode untuk merender halaman monitoring dengan data antrian
  async renderMonitoringPage({ view }: HttpContext) {
      try {
          // Mendapatkan semua data antrian dari database
          const allAntrian = await Antrian.query().where('statusDilayani', false).orderBy("noAntrian", "asc");

          const currentAntrian = allAntrian[0]

          const antrianLeft = allAntrian
              .filter((antrian) => antrian.id !== currentAntrian.id)
          // Render halaman monitoring dengan data antrian
          return view.render('pages/monitoring', { currentAntrian, antrianLeft })
      } catch (error) {
         console.log(error)
      }
  }

  async serveAntrian({params, response, auth}: HttpContext) {
    const antrianId = params.id

    try {
      // Temukan pengguna berdasarkan id
      const antrian = await Antrian.findOrFail(antrianId)

      // Perbarui status pengguna menjadi "Dilayani"
      antrian.statusDilayani = true
      antrian.userId = auth.user?.id
      await antrian.save()

      // Kirim respons sukses
      response.redirect("/dashboard")
    } catch (error) {
      // Jika terjadi kesalahan, kirim respons error
      return response.status(400).send({ error: 'User not found or could not update status' })
    }
  }

  public async resetAntrian({ response }: HttpContext) {
    try {
      // Hapus semua data antrian
      console.log("Jalan")
      await Antrian.query().delete()

      // Tambahkan satu data antrian dengan nomor antrian 0
      await Antrian.create({
        noAntrian: 0,
        statusDilayani: false,
      })

      // Kirim respons sukses
      response.redirect("/dashboard/antrians")
    } catch (error) {
      // Jika terjadi kesalahan, kirim respons error
      return response.status(500).send({ error: 'Could not reset antrian' })
    }
  }
}