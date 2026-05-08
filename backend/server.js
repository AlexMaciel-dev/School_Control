const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const arquivo = './alunos.json'

function lerDados() {
  const dados = fs.readFileSync(arquivo)
  return JSON.parse(dados)
}

function salvarDados(dados) {
  fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2))
}

app.get('/alunos', (req, res) => {
  const alunos = lerDados()
  res.json(alunos)
})

app.post('/alunos', (req, res) => {
  const alunos = lerDados()

  const novoAluno = {
    id: Date.now(),
    ...req.body
  }

  alunos.push(novoAluno)
  salvarDados(alunos)

  res.status(201).json(novoAluno)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})