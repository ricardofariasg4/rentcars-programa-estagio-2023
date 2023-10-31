function listarDados () {
    // URL da API que fornece o JSON
const apiUrl = 'http://localhost:3000/veiculos/13';

// Usando o fetch para recuperar o JSON
fetch(apiUrl)
  .then((response) => {
    // Verificando se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao recuperar os dados da API');
    }
    // Parse da resposta JSON
    return response.json();
  })
  .then((data) => {
    // Aqui você pode trabalhar com os dados JSON
    console.log(data);
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
}

const form = document.getElementById('form-crud');

document.addEventListener('DOMContentLoaded', function() {
    form.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita o comportamento padrão
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        data.ar_condicionado = data.ar_condicionado === 'on';
    
        console.log(data);       

        // Enviar o JSON para o endpoint especificado
        fetch('http://localhost:3000/veiculos', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Dados enviados com sucesso:', result);
        })
        .catch((error) => {
            console.error('Erro ao enviar dados:', error);
        });
    });
});

