
    // VARIABLES 
const desktop = 1024;
let contadorvisitados = 0;
// variables para eventos
const btnBuscador = document.querySelector('.js-header__centro');
const btnBurger = document.querySelector('.js-header__burger');
const btnConsulta = document.querySelector('.js-submenus__boton-consulta');
const btnChat = document.querySelector('.js-submenus__boton-chat');
const btnContacto = document.querySelector('.js-contacto');
const btnEnviarContacto = document.querySelector('.js-contacto__enviar');
const btnEnviarNewsletter = document.querySelector('.js-newsletter__enviar');
const formularioNewsletter = document.querySelector('.js-newsletter__form');
const spinnerNewsletter = document.querySelector('.js-newsletter__spinner');
const formularioContacto = document.querySelector('.js-contacto__form');
const spinnerContacto = document.querySelector('.js-contacto__spinner');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

// Variables contenedor para inyeccion dinámica de resultados
const contenedorHeader = document.querySelector('.js-header');
const contenedorNav = document.querySelector('.js-nav');
const contenedorDestacados = document.querySelector('.js-item__grid');
const contenedorNumArticulos = document.querySelector('.js-menus__cesta-numero');
const contenedorCarrito = document.querySelector('.js-submenus__cesta');
const contenedorModal = document.querySelector('.js-modal');
const contenedorBuscador = document.querySelector('.js-buscador');
const contenedorProductosVisitados = document.querySelector('.js-visitados');
const contenedorCesta = document.querySelector('.js-cesta');
const contenedorNewsletter = document.querySelector('.js-newsletter__contenedor');
const contenedorContacto = document.querySelector('.js-contacto__contenedor');

let articulosCarrito = [];
let articulosVisitados = [];

