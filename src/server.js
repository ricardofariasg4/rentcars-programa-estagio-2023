const express = require('express')
const app = express()
const port = 3000
const Veiculos = require('../src/models/veiculos.js');

app.use(express.json());

// 3.2 Endpoints da API
// O projeto fornece os seguintes endpoints para gerenciar veículos:

// GET /veiculos: Retorna a lista de todos os veículos.
// GET /veiculos/:id: Retorna os detalhes de um veículo específico com base no ID.
// POST /veiculos: Cria um novo veículo.
// PUT /veiculos/:id: Atualiza os detalhes de um veículo existente com base no ID.
// DELETE /veiculos/:id: Exclui um veículo com base no ID.

app.get('/', function (req, res) {
	res.send('<h1>API em execução...</h1>');
});

// Busca todos os veículos
app.get('/veiculos', async (req, res) => {
	try {
		const veiculos = await Veiculos.findAll();
		res.status(200).json(veiculos);
    } catch (error) {
		res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});

// Busca um veículo específico usando o ID
app.get('/veiculos/:id', async (req, res) => {
	try {
		const veiculos = await Veiculos.findByPk(req.params.id);

		if (!veiculos) {
			res.status(404).json({ error: 'Veículo não encontrado' });
		}

		res.status(200).json(veiculos);
    } catch (error) {
		res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});

// Cria um novo veículo e armazena no banco de dados
app.post('/veiculos', async (req, res) => {
	try {
		const { locadora, modelo, marca, ano, motor, portas, cambio, ar_condicionado } = req.body;

		const veiculo = await Veiculos.create({
			locadora,
			modelo,
			marca,
			ano,
			motor,
			portas,
			cambio,
			ar_condicionado
		});

		res.status(201).json(veiculo);
	} catch (error) {
		console.error('Erro ao criar um novo veículo:', error);
    	res.status(500).json({ error: 'Erro ao criar um novo veículo' });
	}
});

// Atualiza um veículo específico usando o ID
app.put('/veiculos/:id', async (req, res) => {
	try {
		const { locadora, modelo, marca, ano, motor, portas, cambio, ar_condicionado } = req.body;

		const veiculo = await Veiculos.findByPk(req.params.id);

		// Se o parametro não for nulo, atualiza o veículo
		for (let i in req.body) 
			if (req.body[i] !== null) 
				veiculo[i] = req.body[i];
			
		await veiculo.save();

		res.status(200).json(veiculo);
	} catch (error) {
		console.error('Erro ao atualizar o veículo:', error);
		res.status(500).json({ error: 'Erro ao atualizar o veículo' });
	}
});

app.delete('/veiculos/:id', async (req, res) => {
	try {
		const veiculo = await Veiculos.findByPk(req.params.id);

		if (!veiculo) {
			res.status(404).json({ error: 'Veículo não encontrado' });
		}

		await veiculo.destroy();

		res.status(200).json({ message: 'Veículo excluído com sucesso' });
	} catch (error) {
		res.status(500).json({ error: 'Erro ao excluir o veículo' });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});