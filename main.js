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
        creatClient(cliente)
        closeModal()
    }
}

// EVENTOS
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click',saveClient)

document.getElementById('cancelar')
    .addEventListener('click', cancelar)




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