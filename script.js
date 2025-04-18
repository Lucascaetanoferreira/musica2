const addBtn = document.getElementById('add-btn');
const cantorInput = document.getElementById('cantor-input');
const musicasInput = document.getElementById('musicas-input');
const generoInput = document.getElementById('genero-input');
const tableBody = document.getElementById('table-body');
const updatecantorInput = document.getElementById('update-cantor-input');
const updatemusicaInput = document.getElementById('update-musica-input');
const updategeneroInput = document.getElementById('update-genero-input');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

let cantores = JSON.parse(localStorage.getItem('cantores')) || [];
let currentcantorId = null;

function addCantor() {
    const cantor = cantorInput.value.trim();
    const musicas = musicasInput.value.trim();
    const genero = generoInput.value.trim();
    if (cantor && musicas && genero != null) {
        var id = 1;
        var val = cantores.map(x => x.id).indexOf(id);
        while (val != -1) {
            id++;
            val = cantores.map(
                function (x) {
                    return x.id;

                }
            ).indexOf(id);

        }
        const novo = {
            id: id,
            cantor: cantor,
            musicas: musicas,
            genero: genero

        };
        cantores.push(novo);
        localStorage.setItem('cantores', JSON.stringify(cantores));
        cantorInput.value = '';
        musicasInput.value = '';
        generoInput.value = '';
        renderTable();

    } else {
        alert('Preencha todos os campos!');
    }
}

function showUpdateForm(cantorId) {
    const cantor = cantores.find((cantor) => cantor.id == cantorId);
    if (cantor) {
        updatecantorInput.value = cantor.name;
        updatemusicaInput.value = cantor.musicas;
        updategeneroInput.value = cantor.genero;
        currentCantorId = cantorId;
        updateBtn.addEventListener('click', updateCantor);
        cancelBtn.addEventListener('click', hideUpdateForm);
        updateBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        updatecantorInput.style.display = 'inline-block';
        updatemusicaInput.style.display = 'inline-block';
        updategeneroInput.style.display = 'inline-block';
        document.getElementById('update-container').style.display = 'block';
    }
}

function updateCantor() {
    const cantor = updatecantorInput.value.trim();
    const musicas = updatemusicaInput.value.trim();
    const genero = updategeneroInput.value.trim();
    if (cantor && musicas && genero != null) {
        const index = cantores.findIndex((cantor) => cantor.id == currentcantorId);
        if (index !== currentcantorId) {
            cantores[index].cantor = cantor;
            cantores[index].musicas = cantores;
            cantores[index].genero = cantores;
            localStorage.setItem('cantores', JSON.stringify(cantores));
            hideUpdateForm();
            renderTable();
        }
    } else {
        alert('preencha todos os campos!');
    }
}

function hideUpdateForm() {
    updatecantorInput.value = '';
    updatemusicaInput.value = '';
    updategeneroInput.value = '';
    currentcantorId = null;
    updateBtn.removeEventListener('click', updateCantor);
    cancelBtn.removeEventListener('click', hideUpdateForm);
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    updatecantorInput.style.display = 'none';
    updatemusicaInput.style.display = 'none';
    updategeneroInput.style.display = 'none';
    document.getElementById('update-container').style.display = 'none';
}

function deleteCantor(cantorId) {
    cantores = cantores.filter((cantor) => cantor.id !== cantorId);
    localStorage.setItem('cantores', JSON.stringify(cantores));
    if (cantores.length == 0) {
        hideUpdateForm();
    }
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = '';
    for (let i = 0; i < cantores.length; i++) {
        const cantor = cantores[i];

        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const cantorTd = document.createElement('td');
        const musicasTd = document.createElement('td');
        const generoTd = document.createElement('td');
        const actionsTd = document.createElement('td');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.className = 'edit-btn';
        deleteBtn.className = 'delete-btn';

        idTd.innerText = cantor.id;
        cantorTd.innerText = cantor.cantor;
        musicasTd.innerText = cantor.musicas;
        generoTd.innerText = cantor.genero;
        editBtn.innerText = 'Editar';
        deleteBtn.innerText = 'Excluir';

        editBtn.addEventListener('click', () => {
            showUpdateForm(cantor.id)
        }
        );
        deleteBtn.addEventListener('click', () => {
            deletePlayer(cantor.id)
        }
        );
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        tr.appendChild(cantorTd);
        tr.appendChild(musicasTd);
        tr.appendChild(generoTd);
        tr.appendChild(actionsTd);
        tableBody.appendChild(tr);
    }
}

addBtn.addEventListener('click', addCantor);
renderTable();

