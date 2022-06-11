import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { before } from 'mocha';

import { app } from '../app';
import UserModel from '../database/models/User';

import { Response } from 'superagent';
import { fakeLogin, fakeLoginResponse, fakeWrongEmail, fakeWrongPassword } from './mockTest/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teststando a rota POST de /login', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(UserModel, 'findOne').resolves(fakeLoginResponse);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('deve retornar o usuário logado com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(fakeLogin);

      const { user, token } = chaiHttpResponse.body

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(user).deep.equals(fakeLoginResponse);
      expect(token).not.equal(undefined);
  });
});
describe('caso o email passado seja invalido', () => {
  // não usa pois não chegara nessa camada
  //   before(() => {
  //   sinon.stub(UserModel, 'findOne').resolves(fakeLoginResponse);
  // });

  // after(() => {
  //   (UserModel.findOne as sinon.SinonStub).restore();
  // });

  it('Se o login tiver o "email" inválido, com um status 401 e uma mensagem', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(fakeWrongEmail);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.equals(401);
      expect(message).to.be.equals({ message: "Incorrect email or password" });
  })
})
describe('caso a senha seja inválida', () => {
    it('Se o login tiver o "password" inválido, com um status 401 e uma mensagem', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(fakeWrongPassword);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.equals(401);
      expect(message).to.be.equals({ message: "Incorrect email or password" });
  })
})
});

