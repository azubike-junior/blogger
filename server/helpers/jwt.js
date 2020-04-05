import jwt from 'jsonwebtoken'
import config from '../config/config'

export const generateToken = (user) => {
    return jwt.sign({
        user_id: user.user_id
    }, config.jwtConfigs.secret)
}