// CLASES
class UI {
    limpiarHTML (contenedor) {
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    compararBD (arrayBD, arrayAleatorio) {
        // método recibe 1 array BaseDatos completa, y 1 array con ids, y devuelve otro array con los objetos correspodientes a esos ids
        const arrayReturn = [];
        arrayAleatorio.forEach( id => {
            const obj = arrayBD.filter( elemento => elemento.id === id);
            arrayReturn.push(obj[0]);
        })
        return arrayReturn;
    }

    recorrerBD (array, contenedor, componente) {
        // método que recorre una BD y la imprime en un contenedor (ambos como parámetros)
        array.forEach( articulo => {
            const {marca, nombre, imagen, precio, descuento, id} = articulo;
            let precioNew = redondearResultado(precio * ((100-descuento)/100));                
            const li = document.createElement('li');                    
            li.classList.add(`${componente}`+'__li');
            li.innerHTML = `                        
                <div class='${componente}__li-descuento js-descuento'>
                    <p>${descuento}%</p>
                </div>
                <div class='${componente}__li-img'>
                    <picture>
                        <source loading="lazy" srcset="${imagen}.webp" type="image/webp">
                        <img width='200' height='300' class='js-picture' loading="lazy" src='${imagen}.jpg' alt='imagen producto ${id}'>
                    </picture>
                </div>                        
                <div class='${componente}__li-contenido'>
                    <div class='${componente}__li-contenido--mod'>
                        <p class='${componente}__li-titulo'><span>${marca}</span></p>
                        <p class='${componente}__li-titulo'>${nombre}</p>
                    </div>
                    <div class ='${componente}__li-contenido--mod'>
                        <p class='${componente}__li-precio'>${precioNew} €</p>  
                        <p class='${componente}__li-precio--old js-precio--old'>${precio} €</p>                        
                    </div>
                    <button class="${componente}__li-button c-button c-button--amarillo" data-id=${id}>Añadir a la cesta</button>                    
                </div>
                <div class="${componente}__mensaje"></div>
                `;
                contenedor.appendChild(li);
        });
        this.quitarDescuento(contenedor);
    }
    
    quitarDescuento (contenedor) {
        //repasa si los articulos de un contenedor tienen descuento y lo quita
        for(let i=0; i<contenedor.childElementCount; i++) {
            let descuento = contenedor.children[i].children[0];
            let precio = contenedor.children[i].children[2].children[1].children[1];
            if (parseInt(descuento.children[0].textContent) === 0) {
                descuento.classList.add('u-display--none');
                precio.classList.add('u-display--none');
            }
        }
    }

    buscadorArticulos (palabra='Buscar...') {
        const buscadorScreen = document.createElement('div');
        buscadorScreen.classList.add('c-buscador__screen');
        buscadorScreen.innerHTML = `
            <div class='c-buscador__contenedor'>
                <div class='c-buscador__cabecera'>
                    <div class='c-buscador__logo'>
                        <a href="https://javicerezo.github.io/tienda-online/"><img src='build/img/logo.svg' alt='logo empresa'></a>
                    </div>
                    <div class='c-buscador__form'>
                        <input type='text' class='c-buscador__input' placeholder='Buscar...' value='${palabra}'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
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
                            <li class='c-buscador__li-populares'>Cuerdas</li>
                            <li class='c-buscador__li-populares'>Patagonia</li>
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

        const contenedorUl = document.querySelector('.js-buscador__ul-buscar');

        const arrayAleatorio = numerosAleatorios(3, materialDeportivo.length);
        const ejemploBusqueda = ui.compararBD(materialDeportivo, arrayAleatorio);        
        this.recorrerBD(ejemploBusqueda, contenedorUl, 'c-buscador');           
    }

    filtarArticulos (string, contenedor) {
        let nuevoArray = [];
        string = string.toLowerCase();

        materialDeportivo.forEach( articulo => {
            let marcador = (`${articulo.marca} ${articulo.nombre} ${articulo.tipo}`).toLowerCase();
            const productoRepetido = nuevoArray.some( art => art.id === articulo.id);
            if (marcador.includes(string)) {
                if (productoRepetido == false) {
                    // producto no repetido, lo agrego
                    nuevoArray = [...nuevoArray, articulo];
                }
            }
        });
        if (nuevoArray.length == 0) {
            this.imprimirAlerta(contenedor, 'alerta', 'Ups... Prueba con otra búsqueda');    
        } else {
            this.recorrerBD(nuevoArray, contenedor, 'c-buscador');
        } 
    }
    
    leerArticulo (accion, producto, componente) {
        // creo obj con el contenido del producto 
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            marca: producto.querySelector('.' + componente + '__li-titulo:first-Child').textContent,
            nombre: producto.querySelector('.' + componente + '__li-titulo:last-Child').textContent,
            precioNew: parseFloat(producto.querySelector('.' + componente + '__li-precio').textContent),
            precio: parseFloat(producto.querySelector('.' + componente + '__li-precio--old').textContent),
            descuento: parseFloat(producto.querySelector('.' + componente + '__li-descuento p').textContent),
            id: producto.querySelector('.c-button').getAttribute('data-id'),
            cantidad: 1
        }; 
        // le quito la extension a src de la imagen para evistar problemas con el método consultarBD()
        let imagenSinExtension = infoProducto.imagen.substring(0, infoProducto.imagen.indexOf(".jpg"));
        infoProducto.imagen = imagenSinExtension;
        if(accion === 'carrito') {
            this.agregarCarrito(infoProducto);
        }
        if(accion === 'modal') {
            this.modalArticulos(infoProducto);
            this.agregarVisitados(infoProducto);
        }
    }

    modalArticulos (producto) {
        const {imagen, marca, nombre, precioNew, precio, descuento, id} = producto;
        const modalScreen = document.createElement('div');
        modalScreen.classList.add('c-modal__screen');
        modalScreen.innerHTML = `
            <div class='c-modal__li'>
                <div class='c-modal__li-descuento'>
                    <p>${descuento}%</p>
                </div>
                <div class='c-modal__li-img'>
                    <picture>
                        <source loading="lazy" srcset="${imagen}.webp" type="image/webp">
                        <img width='200' height='300' class='js-picture' loading="lazy" src='${imagen}.jpg' alt='imagen producto ${id}'>
                    </picture>
                </div>
                <div class='c-modal__li-contenido'>
                    <div class='c-modal__li-caracteristicas'>
                        <p class='c-modal__li-caracteristicas-p'><span>Color:</span> blanco</p>
                        <p class='c-modal__li-caracteristicas-p'><span>Talla:</span> M</p>
                    </div>
                    <div class='c-modal__li-contenido--mod'>
                        <p class='c-modal__li-titulo'><span>${marca}</span></p>
                        <p class='c-modal__li-titulo'>${nombre}</p>
                    </div>
                    <p class='c-modal__li-precio'>${precioNew} €</p>  
                    <div class='c-modal__li-contenido--mod'>
                        <p class='c-modal__li-precio--old'>${precio} €</p>
                        <p class='c-modal__li-precio--descuento'>(${descuento}%)</p>                        
                    </div>
                    <div class='c-modal__li-caracteristicas'>
                        <p class='c-modal__li-caracteristicas-p'>¡ENVÍOS Y DEVOLUCIONES GRATIS!</p>
                        <p class='c-modal__li-caracteristicas-p c-modal__li-caracteristicas-p--mod'>Ver condiciones</p>
                    </div>
                    <div class='c-modal__li-contenido--mod c-modal__li-button'>
                        <button class='c-button c-button--amarillo' data-id=${id}>Añadir a la cesta</button>
                    </div>                   
                </div>
                <div class='c-modal__li-close'>
                    <i class='fa-solid fa-xmark'></i>
                </div>
                <div class='c-modal__li-mensaje'>
                </div> 
            </div>
            `;
        contenedorModal.appendChild(modalScreen);
        contenedorModal.classList.add('c-modal--mod');
        this.quitarDescuento(modalScreen);
    }

    agregarVisitados(producto) {
        const repetido = articulosVisitados.some( articulo => articulo.id === producto.id);
        if (repetido == false) {
            if(articulosVisitados.length < 6) {
                articulosVisitados = [...articulosVisitados, producto];
            }
            else {
                articulosVisitados.shift();
                articulosVisitados = [...articulosVisitados, producto];
            }
        }       
        guardarStorage('articulosVisitados', articulosVisitados);
        this.imprimirVisitados(articulosVisitados);
    }

    imprimirVisitados(array) {
        if (array.length != 0) {
            contenedorProductosVisitados.classList.add('c-visitados');
            if(contenedorProductosVisitados.childElementCount == 0) {
                const div = document.createElement('div');
                div.classList.add('c-visitados__contenedor');
                div.innerHTML = `
                    <h2 class='c-visitados__h2'>Últimos productos que has visitado</h2>
                    <ul class='c-visitados__grid js-visitados__grid'>
                    
                    </ul>
                `;
                contenedorProductosVisitados.appendChild(div);
                const boton1 = document.createElement('BUTTON');
                boton1.classList.add('c-visitados__botones', 'c-visitados__boton1','js-visitados__botones');
                boton1.innerHTML = `
                    <i class="fa-solid fa-angle-left"></i>
                `;
                const boton2 = document.createElement('BUTTON');
                boton2.classList.add('c-visitados__botones', 'c-visitados__boton2', 'js-visitados__botones');
                boton2.innerHTML = `
                    <i class="fa-solid fa-angle-right"></i>
                `;
                contenedorProductosVisitados.appendChild(boton1);
                contenedorProductosVisitados.appendChild(boton2);
            }
            const contenedorGrid = contenedorProductosVisitados.children[0].children[1];
            this.limpiarHTML(contenedorGrid);
            this.recorrerBD(array, contenedorGrid, 'c-visitados');
        }
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
            this.imprimirCarrito(articulosCarrito);
        } else {
            articulosCarrito = [...articulosCarrito, producto];
            this.imprimirCarrito(articulosCarrito);
        }
        guardarStorage('articulosCarrito', articulosCarrito);
    }

    imprimirCarrito (array){
        if (array.length != 0) {
            this.limpiarHTML(contenedorCarrito);
            this.limpiarHTML(contenedorCarrito.parentElement.children[1]);
    
            // imprime los artículos del array articulosCarrito
            array.forEach( articulo => {
                const {imagen, marca, nombre, precioNew, precio, descuento, cantidad, id} = articulo;
                const li = document.createElement('li');
                li.classList.add('c-submenus__cesta-secciones','c-submenus__cesta-secciones--mod2');
                li.innerHTML = `
                    <div class="c-submenus__cesta-img">
                        <picture>
                            <source loading="lazy" srcset="${imagen}.webp" type="image/webp">
                            <img width='200' height='300' class='js-picture' loading="lazy" src='${imagen}.jpg' alt='imagen producto ${id}'>
                        </picture>
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
                let sumaPrecios = redondearResultado(array.reduce( (total, producto) => total += producto.cantidad*producto.precioNew, 0));
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
            this.comprobarCarrito(array);
        }
    }

