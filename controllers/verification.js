import jwt from "jsonwebtoken"
import { utilMessage } from '../utils/message.js'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return utilMessage(res, 401, 'Token invalid')
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
        if (error) return utilMessage(res, 401, 'Token expired')
        req.username = decoded.userUsername
        next()
    })
}