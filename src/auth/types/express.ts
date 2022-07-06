import { User as IUser, Profile } from '@prisma/client'

declare global {
  namespace Express {
    interface User extends IUser {
      profile?: Profile
    }

    interface Request {
      user?: User
    }
  }
}