    eliminarArticulo (articulo, string=null) {
        const id = articulo.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( a => a.id != id);
        this.imprimirCarrito(articulosCarrito);
        if(string === 'cesta' || contenedorCesta.childElementCount != 0) {
            this.limpiarHTML(contenedorCesta);
            this.verCesta(articulosCarrito);
        }
        guardarStorage('articulosCarrito', articulosCarrito);
    }

    comprobarCarrito (array) {
        if(array.length == 0) {
            const articulo = document.createElement ('li');
            articulo.classList.add('c-submenus__secciones');
            articulo.innerHTML = `
                <p>En este momento no hay productos en tu cesta.</p>
            `;
            contenedorCarrito.appendChild(articulo);
            ui.numeroArticulos(0);
        } else {
            const cantidad = array.reduce( (total, producto) => total + producto.cantidad, 0);
            ui.numeroArticulos(cantidad);
        }
    }

    numeroArticulos (cantidad) {
        this.limpiarHTML(contenedorNumArticulos);

        const numeroArticulos = document.createElement('p');
        numeroArticulos.textContent = cantidad;
        contenedorNumArticulos.appendChild(numeroArticulos);
    }
    
    // NOTA, el contenedor que recibe imprimirAlerta debe ser el contenedor que queramos mostrar el mensaje
    //y que ademas, ESTE VACÍO
    imprimirAlerta (contenedorMensaje, tipo, mensaje) {
        if(contenedorMensaje.childElementCount === 0) {
            const p = document.createElement('p');
            p.classList.add('u-mensaje');
            p.textContent = mensaje;
            if (tipo === 'exito') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            if (tipo === 'error') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            if (tipo === 'alerta') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            contenedorMensaje.appendChild(p);
            if (contenedorMensaje.classList.contains('c-buscador__ul-buscar') == false ) {
                setTimeout((e) => {
                    ui.limpiarHTML(contenedorMensaje);
                }, 3000);
            }
        }
    }

