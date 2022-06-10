import * as fs from 'fs';
import { sign } from 'jsonwebtoken';
import path = require('path');

export default class JWT {
  static JWTreader() {
    const jwtSecret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), 'utf8');
    return jwtSecret;
  }

  static secret(userData: string | undefined) {
    const secret = sign(
      { data: userData },
      JWT.JWTreader(),
      { expiresIn: '1h', algorithm: 'HS256' },
    );
    return secret;
  }
}
