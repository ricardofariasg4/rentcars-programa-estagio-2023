const { Sequelize } = require('sequelize');

// Criando a conexão
// const sequelize = new Sequelize('mysql://root:ANSKk08aPEDbFjDO@172.17.0.2:3306/testing');
const sequelize = new Sequelize('testing', 'root', 'ANSKk08aPEDbFjDO', {
    host: '172.17.0.2',
    dialect: 'mysql',
    port: 3306
  });

// Testando a conexão
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexao com o MySQL bem sucedida!');
  } catch (error) {
    console.error('A conexao com o MySQL falhou!', error);
  }
}

testDatabaseConnection();
module.exports = sequelize;