import { Router } from 'express'
import { AuthenticateUserController } from './controller/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './controller/CreateUser/CreateUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const authenticateControler = new AuthenticateUserController()

router.post('/create', createUserController.handle)
router.post('/login', authenticateControler.handle)
router.get('/users', createUserController.index)

router.get('/courses', ensureAuthenticated, createUserController.index, (request, response) => {
    return response.json([
        { id: 1, name: 'NodeJs' },
        { id: 2, name: 'XPTO' }
    ])
})

export { router }