    verCesta () {
        // antes de imprimir calculo los totales para meterlos en el innerHTML directamente
        const subTotal = redondearResultado(articulosCarrito.reduce( (total, producto) => total += producto.precio - producto.cantidad, 0));
        let gastosEnvio;
        if(subTotal == 0) {
            gastosEnvio = 0;
        } else {
            gastosEnvio = 5;
        }
        const subtotalPedido = subTotal + gastosEnvio;
        const ahorroTotal = redondearResultado(articulosCarrito.reduce( (total, producto) => total += producto.precio - producto.precioNew, 0));

        const cestaScreen = document.createElement('div');
        cestaScreen.classList.add('c-cesta__screen');
        cestaScreen.innerHTML= `
            <div class='c-cesta__contenedor'>
                <div class='c-cesta__cabecera'>
                    <h2 class='c-cesta__h2'>Cesta de la compra</h2>
                    <div class='c-cesta__close'>
                        <i class='fa-solid fa-xmark'></i>
                    </div>
                </div>
                <p class='c-cesta__p'>En la cesta de la compra puedes dejar temporalmente los productos que quieras,
                pero debes tener en cuenta que el precio y la disponibilidad de los productos,
                mientras no se tramite el pedido, están sujetos a cambio.</p>
                <div class='c-cesta__contenedor-table'>
                    <table class='c-cesta__table'>
                        <thead class='c-cesta__thead'>
                            <tr class='c-cesta__tr'>
                            <th class='c-cesta__th'>Descripción del producto</th>
                            <th class='c-cesta__th'>Precio por unidad</th>
                            <th class='c-cesta__th'>IVA</th>
                            <th class='c-cesta__th'>Cantidad</th>
                            <th class='c-cesta__th'>Precio total</th>
                            </tr>
                        </thead>
                        <tbody class='c-cesta__tbody js-cesta__tbody'>                            
                        
                        </tbody>
                    </table>
                </div>
                <div class='c-cesta__resultado'>
                    <div class='c-cesta__caja-botones'>
                        <button class='c-cesta__boton c-button c-button--amarillo'>Continuar comprando</button>
                        <div class='c-cesta__tramitar c-button c-button--amarillo js-cesta__boton'>
                            <button class='c-cesta__boton'>Tramitar</button>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                    <div class='c-cesta__detalle js-cesta__detalle'>
                        <p class='c-cesta__detalle-p'>Subtotal <span>(IVA incluido):</span> ${subTotal} €</p>
                        <p class='c-cesta__detalle-p'>Gastos de envío <span>(IVA incluido):</span> ${gastosEnvio} €</p>                    
                        <p class='c-cesta__detalle-p'>Subtotal del pedido: ${subtotalPedido} €</p>
                        <p class='c-cesta__detalle-p'>Te has ahorrado <span>(IVA incluido):</span> ${ahorroTotal} €</p>
                    </div>
                </div>
            </div>

        `;
        contenedorCesta.classList.add('c-cesta--mod');
        contenedorCesta.appendChild(cestaScreen);

        const contenedorTbody = document.querySelector('.js-cesta__tbody');
        if (articulosCarrito.length == 0){
            const botonTramitar = document.querySelector('.js-cesta__boton');
            botonTramitar.disabled = true;
            botonTramitar.classList.add('u-opacity--50','u-cursor--not-allowed');
        } else {
            articulosCarrito.forEach( articulo => {
                const {marca, nombre, imagen, precio, precioNew, descuento, cantidad, id} = articulo;
                let precioMismoTipo = redondearResultado(cantidad*precioNew);
                let ahorro = redondearResultado(precio - precioNew);
                const row = document.createElement('tr');
                row.classList.add('c-cesta__tr');
                row.innerHTML = `
                    <td class='c-cesta__td'>
                        <picture class='c-cesta__tbody-picture'>
                            <source loading="lazy" srcset="${imagen}.webp" type="image/webp">
                            <img width='200' height='300' class='c-cesta__tbody-img js-picture' loading="lazy" src='${imagen}.jpg' alt='imagen producto ${id}'>
                        </picture>
                        <div class='c-cesta__tbody-descripcion'>
                            <p class='c-cesta__tbody-p'><span>${marca}</span> ${nombre}</p>
                            <p class='c-cesta__tbody-p'>Color: white/black  |  Talla: M-L</p>
                            <p class='c-cesta__tbody-p'>Entrega estimada el 5 de marzo con envío urgente</p>
                            <div class='c-cesta__tbody-iconos'>
                                <i class="fa-solid fa-dumpster-fire"></i>
                                <a href='#' class='c-cesta__tbody-a' data-id=${id}>Eliminar</a>
                            </div>
                        </div>
                    </td>
                    <td class='c-cesta__td'>
                        <div class='c-cesta__tbody-precios js-cesta__tbody-precios'>
                            <p class='c-cesta__tbody-precio'>${precioNew} €</p>                            
                            <p class='c-cesta__tbody-precio'>Descuento: ${descuento}%</p>
                            <p class='c-cesta__tbody-precio'>Ahorras: ${ahorro} €</p>
                        </div>
                    </td>
                    <td class='c-cesta__td'>21%</td>
                    <td class='c-cesta__td'>${cantidad}</td>
                    <td class='c-cesta__td'>${precioMismoTipo} €</td>
                `;
                contenedorTbody.appendChild(row);

                // quitamos descuento si no tiene
                if(descuento == 0) {
                    const precios = document.querySelector('.js-cesta__tbody-precios');
                    precios.children[1].classList.add('c-cesta__tbody-precio--mod');
                    precios.children[2].classList.add('c-cesta__tbody-precio--mod');
                }
            });
            const totalCesta = redondearResultado(articulosCarrito.reduce( (total, producto) => total += producto.cantidad*producto.precioNew, 0));
            let totalAhorro = redondearResultado(articulosCarrito.reduce( (total, producto) => total += producto.precio - producto.precioNew, 0));
        }
        
    }
    
