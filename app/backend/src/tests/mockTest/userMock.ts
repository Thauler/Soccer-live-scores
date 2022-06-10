import UserModel from "../../database/models/User"

export const fakeLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const fakeLoginResponse = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
} as UserModel