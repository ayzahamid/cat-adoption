import { User } from '../user/user.entity';

export interface JwtPayload {
  id: User['id'];
  email: User['email'];
  password: User['password'];
}
