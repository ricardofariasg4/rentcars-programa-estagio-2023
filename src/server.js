const express = require('express')
const app = express()
const port = 3000

// 3.2 Endpoints da API
// O projeto fornece os seguintes endpoints para gerenciar veículos:

// GET /veiculos: Retorna a lista de todos os veículos.
// GET /veiculos/:id: Retorna os detalhes de um veículo específico com base no ID.
// POST /veiculos: Cria um novo veículo.
// PUT /veiculos/:id: Atualiza os detalhes de um veículo existente com base no ID.
// DELETE /veiculos/:id: Exclui um veículo com base no ID.

app.get('/', function (req, res) {
    res.send('<h1>A API ta no ar rapazeadaaaaaa e me chamo ricardo</h1>');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})