    tramitarPedido () {
        console.log('estas tramitando el pedido');
    }
}

// INSTANCIAS DE CLASE
const ui = new UI();

// EVENTOS
// evento para iniciar app
window.addEventListener('DOMContentLoaded', async () => {
    // Cargamos posibles busquedas del cliente en el storage
    articulosCarrito = cargarStorage('articulosCarrito');
    articulosVisitados = cargarStorage('articulosVisitados');

    // desactivamos los botones de newsletter y mail
    deshabilitarBoton(btnEnviarNewsletter);
    deshabilitarBoton(btnEnviarContacto);
    
    // En funcion del storage, se imprimen ciertas secciones de la página de una manera o de otra
    ui.imprimirCarrito(articulosCarrito);
    ui.imprimirVisitados(articulosVisitados);
    ui.comprobarCarrito(articulosCarrito);

    // intentamos conectar con la base de datos
    let materialDeportivo = await consultarBD('materialDeportivo');

    // Creamos un array de material destacado con 8 elementos aleatorios que están dentro de material deportivo para mostrarlo por pantalla
    const arrayAleatorio = numerosAleatorios(8, materialDeportivo.length);
    const destacados = ui.compararBD(materialDeportivo, arrayAleatorio);
    // imprimimos el array destacados en la seccion destacados
    ui.recorrerBD(destacados, contenedorDestacados, 'c-item');
});
// EVENTOS PARA BOTONES
btnBurger.addEventListener('click', mostrarNav);

