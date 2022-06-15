import { Request } from 'express';

//  https://stackoverflow.com/questions/65848442/property-user-does-not-exist-on-type-requestparamsdictionary-any-any-pars

export type IDecode = {
  data: string,
  iat: number,
  exp: number
};

export type RequestWithUserRole = Request & {
  dataRole?: IDecode,
};
