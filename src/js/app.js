(function (){ 
    // VARIABLES 
    const btnBuscador = document.querySelector('.js-header__centro')
    const btnConsulta = document.querySelector('.js-submenu__boton-consulta');
    const btnChat = document.querySelector('.js-submenu__boton-chat');
    const carrito = document.querySelector('.js-menus__cesta ul');
    const grid = document.querySelector('.js-item__grid');
    const contacto = document.querySelector('.js-contacto');
    const newsletter = document.querySelector('.js-newsletter__form');

    // EVENTOS
    window.addEventListener('DOMContentLoaded', () => {
        comprobarCarrito();
    })
    btnConsulta.addEventListener('click', () => {
        mostrarContacto();
    })
    btnChat.addEventListener('click', () => {
        console.log('no hagas nada de momento');
    })
    btnBuscador.addEventListener('click', () => {
        console.log('has pulsado el buscador');
    })
    grid.addEventListener('click', () => {
        console.log('has pulsado la grid');
    })
    contacto.children[0].addEventListener('click', () => {
        mostrarContacto();
    })
    newsletter.children[0].addEventListener('click', () => {
        mostrarRadioButton();
    })



    // FUNCIONES
    function mostrarContacto () {
        contacto.children[1].classList.toggle('c-contacto__screen--mod');
        contacto.children[0].children[0].classList.toggle('c-contacto__img--mod');
        contacto.children[0].children[0].classList.toggle('fa-envelope');
        contacto.children[0].children[0].classList.toggle('fa-xmark');
        contacto.children[0].children[0].classList.toggle('fa-solid');
        contacto.children[0].children[0].classList.toggle('fa-regular'); 
    };

    function mostrarRadioButton() {
        if(newsletter.children[2].classList.contains('c-newsletter__form-radio--mod') == 0) {
            newsletter.children[2].classList.add('c-newsletter__form-radio--mod');
        }
    }

    function comprobarCarrito () {
        if(carrito.childElementCount == 0) {
            mostrarCarrito(0);
        } else {
            mostrarCarrito(carrito.childElementCount);
        }
    }

    function mostrarCarrito (numero) {
        // numero articulos de la cesta
        const numeroArticulos = document.createElement('p');
        numeroArticulos.classList.add('c-menus__cesta-numero');
        numeroArticulos.textContent = numero;
        carrito.parentElement.parentElement.children[0].appendChild(numeroArticulos);
        
    }
})();