btnConsulta.addEventListener('click', mostrarContacto);
btnContacto.children[0].addEventListener('click', mostrarContacto);

formularioNewsletter.children[0].addEventListener('click', mostrarRadioButton);
formularioNewsletter.children[0].addEventListener('blur', (e) => {
    if(e.target.type === 'email'){
        const emailCorrecto = comprobarEmail(e.target.value);
        if(emailCorrecto) {
            habilitarBoton(btnEnviarNewsletter);
        } else {
            deshabilitarBoton(btnEnviarNewsletter);
            ui.imprimirAlerta(contenedorNewsletter, 'error', 'el email no es valido');
        }
    } 
});
formularioNewsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarEmail();
    mostrarSpiner(spinnerNewsletter);
    ui.imprimirAlerta(contenedorNewsletter, 'exito', 'mensaje enviado correctamente');
    resetFormulario(formularioNewsletter, btnEnviarNewsletter);
});


formularioContacto.children[0].children[1].addEventListener('blur', (e) => {
    if(e.target.type === 'email'){
        const emailCorrecto = comprobarEmail(e.target.value);
        if(emailCorrecto) {
            habilitarBoton(btnEnviarContacto);
        } else {
            deshabilitarBoton(btnEnviarContacto);
            ui.imprimirAlerta(contenedorContacto, 'error', 'el email no es valido');
        }
    }
});
formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarEmail();
    mostrarSpiner(spinnerContacto);
    ui.imprimirAlerta(contenedorContacto, 'exito', 'mensaje enviado correctamente');
    resetFormulario(formularioContacto, btnEnviarContacto);
});

btnChat.addEventListener('click', () => {
    console.log('has pulsado el boton del chat');
});

btnBuscador.addEventListener('click', () => {
    ui.buscadorArticulos();
});

window.addEventListener("resize",() => {
    if (contenedorHeader.clientWidth >= desktop) {
        if (contenedorNav.classList.contains('c-nav--mod')) {
            contenedorNav.classList.remove('c-nav--mod');
            contenedorHeader.classList.remove('c-header--fixed');
            btnBurger.children[0].children[0].classList.toggle('fa-bars');
            btnBurger.children[0].children[0].classList.toggle('fa-xmark');
        }
    }
});


//EVENTOS PARA CONTENEDORES
contenedorNav.addEventListener('click', e => {
    console.log(e.target)
    if (e.target.classList.contains('c-subnav__li')) {
        const li = e.target.textContent;
        ui.buscadorArticulos(li);
        
        const contenedorUl = document.querySelector('.js-buscador__ul-buscar');
        // const input = document.querySelector('.c-buscador__input');
        // input.textContent = li;

        ui.limpiarHTML(contenedorUl);
        ui.filtarArticulos(li, contenedorUl);
    }
});

