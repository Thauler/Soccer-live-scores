import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { before } from 'mocha';

import { app } from '../app';
import MatchesModel from '../database/models/Match';

import { Response } from 'superagent';
import { fakeInProgress, fakeMatchesList, fakeNotInProgress } from './mockTest/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teststando a rota GET de /matches', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(MatchesModel, 'findAll').resolves(fakeMatchesList);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

    it('deve retornar todos os times com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).deep.equal(fakeMatchesList)
  });
});
});
describe('Teststando a rota GET de /matches', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(MatchesModel, 'findAll').resolves(fakeInProgress);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });
    it('deve retornar todos os times com uma partida em andamento com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

      const { inProgress } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).deep.equal(fakeInProgress);
      expect(inProgress).to.be.equals('true');
  });
});
});
describe('Teststando a rota GET de /matches', () => {
  let chaiHttpResponse: Response;

describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(MatchesModel, 'findAll').resolves(fakeNotInProgress);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });
    it('deve retornar todos os times com uma partida não ocorrendo com o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

      const { inProgress } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).deep.equal(fakeNotInProgress);
      expect(inProgress).to.be.equals('false');
  });
});
});
describe('Erro no servidor status 500', () => {
  let chaiHttpResponse: Response;

      before(() => {
        sinon.stub(MatchesModel, 'findAll').throws();
      });
    
      after(()=>{
        (MatchesModel.findAll as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Internal Server Error"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).deep.equal('Internal Server Error');
      });
            it('Retorna status 500 com a menssagem "Internal Server Error"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).deep.equal('Internal Server Error');
      });
            it('Retorna status 500 com a menssagem "Internal Server Erroro"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).deep.equal('Internal Server Error');
      });
    });

