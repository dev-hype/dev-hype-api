import { Profile, User as DBUser } from '@prisma/client'

declare global {
  namespace Express {
    interface User extends DBUser {
      profile: Profile | null
    }

    interface Request {
      user?: User
    }
  }
}
