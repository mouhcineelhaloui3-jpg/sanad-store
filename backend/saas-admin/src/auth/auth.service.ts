import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

type UserRecord = {
  id: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MARKETING_MANAGER";
};

const USERS: UserRecord[] = [
  {
    id: "usr_super",
    email: "admin@sanad.local",
    password: process.env.ADMIN_ACCESS_CODE ?? "M2o3u1h1@",
    role: "SUPER_ADMIN"
  }
];

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  login(email: string, password: string) {
    const user = USERS.find((u) => u.email === email && u.password === password);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const token = this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
