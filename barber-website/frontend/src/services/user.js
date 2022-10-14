import api from './http'

export default new class UserService {
    getAll = () => {
        return api.get('/users')
    }
}