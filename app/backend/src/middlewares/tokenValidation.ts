import { Response, NextFunction } from 'express';
import { IDecode, RequestWithUserRole } from '../interfaces/request.interface';
import JWT from '../utils/jwtSecret';

const validateToken = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const jwtData = <IDecode> JWT.verify(authorization);
    req.dataRole = jwtData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateToken;
