(function (){ 
    // VARIABLES 
    // variables para eventos
    const btnBuscador = document.querySelector('.js-header__centro');
    const btnConsulta = document.querySelector('.js-submenus__boton-consulta');
    const btnChat = document.querySelector('.js-submenus__boton-chat');
    const btnContacto = document.querySelector('.js-contacto');
    const formularioNewsletter = document.querySelector('.js-newsletter__form');

    // Variables contenedor para inyeccion dinámica de resultados
    const contenedorDestacados = document.querySelector('.js-item__grid');
    const contenedorNumArticulos = document.querySelector('.js-menus__cesta-numero');
    const contenedorCarrito = document.querySelector('.js-submenus__cesta');
    const contenedorModal = document.querySelector('.js-modal');
    const contenedorBuscador = document.querySelector('.js-buscador');
    
    let articulosCarrito = [];

    // CLASES
    class UI {
        limpiarHTML (contenedor) {
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
        }

        quitarDescuento (contenedor) {
            // console.log(contenedor.childElementCount)
            for(let i=0; i<contenedor.childElementCount; i++) {
                let descuento = contenedor.children[i].children[0];
                let precio = contenedor.children[i].children[2].children[1].children[1];
                // console.log(descuento)
                // console.log(precio)
                if (parseInt(descuento.children[0].textContent) === 0) {
                    descuento.classList.add('u-display--none');
                    precio.classList.add('u-display--none');
                }
            }
        }

        buscadorArticulos () {
            const buscadorScreen = document.createElement('div');
            buscadorScreen.classList.add('c-buscador__screen');
            buscadorScreen.innerHTML = `
                <div class='c-buscador__contenedor'>
                    <div class='c-buscador__cabecera'>
                        <div class='c-buscador__logo'>
                            <a href="https://javicerezo.github.io/tienda-online/"><img src='build/img/logo.svg' alt='logo empresa'></a>
                        </div>
                        <form action='' class='c-buscador__form'>
                            <input class='c-buscador__input' placeholder='Buscar...'>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </form>
                        <div class='c-buscador__close'>
                            <i class='fa-solid fa-xmark'></i>
                        </div>
                    </div>
                    <div class='c-buscador__contenido'>
                        <div class='c-buscador__productos-populares'>
                            <p class='c-buscador__p'>Búsquedas populares</p>
                            <ul class='c-buscador__ul-populares'>
                                <li class='c-buscador__li-populares'>Pies de gato</li>
                                <li class='c-buscador__li-populares'>Grifone</li>
                                <li class='c-buscador__li-populares'>Sacos de dormir</li>
                                <li class='c-buscador__li-populares'>Petzl</li>
                                <li class='c-buscador__li-populares'>La Sportiva</li>
                                <li class='c-buscador__li-populares'>Cuerdas dinámicas</li>
                                <li class='c-buscador__li-populares'>Patagonia</li>
                                <li class='c-buscador__li-populares'>La Sportiva</li>
                            </ul>
                        </div>
                        <div class='c-buscador__productos-buscar'>
                            <p class='c-buscador__p'>Productos recomendados</p>
                            <ul class='c-buscador__ul-buscar js-buscador__ul-buscar'>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            contenedorBuscador.appendChild(buscadorScreen);
            contenedorBuscador.classList.add('c-buscador--mod');
            contenedorBuscador.children[0].children[0].classList.add('c-buscador__screen--mod');

            const contenedorUl = document.querySelector('.js-buscador__ul-buscar');
            ejemploBusqueda.forEach( articulo => {
                const {marca, nombre, imagen, precio, descuento} = articulo;
                let precioNew = precio * ((100-descuento)/100);
                precioNew = Math.round(precioNew *100)/100;
                const li = document.createElement('li');
                li.classList.add('c-buscador__li');
                li.innerHTML = `
                    <div class='c-buscador__li-descuento'>
                        <p>${descuento}%</p>
                    </div>
                    <div class='c-buscador__li-img'>
                        <img src='${imagen}' alt='imagen producto'>
                    </div>                        
                    <div class='c-buscador__li-contenido'>
                        <p class='c-buscador__li-titulo'><span>${marca} </span>${nombre}</p>                                        
                        <div class ='c-buscador__li-contenido--mod'>
                            <p class='c-buscador__li-precio'>${precioNew} €</p>  
                            <p class='c-buscador__li-precio--old'>${precio} €</p>                        
                        </div>
                    </div>
                `;
                contenedorUl.appendChild(li);
            });
            this.quitarDescuento(contenedorUl);            
        }

        leerArticulo (accion, producto) {
            // creo obj con el contenido del producto 
            const infoProducto = {
                imagen: producto.querySelector('img').src,
                marca: producto.querySelector('.c-item__contenido-titulo:first-Child').textContent,
                nombre: producto.querySelector('.c-item__contenido-titulo:last-Child').textContent,
                precioNew: parseFloat(producto.querySelector('.c-item__contenido-precio').textContent),
                precio: parseFloat(producto.querySelector('.c-item__contenido-precio--old').textContent),
                descuento: parseFloat(producto.querySelector('.c-item__descuento p').textContent),
                id: producto.querySelector('.c-button').getAttribute('data-id'),
                cantidad: 1
            };    
            if(accion === 'carrito') {
                console.log('añadiendo al carrito');
                this.agregarCarrito(infoProducto);
            }
            if(accion === 'modal') {
                this.modalArticulos(infoProducto)
            }
        }

        modalArticulos (producto) {
            const {imagen, marca, nombre, precioNew, precio, descuento} = producto;
            const modalScreen = document.createElement('div');
            modalScreen.classList.add('c-modal__screen');
            modalScreen.innerHTML = `
                <div class='c-modal__contenedor'>
                    <div class='c-item__descuento c-modal__descuento'>
                        <p>${descuento}%</p>
                    </div>
                    <div class='c-item__img c-modal__img'>
                        <img src='${imagen}' alt='imagen producto'>
                    </div>
                    <div class='c-item__contenido c-modal__contenido'>
                        <div class='c-item__contenido--mod'>
                            <p class='c-item__contenido-titulo c-modal__contenido-titulo'><span>${marca}</span></p>
                            <p class='c-item__contenido-titulo c-modal__contenido-titulo'>${nombre}</p>
                        </div>
                        <div class ='c-item__contenido--mod'>
                            <p class='c-item__contenido-precio c-modal__contenido-precio'>${precioNew} €</p>  
                            <p class='c-item__contenido-precio--old c-modal__contenido-precio--old'>${precio} €</p>                        
                        </div>                    
                    </div>
                    <div class='c-modal__close'>
                        <i class='fa-solid fa-xmark'></i>
                    </div> 
                </div>
            `;
            contenedorModal.appendChild(modalScreen);
            contenedorModal.classList.add('c-modal--mod');
            this.quitarDescuento(modalScreen);
        }

        agregarCarrito (producto) {
            // comprueba si existe en el producto y añade producto entero, o modifica su cantidad
            const existe = articulosCarrito.some( articulo => articulo.id === producto.id );
            if (existe) { 
                const articulosModificadosCarrito = articulosCarrito.map( articulo => {
                    if (articulo.id === producto.id) {
                        articulo.cantidad++;
                        return articulo; //retorna obj modificado en cantidad
                    } else {
                        return articulo; //retorna los demás obj no duplicados
                    }
                });
                articulosCarrito = [... articulosModificadosCarrito];
                this.imprimircarrito(articulosCarrito);
            } else {
                articulosCarrito = [...articulosCarrito, producto];
                this.imprimircarrito(articulosCarrito);
            }
        }

        eliminarArticulo (articulo) {
            if (articulo.classList.contains('js-submenus__cesta-eliminar')) {
                const id = articulo.getAttribute('data-id');
                articulosCarrito = articulosCarrito.filter( a => a.id != id);
                this.imprimircarrito(articulosCarrito);
            }
        }

        imprimircarrito (articulosCarrito){
            this.limpiarHTML(contenedorCarrito);
            this.limpiarHTML(contenedorCarrito.parentElement.children[1]);

            // imprime los artículos del array articulosCarrito
            articulosCarrito.forEach( articulo => {
                const {imagen, marca, nombre, precioNew, precio, descuento, cantidad, id} = articulo;
                const li = document.createElement('li');
                li.classList.add('c-submenus__cesta-secciones','c-submenus__cesta-secciones--mod2');
                li.innerHTML = `
                    <div class="c-submenus__cesta-img">
                        <img src="${imagen}" alt="imagen producto">
                    </div>
                    <div class="c-submenus__cesta-contenido">
                        <p><span class="c-submenus__cesta-span">${marca}</span> - ${nombre}</p>
                        <div class='c-submenus__cesta-precios'>
                            <p><span class="c-submenus__cesta-span">${precioNew} €</span></p>
                            <p>(${descuento}%) - <span class="c-submenus__cesta-span--old">${precio}€</span></p>
                        </div>
                        <p>Cantidad: ${cantidad} <a href="#" data-id=${id} class="c-submenus__cesta-eliminar js-submenus__cesta-eliminar">Eliminar</a></p>
                    </div>
                `;
                contenedorCarrito.appendChild(li);
                if(descuento == 0) {
                    li.children[1].children[1].children[1].classList.add('u-display--none');
                }
            });
            if(contenedorCarrito.childElementCount != 0) {
                let sumaPrecios = articulosCarrito.reduce( (total, producto) => total += producto.cantidad*producto.precioNew, 0);
                sumaPrecios = Math.round(sumaPrecios * 100)/100;
                const total = document.createElement('div');
                total.innerHTML = `
                    <div class="c-submenus__separador">total: ${sumaPrecios} €</div>
                    <div class="c-submenus__resultado">
                        <a href="#" class="c-submenus__ver-cesta js-submenus__ver-cesta">Ver la cesta</a>
                        <button class="c-button c-button--amarillo c-submenus__resultado-button js-submenus__resultado-button">tramitar</button>
                    </div>
                `; 
                contenedorCarrito.parentElement.children[1].appendChild(total);   
            }
            this.comprobarCarrito(articulosCarrito);
        }

        comprobarCarrito (articulosCarrito) {
            if(articulosCarrito.length == 0) {
                const articulo = document.createElement ('li');
                articulo.classList.add('c-submenus__secciones');
                articulo.innerHTML = `
                    <p>En este momento no hay productos en tu cesta.</p>
                `;
                contenedorCarrito.appendChild(articulo);
                ui.numeroArticulos(0);
            } else {
                const cantidad = articulosCarrito.reduce( (total, producto) => total + producto.cantidad, 0);
                ui.numeroArticulos(cantidad);
            }
        }
    
        numeroArticulos (cantidad) {
            this.limpiarHTML(contenedorNumArticulos);

            const numeroArticulos = document.createElement('p');
            numeroArticulos.textContent = cantidad;
            contenedorNumArticulos.appendChild(numeroArticulos);
        }

        imprimirDestacados (destacados) {
            // destacados es un array en baseDatos.js
            destacados.forEach( d => {
                const {marca, nombre, imagen, precio, descuento, id} = d;
                let precioNew = precio * ((100-descuento)/100);
                precioNew = Math.round(precioNew *100)/100;
                const articulo = document.createElement('div');                    
                articulo.classList.add('c-item__articulo');
                articulo.innerHTML = `                        
                    <div class='c-item__descuento js-descuento'>
                        <p>${descuento}%</p>
                    </div>
                    <div class='c-item__img'>
                        <img src='${imagen}' alt='imagen producto'>
                    </div>                        
                    <div class='c-item__contenido'>
                        <div class='c-item__contenido--mod'>
                            <p class='c-item__contenido-titulo'><span>${marca}</span></p>
                            <p class='c-item__contenido-titulo'>${nombre}</p>
                        </div>
                        <div class ='c-item__contenido--mod'>
                            <p class='c-item__contenido-precio'>${precioNew} €</p>  
                            <p class='c-item__contenido-precio--old js-precio--old'>${precio} €</p>                        
                        </div>
                        <button class="c-button c-button--amarillo" data-id=${id}>Añadir a la cesta</button>                    
                    </div>
                    <div class="c-item__mensaje"></div>
                    `;
                contenedorDestacados.appendChild(articulo);
            });
            this.quitarDescuento(contenedorDestacados);
        }
        
        imprimirAlerta (lugar, tipo, mensaje) {
            const p = document.createElement('p');
            p.classList.add('u-mensaje');
            p.textContent = mensaje;
            if (tipo === 'exito') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            if (tipo === 'error') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            
            lugar.parentElement.parentElement.children[3].appendChild(p);
            setTimeout((e) => {
                ui.limpiarHTML(lugar.parentElement.parentElement.children[3])
            }, 3000);
        }

        verCesta (articulo) {
            if (articulo.classList.contains('js-submenus__ver-cesta')) {
                console.log('estas viendo la cesta')
            }
        }

        tramitarPedido (articulo) {
            if (articulo.classList.contains('js-submenus__resultado-button')) {
                console.log('estas tramitando el pedido')
            }
        }
    }
 
    // INSTANCIAS DE CLASE
    const ui = new UI();

    // EVENTOS
    window.addEventListener('DOMContentLoaded', () => {
        ui.comprobarCarrito(articulosCarrito);
        ui.imprimirDestacados(destacados);
        
        btnConsulta.addEventListener('click', mostrarContacto);
        btnContacto.children[0].addEventListener('click', mostrarContacto);
        formularioNewsletter.children[0].addEventListener('click', mostrarRadioButton);
    
        btnChat.addEventListener('click', () => {
            console.log('has pulsado el boton del chat');
        });

        btnBuscador.addEventListener('click', () => {
            ui.buscadorArticulos();
        });

        contenedorDestacados.addEventListener('click', (e) => {
            if (e.target.classList.contains('c-button')){
                const productoSeleccionado = e.target.parentElement.parentElement;
                ui.leerArticulo('carrito', productoSeleccionado); 
                ui.imprimirAlerta(e.target,'exito', 'has añadido el producto al carrito');          
            }
            if (e.target.parentElement.classList.contains('c-item__img')) {
                const productoSeleccionado = e.target.parentElement.parentElement;
                ui.leerArticulo('modal', productoSeleccionado);
            }
        });

        contenedorCarrito.addEventListener('click', (e) => {
            ui.eliminarArticulo(e.target);
        });

        contenedorCarrito.parentElement.children[1].addEventListener('click', (e) => {
            ui.verCesta(e.target);
            ui.tramitarPedido(e.target);
        });

        contenedorModal.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-solid')) {
                contenedorModal.classList.remove('c-modal--mod');
                setTimeout(() => {
                    ui.limpiarHTML(contenedorModal);
                }, 1000);
            }
        });

        contenedorBuscador.addEventListener('click', (e) => {
            if(e.target.classList.contains('c-buscador__close') || e.target.classList.contains('fa-solid')) {
                contenedorBuscador.classList.remove('c-buscador--mod');
                setTimeout(() => {
                    ui.limpiarHTML(contenedorBuscador);
                }, 1000);
            }
        });
    })


    // FUNCIONES
    function mostrarContacto () {
        btnContacto.children[1].classList.toggle('c-contacto__screen--mod');
        btnContacto.children[0].children[0].classList.toggle('c-contacto__img--mod');
        btnContacto.children[0].children[0].classList.toggle('fa-envelope');
        btnContacto.children[0].children[0].classList.toggle('fa-xmark');
        btnContacto.children[0].children[0].classList.toggle('fa-solid');
        btnContacto.children[0].children[0].classList.toggle('fa-regular'); 
    };

    function mostrarRadioButton() {
        formularioNewsletter.children[2].classList.add('c-newsletter__form-radio--mod');
        formularioNewsletter.children[0].addEventListener('input', () => {
            if(formularioNewsletter.children[0].value != '') {
                formularioNewsletter.children[1].classList.add('c-newsletter__label--mod');
    
            } else {
                formularioNewsletter.children[1].classList.remove('c-newsletter__label--mod');
            }
        });
    };

})();