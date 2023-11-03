function fillTable (result) 
{
	// Limpa a tabela atual
	let oldTable = document.getElementById('carsTable')

	for (let i=oldTable.rows.length-1; i>=1; i--) {
		oldTable.deleteRow(i)
	}

	const interestingData = [
		'id',
		'locadora',
		'modelo',
		'marca',
		'ano',
		'motor',
		'portas',
		'cambio',
		'ar_condicionado'
	]
	
	for (let i=0; i<result.length; i++) {
		// Crie uma nova linha
		let newRow = document.createElement('tr')
		newRow.className = 'text-center'
		for (let j in interestingData)
		{
			console.log(result[i][j])
			let cell = document.createElement('td')
			cell.classList.add('linha-tabela')

			if (result[i][interestingData[j]] === true)
				cell.textContent = 'Sim'
			else if (result[i][interestingData[j]] === false)
				cell.textContent = 'Não'
			else
				cell.textContent = result[i][interestingData[j]]

			newRow.appendChild(cell)
		}

		// <td class="linha-tabela">
		// 	<table>
		// 		<tr>
		// 			<td>
		// 				<div class="btn-group" role="group" aria-label="Basic example">
		// 					<button type="button" class="btn btn-secondary">Update</button>
		// 					<button type="button" class="btn btn-danger">Delete</button>
		// 				</div>
		// 			</td>
		// 		</tr>
		// 	</table>
		// </td>

		// A estrutura acima é a que será construida dinamicamente abaixo

		let innerTable = document.createElement('table')
		let innerRow = document.createElement('tr')
		let innerCell = document.createElement('td')
		let innerDiv = document.createElement('div')
		let innerButtonUpdate = document.createElement('button')
		let innerButtonDelete = document.createElement('button')

		innerDiv.className = 'btn-group'
		innerDiv.role = 'group'
		innerDiv.setAttribute('aria-label', 'Basic example')
		
		innerButtonUpdate.className = 'btn btn-secondary'
		innerButtonUpdate.id = 'btnUpdate-'+result[i]['id']
		innerButtonUpdate.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Atualizar'
		
		innerButtonDelete.className = 'btn btn-danger'
		innerButtonDelete.id = 'btnDelete-'+result[i]['id']
		innerButtonDelete.innerHTML = '<i class="bi bi-x-square btn-light"></i> Excluir'

		innerDiv.appendChild(innerButtonUpdate)
		innerDiv.appendChild(innerButtonDelete)
		innerCell.appendChild(innerDiv)
		innerRow.appendChild(innerCell)
		innerTable.appendChild(innerRow)
		newRow.appendChild(innerTable)

		let table = document.getElementById('carsTable')
		table.appendChild(newRow)
	}
}

