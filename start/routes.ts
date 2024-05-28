import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/Http/AuthController.js'
import { DashboardController } from '../app/controllers/Http/DashboardController.js'
'use strict'
const AntriansController = () => import('../app/controllers/Http/AntriansController.js')

router.on('/').render('pages/home')
router.get("antrians", [AntriansController, "index"])
router.post("antrians", [AntriansController, "incrementQueue"])
router.post('/antrians/reset', [AntriansController, "resetAntrian"]).as('antrian.reset')
router.post("/antrians/:id", [AntriansController, "serveAntrian"]).as("antrian.layani")
router.on('/login').render('pages/login')
router.get('/dashboard', [DashboardController, 'show'])
router.get('/dashboard/antrians', [DashboardController, 'showDataAntrian'])
router.post("/login", [AuthController, "store"]).as("auth.login")
router.get('/monitoring', [AntriansController, "renderMonitoringPage"])
router.get('/antrians/all', [AntriansController, "getAll"])
