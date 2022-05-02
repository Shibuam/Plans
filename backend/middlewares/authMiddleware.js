import jwt from 'jsonwebtoken'
import { User} from '../model/user.js'

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user =    await User.findOne({ where: { user_id: decoded.id } })

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(402)
    throw new Error('Not authorized, no token')
  }
}