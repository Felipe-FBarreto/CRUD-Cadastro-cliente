'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')

}
const cancelar = () =>{  
    clearFields()
    closeModal()
}

// Crud - Create Read Update Delete

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
// FUNÇÃO QUE VERIFICA SE OS CAMPOS DO FORm MODAL FORAM TODOS PREENCHIDOS

const isValidFields = () =>{
   return  document.getElementById('form').reportValidity()
}
/////////////////////////////////////////////////////////

// Interação com o layout

// LIMPAR COMPOS
const clearFields = () =>{
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}
// ////////////////////////////


const saveClient = () =>{
    if(isValidFields()){
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        const index = document.getElementById('nome').dataset.index
        if(index === 'new'){
            creatClient(cliente)
            updateTable()
            closeModal()
        }else
        updateClient(index,cliente)
        updateTable()
        closeModal()

    }
}

const createRow = (client,index) =>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" data-action="edit-${index}">Editar</button>
        <button type="button" class="button red" data-action="delete-${index}">Excluir</button>
    </td> `
    document.querySelector("#tableClient>tbody").appendChild(newRow)
}

const clearTable = () =>{
    const row = document.querySelectorAll("#tableClient>tbody tr")
    row.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () =>{
    const dadosClient = readClient()
    clearTable()
    dadosClient.forEach(createRow)
}
const fillFields = (client) =>{
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}
const editeClient = (index) =>{
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}
const editeDelete = (event) =>{
    if(event.target.type == "button"){
       const [action,index] = event.target.dataset.action.split('-')
       
        if(action == 'edit'){
            editeClient(index)
        }else{
            const client = readClient()[index]
            const response = confirm(`Deseja realmente exluir o cliente ${client.nome}`)
            if(response){
                deletar(index)
                updateTable()
            }
        }

    }   
        
}
updateTable()

// EVENTOS
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click',saveClient)

document.getElementById('cancelar')
    .addEventListener('click', cancelar)

document.querySelector('#tableClient>tbody')
    .addEventListener('click',editeDelete)

/////// MASK PARA CELULAR COM DDD E NUMERO SEPARADO
jQuery("input.telefone")
.mask("(99) 9 9999-9999")
.focusout(function (event) {  
    let target, phone, element;  
    target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
    phone = target.value.replace(/\D/g, '');
    element = $(target);  
    element.unmask();  
    if(phone.length > 10) {  
        element.mask("(99) 9 9999-9999");  
    } else {  
        element.mask("(99) 9 9999-9999");  
    }  
});