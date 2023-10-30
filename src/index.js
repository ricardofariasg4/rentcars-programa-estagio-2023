(async () => {
    const database = require('./config/database.js');
    const Veiculos = require('./models/veiculos.js');
    await database.sync();
})();