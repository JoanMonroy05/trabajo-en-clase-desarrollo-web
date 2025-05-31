document.querySelector('#usuarios').addEventListener('click', () => usuarios('1'));

function usuarios(page) {
    document.getElementById('cardHeader').innerHTML = '<h5><i class="fa-solid fa-users"></i> Listado de usuarios</h5>'
    const URL = 'https://reqres.in/api/users?page=' + page;
    fetch(URL, { 
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(res => res.json().then(data => ({status: res.status, info: data})))
    .then(resultado => {
        if(resultado.status === 200){
            let listUsers = `
                <button onclick="addUser()" type="button" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            resultado.info.data.forEach(user => {
                listUsers = listUsers + `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getUser('${user.id}')"><i class="fa-solid fa-eye"></i></button></td>
                    </tr>
                `  
            });
            listUsers = listUsers + `
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#userPage1" onclick="usuarios('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#userPage2" onclick="usuarios('2')">2</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            `
            document.getElementById('info').innerHTML = listUsers;
        }
        else{
            document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
        }
    })
}

function getUser(id){ 
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/' + id
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) =>response.json().then(data => ({status: response.status, info: data})))
    .then(result => {
        if (result.status === 200) {
            showModalUser(result.info.data);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api';
        }
    })
}

function showModalUser(user) {
    const modalUser = `
        <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                    <div class="card-body">
                        <h5 class="card-title">Información del Usuario</h5>
                        <p class="card-text">Correo: ${user.email}</p>
                        <p class="card-text">Nombre: ${user.first_name}</p>
                        <p class="card-text">Apellido: ${user.last_name}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('modalUser').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'));
    modal.show();
}

function addUser() {
    const modalUserAdd = `
        <div class="modal fade" id="showModalUserAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                    <form id="formAddUser">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="text" id="last_name" class="form-control" placeholder="Apellidos" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col">
                                <input type="email" id="email" class="form-control" placeholder="Correo" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="url" id="avatar" class="form-control" placeholder="Link del avatar" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button onclick="saveUser()" type="button" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                            </div>
                        </div> 
                    </form>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('modalUser').innerHTML = modalUserAdd;
    const modal = new bootstrap.Modal(document.getElementById('showModalUserAdd'));
    modal.show();
}

function saveUser() {
    const form = document.getElementById('formAddUser');
    if (form.checkValidity()) {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const avatar = document.getElementById('avatar').value;
        const user = {firstName, lastName, email, avatar};

        const REQRES_ENDPOINT = 'https://reqres.in/api/users'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((response) =>response.json().then(data => ({status: response.status, info: data})))
        .then(result => {
            if (result.status === 201) {
                document.getElementById('info').innerHTML = '<h3 class="text-success"><i class="fa-solid fa-check"></i> El usuario se guardo correctamente</h3>';
            } else {
                document.getElementById('info').innerHTML = '<h3><i class="fa-solid fa-x"></i> No se guardo el usuario en la api</h3>';
                const modalId = document.getElementById('showModalUserAdd');
                const modal = bootstrap.Modal.getInstance(modalId);
                modal.hide();
            }
        })
    } else {
        form.reportValidity();
    }
}