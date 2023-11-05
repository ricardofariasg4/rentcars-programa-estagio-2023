# Desafio CRUD RentCars 2023

# Como executar o projeto

## Requisitos: 
Para executar o projeto, basta ter o Docker instalado no computador, e com ele, o docker compose. Em geral, o docker compose já vem instalado com o Docker, mas caso não ocorra, você pode obtê-lo por meio do link: https://docs.docker.com/compose/install/linux/

## Executando:
1 - Estando na raiz do projeto, execute no terminal: docker compose up<br>
2 - Feito isso, após algum tempo, 3 serviços já estarão no ar: o frontend, o backend e o banco de dados mysql<br>
3 - Acesse localhost:8080 para interagir com o frontend, localhost:3000 para interagir com o backend, e finalmente, localhost:3307 para interagir com o banco de dados.<br>
4 - Para finalizar a execução do projeto, basta executar, ainda na pasta raiz: docker compose down<br>

OBS: Caso queira omitir os logs use o operador '&' após o comando.<br>

# Histórico do desenvolvedor
## Dia 30/10
Hoje é o início do desafio e sinceramente nem sei por onde começar, não faço ideia do que é sequelize, express js ou qualquer outra tecnologia abordada para o desenvolvimento do desafio. Ao menos sei o que é docker e aparentemente não vou ter dificuldades (eu acho) para subir o container com o banco de dados MySQL. Meu Javascript nesse momento é muito básico...

## Dia 31/10
Decidi começar fazendo a implementação do código que faz a conexão com o banco de dados, é o fim do dia 31/10 e já tenho a noção básica do que é sequelize e meu código já se conecta com a base de dados e sincroniza o modelo de veiculo que criei. Conheci o conceito de chamadas assíncronas no javascript e sua importância para se conectar com uma base de dados, a mesma ideia aparentemente é usada ao realizar requisição em API's.

## Dia 01/11
Já fui mais longe do que poderia imaginar kkkkk. São 2 dias desde o lançamento do projeto e possuo um beckend capaz de tratar as requisições do CRUD, já comecei a trabalhar no frontend. O MySQL no container docker meu deu um certo trabalho, pois só fui notar depois de muitas horas de tentativa e erro (e pesquisa) que ao passar o operador '&' para que ele execute em background, obtinha o erro **ERROR 1030 (HY000): Got error 168 - 'Unknown (generic) error from engine' from storage engine**, ainda não é claro para mim o porque desse comportamento, mas vamos que vamos. crud finalizado aqui (create e delete)

## Dia 02/11
Estilização tomando forma, utilizei bootstrap para adicionar alguns icones bacanas, de modo que o CRUD não fquei tão "seco" em estilo. Também consegui encontrar um caminho para a atualizção dos dados, etapa que achei mais complicada do CRUD.

## Dia 03/11
Implementação do update completamente finalizada, a partir de agora já começo a ver formas de como prover um ambiente adequado para que executem o projeto.

## Dia 04/03
Optei por usar o Docker para prover o ambiente para a aplicação. Tive uma leve dor de cabeça com o container do MySQL iniciando antes do backend, mas depois de muita pesquisa, resolvi o problema com a declaração depends on no docker compose. Criar uma rede interna para os containers também foi necessário, pois o MySQL mudava o IP com alguma frequência, novamente dificultando a comunicação entre o backend e o banco de dados.

## Dia 05/03
Último dia de entrega, optei por documentar, foi sem dúvidas um projeto de grande aprendizado!