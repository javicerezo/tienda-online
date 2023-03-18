(function (){ 
    // VARIABLES 
    // variables para eventos
    const btnBuscador = document.querySelector('.js-header__centro')
    const btnConsulta = document.querySelector('.js-submenu__boton-consulta');
    const btnChat = document.querySelector('.js-submenu__boton-chat');
    const btnContacto = document.querySelector('.js-contacto');
    const formularioNewsletter = document.querySelector('.js-newsletter__form');

    // Variables contenedor para inyeccion dinámica de resultados
    const contenedorDestacados = document.querySelector('.js-item__grid');
    const contenedorNumArticulos = document.querySelector('.js-menus__cesta-numero');
    const contenedorCarrito = document.querySelector('.js-menus__cesta');

    let articulosCarrito = [];
    
    // CLASES
    class UI {
        limpiarHTML (contenedor) {
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
        }

        leerArticulo (producto) {
            // creo obj con el contenido del producto 
            const infoProducto = {
                imagen: producto.querySelector('img').src,
                marca: producto.querySelector('.c-item__contenido-titulo:first-Child').textContent,
                nombre: producto.querySelector('.c-item__contenido-titulo:last-Child').textContent,
                precioNew: parseInt(producto.querySelector('.c-item__contenido-precio').textContent),
                precio: parseInt(producto.querySelector('.c-item__contenido-precio--old').textContent),
                descuento: parseInt(producto.querySelector('.c-item__descuento p').textContent),
                id: producto.querySelector('.c-button').getAttribute('data-id'),
                cantidad: 1
            };     
            this.agregarCarrito(infoProducto);
        }

        agregarCarrito (producto) {
            // comprueba si existe en el producto y añade producto entero, o modifica su cantidad
            const existe = articulosCarrito.some( art => art.id === producto.id );
            if (existe) { 
                const articulosModificadosCarrito = articulosCarrito.map( art => {
                    if (art.id === producto.id) {
                        art.cantidad++;
                        return art; //retorna obj modificado en cantidad
                    } else {
                        return art; //retorna los demás obj no duplicados
                    }
                });
                articulosCarrito = [... articulosModificadosCarrito];
                this.imprimircarrito(articulosCarrito);
            } else {
                articulosCarrito = [...articulosCarrito, producto];
                this.imprimircarrito(articulosCarrito);
            }
        }

        imprimircarrito (articulosCarrito){
            console.log(articulosCarrito)
            this.limpiarHTML(contenedorCarrito);
            this.limpiarHTML(contenedorCarrito.parentElement.children[1]);

            // imprime los artículos del array articulosCarrito
            articulosCarrito.forEach( articulo => {
                const {imagen, marca, nombre, precioNew, precio, descuento, cantidad} = articulo;
                const li = document.createElement('li');
                li.classList.add('c-submenus__secciones','c-submenus__secciones--mod3');
                li.innerHTML = `
                    <div class="c-submenus__img">
                        <img src="${imagen}" alt="imagen producto">
                    </div>
                    <div class="c-submenus__contenido">
                        <p class="c-submenus__nombre"><span>${marca}</span> - ${nombre}</p>
                        <div class='c-submenus__precios'>
                        <p><span>${precioNew} €</span></p>
                        <p>(${descuento}%) - <span class="c-submenus__precios-old">${precio}€</span></p>
                        </div>
                        <p class="c-submenus__contenido-cantidad">Cantidad: ${cantidad} €<a href="#" class="c-submenus__eliminar">Eliminar</a></p>
                    </div>
                `;
                contenedorCarrito.appendChild(li);
                if(descuento == 0) {
                    console.log(' no tiene descuento')
                }
            });

            // imprime el precio total de los articulos de articulosCarrito
            if(contenedorCarrito.childElementCount != 0) {
                let sumaPrecios = articulosCarrito.reduce( (total, producto) => total += producto.cantidad*producto.precio, 0);
                const total = document.createElement('div');
                total.innerHTML = `
                    <div class="c-submenus__separador">total: ${sumaPrecios}</div>
                    <div class="c-submenus__resultado">
                        <a href="#" class="c-submenus__ver-cesta">Ver la cesta</a>
                        <button class="c-button c-button--amarillo">tramitar</button>
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
                const precioNew = precio * ((100-descuento)/100);
                const articulo = document.createElement('div');                    
                articulo.classList.add('c-item__articulo');
                articulo.innerHTML = `                        
                    <div class='c-item__descuento'>
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
                            <p class='c-item__contenido-precio--old'>${precio} €</p>                        
                    </div>
                    <button class="c-button c-button--amarillo" data-id=${id}>Añadir a la cesta</button>
                    </div>
                `;
                contenedorDestacados.appendChild(articulo);
            });
            // hago un repaso de los articulos sin descuento
            for(let i=0; i<contenedorDestacados.childElementCount; i++) {
                let descuento = parseInt(contenedorDestacados.children[i].children[0].children[0].textContent);
                if (descuento === 0) {
                    contenedorDestacados.children[i].children[0].classList.add('u-display--none');
                    contenedorDestacados.children[i].children[2].children[1].children[1].classList.add('u-display--none');
                }

            }
        }
        
        imprimirAlerta () {
            console.log('soy una alerta');
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
        })
        btnBuscador.addEventListener('click', () => {
            console.log('has pulsado el buscador');
        })
        contenedorDestacados.addEventListener('click', (e) => {
            if (e.target.classList.contains('c-button')){
                const productoSeleccionado = e.target.parentElement.parentElement;
                ui.leerArticulo(productoSeleccionado);            
            }
        })
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