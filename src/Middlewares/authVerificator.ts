import {AuthChecker} from "type-graphql";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface Context {
  token?: string;
}

const AuthenticationConfirm: AuthChecker<Context> = ({ context }): boolean => {
  const authHeader = context.token;

  if(!authHeader) {
    return false;
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));

    return !!decoded;
  } catch {
    return false;
  }
}

export default AuthenticationConfirm;