contenedorDestacados.addEventListener('click', e => {
    if (e.target.classList.contains('c-button')){
        //agregar carrito
        const productoSeleccionado = e.target.parentElement.parentElement;
        const contenedorMensaje = e.target.parentElement.parentElement.children[3];
        ui.leerArticulo('carrito', productoSeleccionado, 'c-item'); 
        ui.imprimirAlerta(contenedorMensaje,'exito', 'producto añadido al carrito');       
    }
        //desplegar el modal
    if (e.target.classList.contains('js-picture')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        ui.leerArticulo('modal', productoSeleccionado, 'c-item');
    }
});

contenedorCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('js-submenus__cesta-eliminar')) {
        ui.eliminarArticulo(e.target);
    }
});
contenedorCarrito.parentElement.children[1].addEventListener('click', e => {
    if (e.target.classList.contains('js-submenus__ver-cesta')) {
        ui.verCesta();
        setTimeout(() => {
            contenedorHeader.classList.add('c-header--fixed');
        }, 2000);
    }
    if (e.target.classList.contains('js-submenus__resultado-button')) {
        ui.tramitarPedido();
    }
});

contenedorModal.addEventListener('click', e => {
    if(e.target.classList.contains('fa-solid') || e.target.classList.contains('c-modal__screen')) {
        contenedorModal.classList.remove('c-modal--mod');
        setTimeout(() => {
            ui.limpiarHTML(contenedorModal);
        }, 100);
    }
    if(e.target.classList.contains('c-button')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        const contenedorMensaje = productoSeleccionado.children[4];
        ui.leerArticulo('carrito', productoSeleccionado, 'c-modal'); 
        ui.imprimirAlerta(contenedorMensaje, 'exito', 'producto añadido al carrito');
    }
});

contenedorBuscador.addEventListener('click', e => {            
    const contenedorUl = document.querySelector('.js-buscador__ul-buscar');
    if(e.target.classList.contains('c-buscador__close') || e.target.classList.contains('fa-solid')) {
        contenedorBuscador.classList.remove('c-buscador--mod');
        setTimeout(() => {
            ui.limpiarHTML(contenedorBuscador);
        }, 100);
    }
    if (e.target.classList.contains('c-button')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        const contenedorMensaje = e.target.parentElement.parentElement.children[3];
        ui.leerArticulo('carrito', productoSeleccionado, 'c-buscador'); 
        ui.imprimirAlerta(contenedorMensaje,'exito', 'producto añadido al carrito');          
    }
    if (e.target.parentElement.classList.contains('c-buscador__li-img')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        ui.leerArticulo('modal', productoSeleccionado, 'c-buscador');
    }
    if(e.target.classList.contains('c-buscador__li-populares')) {
        ui.limpiarHTML(contenedorUl);
        ui.filtarArticulos(e.target.textContent, contenedorUl);
    }
});
contenedorBuscador.addEventListener('input', e => {
    const contenedorUl = document.querySelector('.js-buscador__ul-buscar');
    if(e.target.classList.contains('c-buscador__input')) {
        ui.limpiarHTML(contenedorUl);
        ui.filtarArticulos(e.target.value, contenedorUl);
    }
});

contenedorProductosVisitados.addEventListener('click', e => {
    //agregar carrito
    if (e.target.classList.contains('c-button')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        const contenedorMensaje = e.target.parentElement.parentElement.children[3];
        ui.leerArticulo('carrito', productoSeleccionado, 'c-visitados'); 
        ui.imprimirAlerta(contenedorMensaje,'exito', 'producto añadido al carrito');          
    }
    //desplegar el modal
    if (e.target.classList.contains('js-picture')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        ui.leerArticulo('modal', productoSeleccionado, 'c-visitados');
    }
    
    // slider de visitados
    const rootstyle = document.documentElement.style;
    const elementosVisitados = document.querySelectorAll('.c-visitados__li');
    let anchoElemento = elementosVisitados[0].scrollWidth;
    if(e.target.classList.contains('fa-angle-left')){
        if(contadorvisitados > 0) {
            moverVisitados('izquierda', anchoElemento, rootstyle);
            contadorvisitados--;
        }
    }
    if(e.target.classList.contains('fa-angle-right')){
        if(contadorvisitados < elementosVisitados.length - 1) {
            moverVisitados('derecha', anchoElemento, rootstyle);
            contadorvisitados++;
        }
    }
});

