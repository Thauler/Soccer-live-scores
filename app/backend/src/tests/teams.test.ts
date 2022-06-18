import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import TeamsModel from '../database/models/Team';

import { Response } from 'superagent';
import { fakeTeamId, fakeTeamsList } from './mockTest/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teststando a rota GET de /teams', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(TeamsModel, 'findAll').resolves(fakeTeamsList);
  });

  after(() => {
    (TeamsModel.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar todos os times com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.equals(fakeTeamsList)
  });
});
describe('em caso de erro 500', () => {
    before(() => {
    sinon.stub(TeamsModel, 'findAll').throws();
  });

  after(() => {
    (TeamsModel.findAll as sinon.SinonStub).restore();
  });

  
  it('Internal server error', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams');

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equals(500);
    expect(message).to.be.equals('Internal Server');
  })
})
});
describe('Testando a rota GET de /teams/:id', () => {
  let chaiHttpResponse: Response;

  describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(TeamsModel, 'findByPk').resolves(fakeTeamId);
  });

  after(() => {
    (TeamsModel.findByPk as sinon.SinonStub).restore();
  });

  it('deve retornar um time pelo ID com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.equals(fakeTeamId)
  });
});
})

