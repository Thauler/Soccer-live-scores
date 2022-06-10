import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { before } from 'mocha';

import { app } from '../app';
import UserModel from '../database/models/User';

import { Response } from 'superagent';
import { fakeLogin, fakeLoginResponse } from './mockTest/userMock';

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
});

