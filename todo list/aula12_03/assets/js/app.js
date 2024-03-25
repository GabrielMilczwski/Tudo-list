function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas   = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')
    
    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`
    //doisclick 
    novoItem.addEventListener('dblclick', function(){habilitaEdicao(novoItem);
    });
    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)
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
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }     
}

function ocultarTarefa(){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentNode.style.display = 'none';
        }
    });
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