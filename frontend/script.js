const API = 'http://localhost:3000/alunos'

const form = document.getElementById('formAluno')

const lista = document.getElementById('listaAlunos')

const totalAlunos =
  document.getElementById('totalAlunos')

const totalMeninos =
  document.getElementById('totalMeninos')

const totalMeninas =
  document.getElementById('totalMeninas')

const totalTurmas =
  document.getElementById('totalTurmas')

let graficoGenero
let graficoIdade

async function carregarAlunos() {

  const resposta = await fetch(API)

  const alunos = await resposta.json()

  renderizarCards(alunos)

  atualizarDashboard(alunos)
}

function renderizarCards(alunos) {

  lista.innerHTML = ''

  alunos.forEach(aluno => {

    const card = document.createElement('div')

    card.classList.add('aluno-card')

    card.innerHTML = `
      <h3>${aluno.nome}</h3>

      <p>
        <strong>Idade:</strong>
        ${aluno.idade}
      </p>

      <p>
        <strong>Sexo:</strong>
        ${aluno.sexo}
      </p>

      <p>
        <strong>Turma:</strong>
        ${aluno.turma}
      </p>
    `

    card.addEventListener('click', () => {
      abrirModal(aluno)
    })

    lista.appendChild(card)
  })
}

function atualizarDashboard(alunos) {

  totalAlunos.innerText = alunos.length

  const meninos = alunos.filter(
    aluno => aluno.sexo === 'Masculino'
  ).length

  const meninas = alunos.filter(
    aluno => aluno.sexo === 'Feminino'
  ).length

  totalMeninos.innerText = meninos

  totalMeninas.innerText = meninas

  const turmas = [
    ...new Set(
      alunos.map(aluno => aluno.turma)
    )
  ]

  totalTurmas.innerText = turmas.length

  gerarGraficoGenero(meninos, meninas)

  gerarGraficoIdade(alunos)
}

function gerarGraficoGenero(
  meninos,
  meninas
) {

  const ctx =
    document.getElementById('graficoGenero')

  if (graficoGenero) {
    graficoGenero.destroy()
  }

  graficoGenero = new Chart(ctx, {

    type: 'doughnut',

    data: {

      labels: [
        'Meninos',
        'Meninas'
      ],

      datasets: [{
        data: [
          meninos,
          meninas
        ]
      }]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false
    }
  })
}

function gerarGraficoIdade(alunos) {

  const criancas = alunos.filter(
    aluno => aluno.idade <= 12
  ).length

  const adolescentes = alunos.filter(
    aluno =>
      aluno.idade > 12 &&
      aluno.idade <= 17
  ).length

  const adultos = alunos.filter(
    aluno => aluno.idade >= 18
  ).length

  const ctx =
    document.getElementById('graficoIdade')

  if (graficoIdade) {
    graficoIdade.destroy()
  }

  graficoIdade = new Chart(ctx, {

    type: 'bar',

    data: {

      labels: [
        'Crianças',
        'Adolescentes',
        'Adultos'
      ],

      datasets: [{
        label: 'Quantidade',

        data: [
          criancas,
          adolescentes,
          adultos
        ]
      }]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false
    }
  })
}

form.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault()

    const aluno = {

      nome:
        document.getElementById('nome').value,

      idade:
        document.getElementById('idade').value,

      sexo:
        document.getElementById('sexo').value,

      turma:
        document.getElementById('turma').value,

      cpf:
        document.getElementById('cpf').value,

      rg:
        document.getElementById('rg').value,

      nascimento:
        document.getElementById('nascimento').value,

      nomeMae:
        document.getElementById('nomeMae').value,

      nomePai:
        document.getElementById('nomePai').value,

      telefone:
        document.getElementById('telefone').value,

      email:
        document.getElementById('email').value,

      endereco:
        document.getElementById('endereco').value
    }

    await fetch(API, {

      method: 'POST',

      headers: {
        'Content-Type':
          'application/json'
      },

      body: JSON.stringify(aluno)
    })

    form.reset()

    carregarAlunos()
  }
)

function abrirModal(aluno) {

  const modal =
    document.getElementById('modal')

  const detalhes =
    document.getElementById('detalhesAluno')

  detalhes.innerHTML = `

    <h2>${aluno.nome}</h2>

    <div class="detalhes-grid">

      <div class="info-box">
        <strong>Idade</strong>
        ${aluno.idade}
      </div>

      <div class="info-box">
        <strong>Sexo</strong>
        ${aluno.sexo}
      </div>

      <div class="info-box">
        <strong>Turma</strong>
        ${aluno.turma}
      </div>

      <div class="info-box">
        <strong>CPF</strong>
        ${aluno.cpf}
      </div>

      <div class="info-box">
        <strong>RG</strong>
        ${aluno.rg}
      </div>

      <div class="info-box">
        <strong>Nascimento</strong>
        ${aluno.nascimento}
      </div>

      <div class="info-box">
        <strong>Nome da mãe</strong>
        ${aluno.nomeMae}
      </div>

      <div class="info-box">
        <strong>Nome do pai</strong>
        ${aluno.nomePai}
      </div>

      <div class="info-box">
        <strong>Telefone</strong>
        ${aluno.telefone}
      </div>

      <div class="info-box">
        <strong>Email</strong>
        ${aluno.email}
      </div>

      <div class="info-box">
        <strong>Endereço</strong>
        ${aluno.endereco}
      </div>

    </div>
  `

  modal.style.display = 'flex'
}

const fecharModal =
  document.getElementById('fecharModal')

fecharModal.addEventListener(
  'click',
  () => {

    document.getElementById(
      'modal'
    ).style.display = 'none'
  }
)

window.addEventListener(
  'click',
  (e) => {

    const modal =
      document.getElementById('modal')

    if (e.target === modal) {
      modal.style.display = 'none'
    }
  }
)

carregarAlunos()