function addEvents () 
{
	const btnList = document.getElementById('btnList')
	const form = document.getElementById('form-crud')
	const table = document.getElementById('carsTable')
	const endpoint = 'http://localhost:3000/veiculos'
		
	form.addEventListener('submit', (evt) => {
		evt.preventDefault() // Evita o comportamento padrão do formulário
		const formData = new FormData(form)
		
		let cambio = document.getElementById('cambio').value
		formData.append('cambio', cambio)
		let data = Object.fromEntries(formData)
		
		data.ar_condicionado = data.ar_condicionado === 'on' // Converte para booleano para ficar conveniente no backend

		console.log(data)

		// Enviar o JSON para o endpoint especificado
		fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			mode: 'cors'
		})
		.then((response) => response.json())
		.then((result) => {
			console.log('Dados enviados com sucesso:', result)
			fillTable(result)
		})
		.catch((error) => {
			console.error('Erro ao enviar dados:', error)
		})
	})

	btnList.addEventListener('click', (evt) => {
		evt.preventDefault() // Evita o comportamento padrão
		console.log('vamos listar')
		// Cria um objeto HTML para inserir depois
		fetch(endpoint)
		.then((response) => response.json())
		.then((result) => {
			fillTable(result)
		})
		.catch((error) => {
			console.error('Erro ao receber dados:', error)
		})
	})

	table.addEventListener('click', (evt) => {
		let deleteText = 'btnDelete'
		let updateText = 'btnUpdate'

		if (evt.target.id.includes(deleteText)) {
			let id = evt.target.id.split('-')[1]
			console.log('Deletando o ID ', id)

			fetch(endpoint+'/'+id, {
				method: 'DELETE',
				mode: 'cors'
			})
			.then((response) => response.json())
			.then((result) => {
				console.log('Dados deletados com sucesso:', result)
				fillTable(result)
			})
			.catch((error) => {
				console.error('Erro ao deletar dados:', error)
			})
		}

		// Abaixo, a extensa rotina de atualização de dados
		if (evt.target.id.includes(updateText)) {
			let id = evt.target.id.split('-')[1]
			let endpointId = endpoint+'/'+id

			// Array de referência
			let array = ['id', 'locadora', 'modelo', 'marca', 'ano', 'motor', 'portas', 'cambio', 'ar_condicionado']

			// Obtém a referência para a tabela
			const table = document.getElementById('carsTable');

			// Obtém todas as linhas da tabela
			const lines = table.getElementsByTagName('tr');

			// Loop através das linhas
			for (let i = 1; i < lines.length; i++) {
				const celulas = lines[i].getElementsByTagName('td'); // Obtém todas as células da linha

				// Loop através das células
				for (let j = 0; j < celulas.length-1; j++) {
					idCapturado = celulas[0].textContent
					
					let valorCelula = celulas[j].textContent; // Obtém o conteúdo da célula
					console.log('idCapturadoLinha = ', idCapturado, 'id = ', id)
					
					if (idCapturado != id.toString())
						break;

					array[j] = valorCelula
				}
			}
			
			document.getElementById('locadora').value = array[1]
			document.getElementById('modelo').value = array[2]
			document.getElementById('marca').value = array[3]
			document.getElementById('ano').value = array[4]
			document.getElementById('motor').value = array[5]
			document.getElementById('portas').value = array[6]
			document.getElementById('cambio').value = array[7]
			document.getElementById('ar_condicionado').checked = array[8] === 'Sim' ? true : false

			// Remover botão Adicionar e Listar
			if (document.getElementById('btnAdd') != null)
				document.getElementById('btnAdd').remove()

			if (document.getElementById('btnList') != null)
				document.getElementById('btnList').remove()

			// Adicionar botão Atualizar
			if (document.getElementById('btnUpdate') == null)
			{
				let btnUpdate = document.createElement('button')

				btnUpdate.className = 'btn btn-primary'
				btnUpdate.id = 'btnUpdate'
				btnUpdate.textContent = 'Atualizar veículo'
				btnUpdate.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Atualizar'
				document.getElementById('form-crud').appendChild(btnUpdate)

				// Estilizando o botão
				btnUpdate.style.marginLeft = 'auto'
				btnUpdate.style.marginRight = 'auto'
				btnUpdate.style.display = 'block'
				btnUpdate.style.width = '50%'

				//Adiciona um <br> para separar os botões
				let br = document.createElement('br')
				document.getElementById('form-crud').appendChild(br)
			}

			// Após a captura dos dados e a construção do botão, adiciona um evento de atualização
			btnUpdate.addEventListener('click', (evt) => {
				evt.preventDefault() // Evita o comportamento padrão do formulário
				const formData = new FormData(form)
				
				let cambio = document.getElementById('cambio').value
				formData.append('cambio', cambio)
				let data = Object.fromEntries(formData)
				
				data.ar_condicionado = data.ar_condicionado === 'on' // Converte para booleano para ficar conveniente no backend

				console.log(data)

				// Enviar o JSON para o endpoint especificado
				fetch(endpointId, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					mode: 'cors'
				})
				.then((response) => response.json())
				.then((result) => {
					console.log('Dados atualizados com sucesso:', result)
					location.reload(true);
				})
				.catch((error) => {
					console.error('Erro ao atualizar dados:', error)
				})
			})
		}
	})
}

document.addEventListener('DOMContentLoaded', addEvents)