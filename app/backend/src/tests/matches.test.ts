import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { before } from 'mocha';

import { app } from '../app';
import MatchesModel from '../database/models/Match';

import { Response } from 'superagent';
import { fakeInProgress, fakeMatchesList, fakeNewMatchInProgress, fakeNewMatchInProgressResponse, fakeNotInProgress } from './mockTest/matchesMock';
import { fakeLogin } from './mockTest/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let chaiHttpResponse: Response;

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
      
      expect(chaiHttpResponse.status).to.be.equals(201);
       expect(chaiHttpResponse.body).property('id')
      expect(chaiHttpResponse.body).deep.equals(fakeNewMatchInProgressResponse);
    });
          it('Retorna status 500 com a menssagem "Internal Server Erroro"', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        
        const { message } = chaiHttpResponse.body;
        
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).deep.equal('Internal Server Error');
      });
  });
})
 describe('Finaliza partidas em andamento', () => {
    describe('Atualiza uma partida em andamendo para finalizada com sucesso', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .resolves([1, []]);
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(message).equal("Finished")
      });
    });

    describe('Falha ao tentar atualizar uma partida em andamendo para finalizada', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .resolves([0, []]);
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 404 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(message).equal("Partida não encontrada ou já finalizada")
      });
    });

    describe('Erro no servidor', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .throws()
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Erro inesperado"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
  });

  describe('Atualiza os gols de uma partida', () => {
    describe('Sucesso ao atualizar os gols de uma partida', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .resolves([1, []]);
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 200 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(message).equal("Gols atualizados")
      });
    });
    describe('Falha ao atualizar os gols de uma partida', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .resolves([0, []]);
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 404 com uma menssagem', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(message).equal("Partida não encontrada, já finalizada ou já possui os dados inseridos")
      });      
    });

    describe('Erro no middleware de login', () => {
      before(() => {
        sinon
          .stub(jwt, "verify")
          .throws();
      });
    
      after(()=>{
        (jwt.verify as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Erro inesperado"', async () => {
        const { body: { token } } = await chai
        .request(app)
        .post('/login')
        .send(fakeLogin)
  
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set({ authorization: token })
          .send(fakeNewMatchInProgress)
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });

    describe('Erro no servidor', () => {
      before(() => {
        sinon
          .stub(MatchesModel, "update")
          .throws();
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
      })
    
      it('Retorna status 500 com a menssagem "Erro inesperado"', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .send()
        
          const { message } = chaiHttpResponse.body;
    
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(message).equal('Erro inesperado')
      });
    });
})
})
