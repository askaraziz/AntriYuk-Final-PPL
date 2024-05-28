import { HttpContext } from "@adonisjs/core/http";
import Antrian from "../../models/antrian.js";

export class DashboardController {
    async show({ view}: HttpContext) {
        try {
            // Mendapatkan semua data antrian dari database
            const allAntrian = await Antrian.query().where('statusDilayani', false).orderBy("noAntrian", "asc").limit(6);
  
            const currentAntrian = allAntrian[0]
  
            const antrianLeft = allAntrian
                .filter((antrian) => antrian.id !== currentAntrian.id)
            // Render halaman monitoring dengan data antrian
            return view.render('pages/dashboard', { currentAntrian, antrianLeft })
        } catch (error) {
           console.log(error)
        }
    }

    async showDataAntrian({view}: HttpContext) {
        try {
            const allAntrian = await Antrian.query().orderBy("noAntrian", "asc")
            return view.render('pages/dataAntrian', { allAntrian }) 
        } catch (error) {
            console.log(error)
        }
    }

}
