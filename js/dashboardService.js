document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded');
    validarToken();
});

document.querySelector('#salir').addEventListener('click', e => {
    localStorage.removeItem('token');
    location.href = '/index.html';
});

function validarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        location.href = '/index.html';
    } 
}