document.querySelector('#productos').addEventListener('click', () => productos('1'));

function productos(page) {
    document.getElementById('cardHeader').innerHTML = '<h5><i class="fa-solid fa-box-open"></i> Listado de productos</h5>'
    const URL = 'https://reqres.in/api/products?page=' + page;
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
    })
    .then(res => res.json().then(data => ({status: res.status, info: data.data})))
    .then(resultado => {

        if (resultado.status === 200) {
            let table = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Año</th>
                            <th scope="col">Color</th>
                            <th scope="col">Demo Color</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            resultado.info.forEach(producto => {
                table = table + `
                        <tr>
                            <td>${producto.id}</td>
                            <td>${producto.name}</td>
                            <td>${producto.year}</td>
                            <td>${producto.color}</td>
                            <td>
                                <div style="width:100px; height:30px; background-color:${producto.color}; border:1px solid #000;"></div>
                            </td>
                        </tr>
                `
            });
            table += `
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
                            <li class="page-item"><a class="page-link" href="#userPage1" onclick="productos('1')">1</a></li>
                            <li class="page-item"><a class="page-link" href="#userPage2" onclick="productos('2')">2</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            `
            document.getElementById('info').innerHTML = table;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la api</h3>';
        }
    })
}