contenedorCesta.addEventListener('click', e => {
    if(e.target.classList.contains('fa-solid') || e.target.textContent == 'Continuar comprando') {
        contenedorCesta.classList.remove('c-cesta--mod');
        contenedorHeader.classList.remove('c-header--fixed');
        setTimeout(() => {
            ui.limpiarHTML(contenedorCesta);
        }, 100);
    }
    if (e.target.classList.contains('c-cesta__tbody-a')) {
        ui.eliminarArticulo(e.target, 'cesta');
    }
});


// FUNCIONES
function mostrarNav () {
    contenedorNav.classList.toggle('c-nav--mod');
    contenedorHeader.classList.toggle('c-header--fixed');
    btnBurger.children[0].children[0].classList.toggle('fa-bars');
    btnBurger.children[0].children[0].classList.toggle('fa-xmark');
}
function mostrarContacto () {
    btnContacto.children[1].classList.toggle('c-contacto__screen--mod');
    btnContacto.children[0].children[0].classList.toggle('c-contacto__img--mod');
    btnContacto.children[0].children[0].classList.toggle('fa-envelope');
    btnContacto.children[0].children[0].classList.toggle('fa-xmark');
    btnContacto.children[0].children[0].classList.toggle('fa-solid');
    btnContacto.children[0].children[0].classList.toggle('fa-regular'); 
};

function moverVisitados (direccion, anchoElemento, rootstyle) {
    const transformValue = Number(rootstyle.getPropertyValue('--slide-transform').replace('px', ''));
    if(direccion === 'izquierda') {
        rootstyle.setProperty('--slide-transform', `${transformValue + anchoElemento}px`);
    }
    else if(direccion === 'derecha') {
        rootstyle.setProperty('--slide-transform', `${transformValue - anchoElemento}px`);
    }
}

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

function comprobarEmail (email) {
    // validamos email con Email Regex
    let correcto = false;
    if (!er.test(email)){
        return correcto;
    } else {
        correcto = true;
        return correcto;
    }
}
function habilitarBoton (boton) {
    //habilitamos el botón de enviar la newsletter
    boton.classList.remove('u-cursor--not-allowed','u-opacity--50');
    boton.disabled = false;
};
function deshabilitarBoton (boton) {
    //deshabilitamos el botón de enviar la newsletter
    boton.classList.add('u-cursor--not-allowed','u-opacity--50');
    boton.disabled = true;
};
function mostrarSpiner (spinner){
    spinner.classList.remove('u-display--none');
    setTimeout(() => {
        spinner.classList.add('u-display--none');
    }, 3000);
}
function resetFormulario (formulario, botonEnviar){
    setTimeout(() => {
        formulario.reset();
        botonEnviar.classList.add('u-cursor--not-allowed','u-opacity--50');
        botonEnviar.disabled = true;
    }, 3000);
}
function enviarEmail () {
    console.log('ENVIANDO EMAIL...');
};

function redondearResultado (valor) {
    const resultado = Math.round(valor*100)/100;
    return resultado;
};

function guardarStorage(nombreArray, array){
    localStorage.setItem(nombreArray, JSON.stringify(array));
};
function cargarStorage (nombreArray) {
    return JSON.parse(localStorage.getItem(nombreArray)) || [];
}

async function consultarBD (nombre) {
    const url = `http://localhost:4000/${nombre}`;
    try {
        // OK. Consultamos la BD desde db.json
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        // NO OK. Consultamos la BD desde 'src/js/baseDatos.js'
        console.log(error);
        return materialDeportivo;
    }
}

function numerosAleatorios (cantidadNumeros, limite) {
    const array = [];
    while (array.length < cantidadNumeros) {
        const numeroAleatorio = (Math.floor(Math.random() * limite)) + 1;
        let existe = false;
        for (let i=0; i<array.length; i++) {
            if(array [i] == numeroAleatorio){
                existe = true;
                break;
            }
        }
        if(!existe){
            array.push(numeroAleatorio);     
        }
    }
    return array;
}

