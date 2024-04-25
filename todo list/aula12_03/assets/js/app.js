function validaSeExisteTarefasNoLocalStorageEMostraNaTela() {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        listaTarefas.forEach(tarefa => {
            const novoItem = document.createElement('li')
            
            criaNovoItemDaLista(textoDaTarefa)
            
            if (tarefa.status === 'fechada') {
               novoItem.style.textDecoration =  'line-through'    
            }
            listaTarefas.appendChild(novoItem)
        });
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    let qtdTarefas = listaTarefas.children.lengt
    
        const listaTarefas = document.getElementById('lista_de_tarefas')
            const novoItem = document.createElement('li')
            novoItem.innerText = tarefa.descricao
            novoItem.id = tarefa.id
            novoItem.setAttribute('data-status', tarefa.status);
            novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id, tarefa.status))
    
    novoItem.innerText = textoDaTarefa
    novoItem.id = `tarefa_id_${qtdTarefas}`

    novoItem.addEventListener('dblclick', function(){habilitaEdicao(novoItem)});
    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))
    listaTarefas.appendChild(novoItem)

    const tarefa = montaTarefa(novoItem.id, novoItem.innerText, 'aberta')
    adicionaTarefaAListaLocalStorage(tarefa)

    qtdTarefas++ // Incremento do contador após usar o valor
}

function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    // essa função coloca a risco na tarefa concluida após checkbox ter sido marcado
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }  
    mudaEstadoTarefaLocalStorage(idTarefa) 
}

function mudaEstadoTarefaLocalStorage(idTarefa) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        let listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                tarefa.status = tarefa.status === 'aberta' ? 'fechada' : 'aberta';
            }
        });
        localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas));
    }
}

function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('lista_tarefas') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
}

function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

function habilitaEdicao(itemLista) {
    const textoItem = itemLista.firstChild;
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.value = textoItem.textContent;
    novoInput.addEventListener('blur', () => salvaEdicao(itemLista, novoInput));
    textoItem.replaceWith(novoInput);
}

function salvaEdicao(itemLista, novoInput) {
    const novoTexto = novoInput.value;
    const textoItem = document.createElement('span');
    textoItem.textContent = novoTexto;
    novoInput.replaceWith(textoItem);
}

function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;

    if (novaTarefa.trim() !== '') {
        criaNovoItemDaLista(novaTarefa);
        document.getElementById('input_nova_tarefa').value = ''; 
    }
}

function ocultarTarefa() {
    // Seleciona todos os checkboxes no documento
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Itera sobre cada checkbox
    checkboxes.forEach(function(checkbox) {
        // Verifica se o checkbox está marcado
        if (checkbox.checked) {
                checkbox.parentNode.style.display = 'none';
        }
    });
}

function desocultarTarefas(){
    // Seleciona todos os checkboxes no documento
    const desocultarboxes = document.querySelectorAll('input[type="checkbox"]');
    // Itera sobre cada checkbox
    desocultarboxes.forEach(function(desocultarboxes) {
        // Verifica se o checkbox está marcado
        if (desocultarboxes.checked) {
            desocultarboxes.parentNode.style.display = 'list-item';
        }
    });
} 

function salvarConfiguracoesNoLocalStorage(configuracoes) {
    // Salva as configurações no localStorage
    const localStorage = window.localStorage;
    localStorage.setItem('configuracoes', JSON.stringify(configuracoes));
}

document.addEventListener('DOMContentLoaded', function() {
    validaSeExisteTarefasNoLocalStorageEMostraNaTela();
});
