import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import UserModel from '../database/models/User';

import { Response } from 'superagent';
import { fakeLogin, fakeLoginResponseModel, fakeNoEmail, fakeNoPassword, fakeWrongEmail, fakeWrongPassword } from './mockTest/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teststando a rota POST de /login', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(UserModel, 'findOne').resolves(fakeLoginResponseModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('deve retornar o usuário logado com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(fakeLogin);

      const { user, token } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(user).deep.equal(fakeLoginResponseModel.userAtt);
      expect(fakeLogin.password).to.have.length.greaterThanOrEqual(6);
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
      expect(message).to.be.equals("Incorrect email or password");
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
      expect(fakeWrongPassword.password).not.to.have.length.greaterThanOrEqual(6);
      expect(message).deep.equals('Incorrect email or password');
  })
});
describe('Caso o email não seja informado', () => {
  it('Se o login não tiver o campo "email"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(fakeNoEmail);

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(message).deep.equals('All fields must be filled');
  })
})
describe('Caso a senha não seja informado', () => {
  it('Se o login não tiver o campo "password"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(fakeNoPassword);

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.equals(400);
    expect(message).to.be.equals("All fields must be filled");
  })
});
  describe('Valida o role com o Token', () => {
    describe('em caso de sucesso', () => {
      before(() => {
        sinon.stub(UserModel, "findOne").resolves(fakeLoginResponseModel)
      })
      after(() => {
        (UserModel.findOne as sinon.SinonStub).restore()
      })
      it('A resposta deve ser de status 200 com uma string contendo a role do user', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(fakeLogin)

        chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token })

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).deep.eq('admin');
      })
    });
  });
});
