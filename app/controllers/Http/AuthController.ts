import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { fullName, password } = request.only(['fullName', 'password'])


    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(fullName, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/dashboard')
  }

}
