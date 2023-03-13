(function (){ 
    // VARIABLES 
    const contacto = document.querySelector('.js-contacto');
    const newsletter = document.querySelector('.js-newsletter__form');

    // EVENTOS
    window.addEventListener('DOMContentLoaded', () => {
        console.log('documento preparado')
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

})();