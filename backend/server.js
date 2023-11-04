// 3.2 Endpoints da API
// O projeto fornece os seguintes endpoints para gerenciar veículos:

// GET /veiculos: Retorna a lista de todos os veículos.
// GET /veiculos/:id: Retorna os detalhes de um veículo específico com base no ID.
// POST /veiculos: Cria um novo veículo.
// PUT /veiculos/:id: Atualiza os detalhes de um veículo existente com base no ID.
// DELETE /veiculos/:id: Exclui um veículo com base no ID.

const express = require('express')
const Veiculos = require('./veiculos')
const app = express()
const port = 3000

// Trata o body da requisição como JSON
app.use(express.json())

// Adiciona os headers necessários para o CORS
app.use(function (req, res, next) {

    // Origens permitidas (está como todos no momento pois não tenho um servidor web)
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Methods permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Headers permitidos
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Para o caso de precisar incluir cookies nas requisições
    res.setHeader('Access-Control-Allow-Credentials', true)

    next() // Passa para o próximo middleware
})

app.get('/', function (req, res) {
	res.send('<h1>API em execução...</h1>')
})

// Busca todos os veículos
app.get('/veiculos', async (req, res) => {
	try {
		const veiculos = await Veiculos.findAll()
		res.status(200).json(veiculos)
    } catch (error) {
		res.status(500).json({ error: 'Erro ao buscar veículos' })
    }
})

// Busca um veículo específico usando o ID
app.get('/veiculos/:id', async (req, res) => {
	try {
		const veiculos = await Veiculos.findByPk(req.params.id)

		if (!veiculos) {
			res.status(404).json({ error: 'Veículo não encontrado' })
		}

		res.status(200).json(veiculos)
    } catch (error) {
		res.status(500).json({ error: 'Erro ao buscar veículos' })
    }
})

// Cria um novo veículo e armazena no banco de dados
app.post('/veiculos', async (req, res) => {
	try {
		const { locadora, modelo, marca, ano, motor, portas, cambio, ar_condicionado } = req.body

		const veiculo = await Veiculos.create({
			locadora,
			modelo,
			marca,
			ano,
			motor,
			portas,
			cambio,
			ar_condicionado
		})

		const veiculos = await Veiculos.findAll() // Retornando todos posso remontar a lista no frontend (não sei se é seguro...)
		
		res.status(201).json(veiculos)
	} catch (error) {
		console.error('Erro ao criar um novo veículo:', error)
    	res.status(500).json({ error: 'Erro ao criar um novo veículo' })
	}
})

// Atualiza um veículo específico usando o ID
app.put('/veiculos/:id', async (req, res) => {
	try {
		// const { locadora, modelo, marca, ano, motor, portas, cambio, ar_condicionado } = req.body

		const veiculo = await Veiculos.findByPk(req.params.id)

		// Se o parametro não for nulo, atualiza o veículo
		for (let i in req.body) 
			if (req.body[i] !== null) 
				veiculo[i] = req.body[i]
			
		await veiculo.save()

		// res.status(200).json(veiculo)
		const veiculos = await Veiculos.findAll() // Retornando todos posso remontar a lista no frontend (não sei se é seguro...)
		res.status(201).json(veiculos)
	} catch (error) {
		res.status(500).json({ error: 'Erro ao atualizar o veículo' })
	}
})

app.delete('/veiculos/:id', async (req, res) => {
	try {
		const veiculo = await Veiculos.findByPk(req.params.id)

		if (!veiculo) {
			res.status(404).json({ error: 'Veículo não encontrado' })
		}

		await veiculo.destroy()

		const veiculos = await Veiculos.findAll() // Retornando todos posso remontar a lista no frontend (não sei se é seguro...)
		// res.status(200).json({ message: 'Veículo excluído com sucesso' })
		res.status(200).json(veiculos)
	} catch (error) {
		res.status(500).json({ error: 'Erro ao excluir o veículo' })
	}
})

app.listen(port, () => {
	console.log(`App executando na porta ${port}`)
})