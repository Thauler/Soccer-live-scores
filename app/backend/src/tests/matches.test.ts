import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { before } from 'mocha';

import { app } from '../app';
import MatchesModel from '../database/models/Match';

import { Response } from 'superagent';
import { fakeInProgress, fakeMatchesList, fakeNewMatchInProgress, fakeNewMatchInProgressResponse, fakeNotInProgress } from './mockTest/matchesMock';
import { fakeLogin } from './mockTest/userMock';

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
  });

describe('Testando a rota POST de /matches', () => {
  let chaiHttpResponse: Response;
describe('em caso de sucesso', () => {
  before(() => {
    sinon.stub(MatchesModel, 'create').resolves(fakeNewMatchInProgress);
  });

  after(() => {
    (MatchesModel.create as sinon.SinonStub).restore();
  });

  it('Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com status 201', async () => {
      const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(fakeLogin)

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send(fakeNewMatchInProgress);

      const { match } = chaiHttpResponse.body

      expect(chaiHttpResponse.status).to.be.equals(201);
      expect(match).deep.equals(fakeNewMatchInProgressResponse);
  });
});
})
