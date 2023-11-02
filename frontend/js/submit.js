function fillTable (result) 
{
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


	// Limpa a tabela atual
	let oldTable = document.getElementById('carsTable');

	for (let i=oldTable.rows.length-1; i>=1; i--) {
		oldTable.deleteRow(i);
	}

	const interstingData = [
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
		let newRow = document.createElement('tr');
		newRow.className = 'text-center';
		for (let j in interstingData)
		{
			console.log(result[i][j])
			let cell = document.createElement('td');
			cell.classList.add('linha-tabela');

			if (result[i][interstingData[j]] === true)
				cell.textContent = 'Sim';
			else if (result[i][interstingData[j]] === false)
				cell.textContent = 'Não';
			else
				cell.textContent = result[i][interstingData[j]]

			newRow.appendChild(cell);
		}

		let innerTable = document.createElement('table');
		let innerRow = document.createElement('tr');
		let innerCell = document.createElement('td');
		let innerDiv = document.createElement('div');

		innerDiv.className = 'btn-group';
		innerDiv.role = 'group';
		innerDiv.setAttribute('aria-label', 'Basic example');
		
		let innerButtonUpdate = document.createElement('button');
		innerButtonUpdate.className = 'btn btn-secondary';
		innerButtonUpdate.textContent = 'Update';
		innerButtonUpdate.id = result[i]['id'];
		
		let innerButtonDelete = document.createElement('button');
		innerButtonDelete.className = 'btn btn-danger';
		innerButtonDelete.textContent = 'Delete';
		innerButtonDelete.id = 'btnDelete-'+result[i]['id'];

		innerDiv.appendChild(innerButtonUpdate);
		innerDiv.appendChild(innerButtonDelete);
		innerCell.appendChild(innerDiv);
		innerRow.appendChild(innerCell);
		innerTable.appendChild(innerRow);
		newRow.appendChild(innerTable);

		let table = document.getElementById('carsTable'); // Substitua 'sua-tabela-id' pelo ID da sua tabela
		table.appendChild(newRow);
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
		formData.append('cambio', cambio);
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
			console.log('vamos deletar o id', id)

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
	})
}

document.addEventListener('DOMContentLoaded', addEvents)

