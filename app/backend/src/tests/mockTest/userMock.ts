import UserModel from '../../database/models/User'

export const fakeLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const fakeWrongEmail = {
  email: 'ars.com',
  password: 'secret_admin'
}

export const fakeWrongPassword = {
  email: 'admin@admin.com',
  password: '1234'
}

export const fakeNoPassword = {
  email: 'admin@admin.com',
}

export const fakeNoEmail = {
  password: 'secret_admin'
}

export const fakeLoginResponseModel = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
    userAtt: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
}} as UserModel