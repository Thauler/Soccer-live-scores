# Soccer Live scores ⚽

This is a collaborative project which I developed the back-end to be consumed for the front-end made by Trybe. The Object-oriented programming (OOP) is applied using SOLID principles to construct an API CRUD for manage a soccer live scores. Using MySQL as database. And this API is to be consumed for the front-end using cors lib.

## Requirements
- [x] 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `teams`
- [x] 2 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matches`
- [x] 3 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`
- [x] 4 - (`TDD`) Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em `/src`, com um mínimo de 7 linhas cobertas
- [x] 5 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end
- [x] 6 - (`TDD`) Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em `/src`, com um mínimo de 19 linhas cobertas
- [x] 7 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email inválido no front-end
- [x] 8 - (`TDD`) Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em `/src`, com um mínimo de 25 linhas cobertas
- [x] 9 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end
- [x] 10 - (`TDD`) Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em `/src`, com um mínimo de 35 linhas cobertas
- [x] 11 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar um email no front-end
- [x] 12 - (`TDD`) Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em `/src`, com um mínimo de 45 linhas cobertas
- [x] 13 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end
- [x] 14 - Desenvolva o endpoint `/login/validate` no back-end de maneira que ele retorne os dados corretamente no front-end
- [x] 15 - (`TDD`) Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em `/src`, com um mínimo de 70 linhas cobertas
- [x] 16 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente
- [x] 17 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico
- [x] 18 - (`TDD`) Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em `/src`, com um mínimo de 80 linhas cobertas
- [x] 19 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.
- [x] 20 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end
- [x] 21 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end
- [x] 22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80% dos arquivo back-end em `/src`, com um mínimo de 100 linhas cobertas
- [x] 23 - Desenvolva a rota `/matches` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
- [x] 24 - Desenvolva a rota `/matches/:id/finish` de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados
- [x] 25 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais
- [x] 26 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com um time que não existe na tabela teams
- [x] 27 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento
- [x] 28 - Desenvolva o endpoint `/matches/:id` de forma que seja possível finalizar partidas em andamento
- [x] 29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
- [x] 30 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível: filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [x] 31 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times na tela de classificação do front-end, com os dados iniciais do banco de dados
- [x] 32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível: filtrar as classificações dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [x] 33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados
- [x] 34 - Desenvolva o endpoint /leaderboard de forma que seja possível: filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC
- [x] 35 - Desenvolva o endpoint /leaderboard de forma que seja possível: filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Minas Brasília 1 X 0 Ferroviária

## Techs used

This an API RESTful using NodeJs and Express with TypeScript. I use Docker Compose to stand up local development environments. And for the unit tests I use Mocha framework.

### Reference Links:
- [Typescript](https://www.typescriptlang.org/)
- [Javascript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [Mocha](https://mochajs.org/)
