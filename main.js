'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

// Crud - Create Read Update Delete

const tempClient ={
    nome: 'felipe',
    email: 'felipebarreto1050@gmail.com',
    celular: '(17) 99674-9148',
    cidade: 'Catanduva'
}

const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))
const getLocalStorage = () => JSON.parse(localStorage.getItem("dbClient")) ?? []

const deletar = (index) => {
    const dadoBanco = readClient()
    dadoBanco.splice(index,1)
    setLocalStorage(dadoBanco)
}

const updateClient = (index , client) =>{
    const dadosClient = readClient()
    dadosClient[index] = client
    setLocalStorage(dadosClient)
}

const readClient = () => getLocalStorage()

const creatClient = (client)=>{
    const dados = getLocalStorage()
    dados.push(client)
    setLocalStorage(dados)   
}

// EVENTOS
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

