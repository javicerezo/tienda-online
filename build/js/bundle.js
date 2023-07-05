const desktop=1024;let contadorvisitados=0;const btnBuscador=document.querySelector(".js-header__centro"),btnBurger=document.querySelector(".js-header__burger"),btnConsulta=document.querySelector(".js-submenus__boton-consulta"),btnChat=document.querySelector(".js-submenus__boton-chat"),btnContacto=document.querySelector(".js-contacto"),btnEnviarContacto=document.querySelector(".js-contacto__enviar"),btnEnviarNewsletter=document.querySelector(".js-newsletter__enviar"),formularioNewsletter=document.querySelector(".js-newsletter__form"),spinnerNewsletter=document.querySelector(".js-newsletter__spinner"),formularioContacto=document.querySelector(".js-contacto__form"),spinnerContacto=document.querySelector(".js-contacto__spinner"),er=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,contenedorHeader=document.querySelector(".js-header"),contenedorNav=document.querySelector(".js-nav"),contenedorDestacados=document.querySelector(".js-item__grid"),contenedorNumArticulos=document.querySelector(".js-menus__cesta-numero"),contenedorCarrito=document.querySelector(".js-submenus__cesta"),contenedorModal=document.querySelector(".js-modal"),contenedorBuscador=document.querySelector(".js-buscador"),contenedorProductosVisitados=document.querySelector(".js-visitados"),contenedorCesta=document.querySelector(".js-cesta"),contenedorNewsletter=document.querySelector(".js-newsletter__contenedor"),contenedorContacto=document.querySelector(".js-contacto__contenedor");let articulosCarrito=[],articulosVisitados=[];class UI{limpiarHTML(e){for(;e.firstChild;)e.removeChild(e.firstChild)}compararBD(e,t){const a=[];return t.forEach(t=>{const i=e.filter(e=>e.id===t);a.push(i[0])}),a}imprimirBD(e,t,a){0==e.length?this.imprimirAlerta(t,"alerta","Ups... Prueba con otra búsqueda"):(e.forEach(e=>{const{marca:i,nombre:o,imagen:r,precio:s,descuento:n,id:c}=e;let l=redondearResultado(s*((100-n)/100));const d=document.createElement("li");d.classList.add(a+"__li"),d.innerHTML=`                        \n                    <div class='${a}__li-descuento js-descuento'>\n                        <p>${n}%</p>\n                    </div>\n                    <div class='${a}__li-img'>\n                        <picture>\n                            <source loading="lazy" srcset="${r}.webp" type="image/webp">\n                            <img width='200' height='300' class='js-picture' loading="lazy" src='${r}.jpg' alt='imagen producto ${c}'>\n                        </picture>\n                    </div>                        \n                    <div class='${a}__li-contenido'>\n                        <div class='${a}__li-contenido--mod'>\n                            <p class='${a}__li-titulo'><span>${i}</span></p>\n                            <p class='${a}__li-titulo'>${o}</p>\n                        </div>\n                        <div class ='${a}__li-contenido--mod'>\n                            <p class='${a}__li-precio'>${l} €</p>  \n                            <p class='${a}__li-precio--old js-precio--old'>${s} €</p>                        \n                        </div>\n                        <button class="${a}__li-button c-button c-button--amarillo" data-id=${c}>Añadir a la cesta</button>                    \n                    </div>\n                    <div class="${a}__mensaje"></div>\n                    `,t.appendChild(d)}),this.quitarDescuento(t))}quitarDescuento(e){for(let t=0;t<e.childElementCount;t++){let a=e.children[t].children[0],i=e.children[t].children[2].children[1].children[1];0===parseInt(a.children[0].textContent)&&(a.classList.add("u-display--none"),i.classList.add("u-display--none"))}}buscadorArticulos(e="Buscar..."){const t=document.createElement("div");t.classList.add("c-buscador__screen"),t.innerHTML=`\n            <div class='c-buscador__contenedor'>\n                <div class='c-buscador__cabecera'>\n                    <div class='c-buscador__logo'>\n                        <a href="https://javicerezo.github.io/tienda-online/"><img src='build/img/logo.svg' alt='logo empresa'></a>\n                    </div>\n                    <div class='c-buscador__form'>\n                        <input type='text' class='c-buscador__input js-buscador__input' placeholder='Buscar...' value='${e}'>\n                        <i class="fa-solid fa-magnifying-glass"></i>\n                    </div>\n                    <div class='c-buscador__close'>\n                        <i class='fa-solid fa-xmark'></i>\n                    </div>\n                </div>\n                <div class='c-buscador__contenido'>\n                    <div class='c-buscador__productos-populares'>\n                        <p class='c-buscador__p'>Búsquedas populares</p>\n                        <ul class='c-buscador__ul-populares'>\n                            <li class='c-buscador__li-populares'>Pies de gato</li>\n                            <li class='c-buscador__li-populares'>Grifone</li>\n                            <li class='c-buscador__li-populares'>Sacos de dormir</li>\n                            <li class='c-buscador__li-populares'>Petzl</li>\n                            <li class='c-buscador__li-populares'>La Sportiva</li>\n                            <li class='c-buscador__li-populares'>Cuerdas</li>\n                            <li class='c-buscador__li-populares'>Patagonia</li>\n                        </ul>\n                    </div>\n                    <div class='c-buscador__productos-buscar'>\n                        <p class='c-buscador__p'>Productos recomendados</p>\n                        <ul class='c-buscador__ul-buscar js-buscador__ul-buscar'>\n                            \n                        </ul>\n                    </div>\n                </div>\n            </div>\n        `,contenedorBuscador.appendChild(t),contenedorBuscador.classList.add("c-buscador--mod");const a=document.querySelector(".js-buscador__ul-buscar"),i=numerosAleatorios(3,materialDeportivo.length),o=ui.compararBD(materialDeportivo,i);this.imprimirBD(o,a,"c-buscador")}filtarArticulos(e){let t=[];return e=e.toLowerCase(),materialDeportivo.forEach(a=>{let i=`${a.marca} ${a.nombre} ${a.tipo}`.toLowerCase();const o=t.some(e=>e.id===a.id);i.includes(e)&&0==o&&(t=[...t,a])}),t}leerArticulo(e,t){const a={imagen:e.querySelector("img").src,marca:e.querySelector("."+t+"__li-titulo:first-Child").textContent,nombre:e.querySelector("."+t+"__li-titulo:last-Child").textContent,precioNew:parseFloat(e.querySelector("."+t+"__li-precio").textContent),precio:parseFloat(e.querySelector("."+t+"__li-precio--old").textContent),descuento:parseFloat(e.querySelector("."+t+"__li-descuento p").textContent),id:e.querySelector(".c-button").getAttribute("data-id"),cantidad:1};let i=a.imagen.substring(0,a.imagen.indexOf(".jpg"));return a.imagen=i,a}modalArticulos(e){const{imagen:t,marca:a,nombre:i,precioNew:o,precio:r,descuento:s,id:n}=e,c=document.createElement("div");c.classList.add("c-modal__screen"),c.innerHTML=`\n            <div class='c-modal__li'>\n                <div class='c-modal__li-descuento'>\n                    <p>${s}%</p>\n                </div>\n                <div class='c-modal__li-img'>\n                    <picture>\n                        <source loading="lazy" srcset="${t}.webp" type="image/webp">\n                        <img width='200' height='300' class='js-picture' loading="lazy" src='${t}.jpg' alt='imagen producto ${n}'>\n                    </picture>\n                </div>\n                <div class='c-modal__li-contenido'>\n                    <div class='c-modal__li-caracteristicas'>\n                        <p class='c-modal__li-caracteristicas-p'><span>Color:</span> blanco</p>\n                        <p class='c-modal__li-caracteristicas-p'><span>Talla:</span> M</p>\n                    </div>\n                    <div class='c-modal__li-contenido--mod'>\n                        <p class='c-modal__li-titulo'><span>${a}</span></p>\n                        <p class='c-modal__li-titulo'>${i}</p>\n                    </div>\n                    <p class='c-modal__li-precio'>${o} €</p>  \n                    <div class='c-modal__li-contenido--mod'>\n                        <p class='c-modal__li-precio--old'>${r} €</p>\n                        <p class='c-modal__li-precio--descuento'>(${s}%)</p>                        \n                    </div>\n                    <div class='c-modal__li-caracteristicas'>\n                        <p class='c-modal__li-caracteristicas-p'>¡ENVÍOS Y DEVOLUCIONES GRATIS!</p>\n                        <p class='c-modal__li-caracteristicas-p c-modal__li-caracteristicas-p--mod'>Ver condiciones</p>\n                    </div>\n                    <div class='c-modal__li-contenido--mod c-modal__li-button'>\n                        <button class='c-button c-button--amarillo' data-id=${n}>Añadir a la cesta</button>\n                    </div>                   \n                </div>\n                <div class='c-modal__li-close'>\n                    <i class='fa-solid fa-xmark'></i>\n                </div>\n                <div class='c-modal__li-mensaje'>\n                </div> \n            </div>\n            `,contenedorModal.appendChild(c),contenedorModal.classList.add("c-modal--mod"),this.quitarDescuento(c)}agregarVisitados(e){if(0==articulosVisitados.some(t=>t.id===e.id))return articulosVisitados.length<6||articulosVisitados.shift(),articulosVisitados=[...articulosVisitados,e]}imprimirVisitados(e){if(0!=e.length){if(contenedorProductosVisitados.classList.add("c-visitados"),0==contenedorProductosVisitados.childElementCount){const e=document.createElement("div");e.classList.add("c-visitados__contenedor"),e.innerHTML="\n                    <h2 class='c-visitados__h2'>Últimos productos que has visitado</h2>\n                    <ul class='c-visitados__grid js-visitados__grid'>\n                    \n                    </ul>\n                ",contenedorProductosVisitados.appendChild(e);const t=document.createElement("BUTTON");t.classList.add("c-visitados__botones","c-visitados__boton1","js-visitados__botones"),t.innerHTML='\n                    <i class="fa-solid fa-angle-left"></i>\n                ';const a=document.createElement("BUTTON");a.classList.add("c-visitados__botones","c-visitados__boton2","js-visitados__botones"),a.innerHTML='\n                    <i class="fa-solid fa-angle-right"></i>\n                ',contenedorProductosVisitados.appendChild(t),contenedorProductosVisitados.appendChild(a)}const t=contenedorProductosVisitados.children[0].children[1];this.limpiarHTML(t),this.imprimirBD(e,t,"c-visitados")}}agregarCarrito(e){if(articulosCarrito.some(t=>t.id===e.id)){const t=articulosCarrito.map(t=>t.id===e.id?(t.cantidad++,t):t);return articulosCarrito=[...t],articulosCarrito}return articulosCarrito=[...articulosCarrito,e],articulosCarrito}imprimirCarrito(e){if(this.limpiarHTML(contenedorCarrito),this.limpiarHTML(contenedorCarrito.parentElement.children[1]),0!=e.length&&(e.forEach(e=>{const{imagen:t,marca:a,nombre:i,precioNew:o,precio:r,descuento:s,cantidad:n,id:c}=e,l=document.createElement("li");l.classList.add("c-submenus__cesta-secciones","c-submenus__cesta-secciones--mod2"),l.innerHTML=`\n                    <div class="c-submenus__cesta-img">\n                        <picture>\n                            <source loading="lazy" srcset="${t}.webp" type="image/webp">\n                            <img width='200' height='300' class='js-picture' loading="lazy" src='${t}.jpg' alt='imagen producto ${c}'>\n                        </picture>\n                    </div>\n                    <div class="c-submenus__cesta-contenido">\n                        <p><span class="c-submenus__cesta-span">${a}</span> - ${i}</p>\n                        <div class='c-submenus__cesta-precios'>\n                            <p><span class="c-submenus__cesta-span">${o} €</span></p>\n                            <p>(${s}%) - <span class="c-submenus__cesta-span--old">${r}€</span></p>\n                        </div>\n                        <p>Cantidad: ${n} <a href="#" data-id=${c} class="c-submenus__cesta-eliminar js-submenus__cesta-eliminar">Eliminar</a></p>\n                    </div>\n                `,contenedorCarrito.appendChild(l),0==s&&l.children[1].children[1].children[1].classList.add("u-display--none")}),0!=contenedorCarrito.childElementCount)){let t=redondearResultado(e.reduce((e,t)=>e+t.cantidad*t.precioNew,0));const a=document.createElement("div");a.innerHTML=`\n                    <div class="c-submenus__separador">total: ${t} €</div>\n                    <div class="c-submenus__resultado">\n                        <a href="#" class="c-submenus__ver-cesta js-submenus__ver-cesta">Ver la cesta</a>\n                        <button class="c-button c-button--amarillo c-submenus__resultado-button js-submenus__resultado-button">tramitar</button>\n                    </div>\n                `,contenedorCarrito.parentElement.children[1].appendChild(a)}if(0==e.length){const e=document.createElement("li");e.classList.add("c-submenus__secciones"),e.innerHTML="\n                <p>En este momento no hay productos en tu cesta.</p>\n            ",contenedorCarrito.appendChild(e)}}eliminarArticulo(e,t=null){const a=e.getAttribute("data-id");return articulosCarrito=articulosCarrito.filter(e=>e.id!=a),articulosCarrito}comprobarNumeroArticulos(e){if(0==e.length)return 0;return e.reduce((e,t)=>e+t.cantidad,0)}imprimirNumeroArticulos(e){this.limpiarHTML(contenedorNumArticulos);const t=document.createElement("p");t.textContent=e,contenedorNumArticulos.appendChild(t)}imprimirAlerta(e,t,a){if(0===e.childElementCount){const i=document.createElement("p");i.classList.add("u-mensaje"),i.textContent=a,"exito"===t&&i.classList.add("u-mensaje--"+t),"error"===t&&i.classList.add("u-mensaje--"+t),"alerta"===t&&i.classList.add("u-mensaje--"+t),e.appendChild(i),0==e.classList.contains("c-buscador__ul-buscar")&&setTimeout(t=>{ui.limpiarHTML(e)},3e3)}}imprimirCesta(e,t){ui.limpiarHTML(t);const a=redondearResultado(e.reduce((e,t)=>e+(t.precio-t.cantidad),0));let i;i=0==a?0:5;const o=a+i,r=redondearResultado(e.reduce((e,t)=>e+(t.precio-t.precioNew),0)),s=document.createElement("div");s.classList.add("c-cesta__screen"),s.innerHTML=`\n            <div class='c-cesta__contenedor'>\n                <div class='c-cesta__cabecera'>\n                    <h2 class='c-cesta__h2'>Cesta de la compra</h2>\n                    <div class='c-cesta__close'>\n                        <i class='fa-solid fa-xmark'></i>\n                    </div>\n                </div>\n                <p class='c-cesta__p'>En la cesta de la compra puedes dejar temporalmente los productos que quieras,\n                pero debes tener en cuenta que el precio y la disponibilidad de los productos,\n                mientras no se tramite el pedido, están sujetos a cambio.</p>\n                <div class='c-cesta__contenedor-table'>\n                    <table class='c-cesta__table'>\n                        <thead class='c-cesta__thead'>\n                            <tr class='c-cesta__tr'>\n                            <th class='c-cesta__th'>Descripción del producto</th>\n                            <th class='c-cesta__th'>Precio por unidad</th>\n                            <th class='c-cesta__th'>IVA</th>\n                            <th class='c-cesta__th'>Cantidad</th>\n                            <th class='c-cesta__th'>Precio total</th>\n                            </tr>\n                        </thead>\n                        <tbody class='c-cesta__tbody js-cesta__tbody'>                            \n                        \n                        </tbody>\n                    </table>\n                </div>\n                <div class='c-cesta__resultado'>\n                    <div class='c-cesta__caja-botones'>\n                        <button class='c-cesta__boton c-button c-button--amarillo'>Continuar comprando</button>\n                        <div class='c-cesta__tramitar c-button c-button--amarillo js-cesta__boton'>\n                            <button class='c-cesta__boton'>Tramitar</button>\n                            <i class="fa-solid fa-cart-shopping"></i>\n                        </div>\n                    </div>\n                    <div class='c-cesta__detalle js-cesta__detalle'>\n                        <p class='c-cesta__detalle-p'>Subtotal <span>(IVA incluido):</span> ${a} €</p>\n                        <p class='c-cesta__detalle-p'>Gastos de envío <span>(IVA incluido):</span> ${i} €</p>                    \n                        <p class='c-cesta__detalle-p'>Subtotal del pedido: ${o} €</p>\n                        <p class='c-cesta__detalle-p'>Te has ahorrado <span>(IVA incluido):</span> ${r} €</p>\n                    </div>\n                </div>\n            </div>\n\n        `,t.classList.add("c-cesta--mod"),t.appendChild(s);const n=document.querySelector(".js-cesta__tbody");if(0==e.length){deshabilitarBoton(document.querySelector(".js-cesta__boton"))}else{e.forEach(e=>{const{marca:t,nombre:a,imagen:i,precio:o,precioNew:r,descuento:s,cantidad:c,id:l}=e;let d=redondearResultado(c*r),u=redondearResultado(o-r);const m=document.createElement("tr");if(m.classList.add("c-cesta__tr"),m.innerHTML=`\n                    <td class='c-cesta__td'>\n                        <picture class='c-cesta__tbody-picture'>\n                            <source loading="lazy" srcset="${i}.webp" type="image/webp">\n                            <img width='200' height='300' class='c-cesta__tbody-img js-picture' loading="lazy" src='${i}.jpg' alt='imagen producto ${l}'>\n                        </picture>\n                        <div class='c-cesta__tbody-descripcion'>\n                            <p class='c-cesta__tbody-p'><span>${t}</span> ${a}</p>\n                            <p class='c-cesta__tbody-p'>Color: white/black  |  Talla: M-L</p>\n                            <p class='c-cesta__tbody-p'>Entrega estimada el 5 de marzo con envío urgente</p>\n                            <div class='c-cesta__tbody-iconos'>\n                                <i class="fa-solid fa-dumpster-fire"></i>\n                                <a href='#' class='c-cesta__tbody-a' data-id=${l}>Eliminar</a>\n                            </div>\n                        </div>\n                    </td>\n                    <td class='c-cesta__td'>\n                        <div class='c-cesta__tbody-precios js-cesta__tbody-precios'>\n                            <p class='c-cesta__tbody-precio'>${r} €</p>                            \n                            <p class='c-cesta__tbody-precio'>Descuento: ${s}%</p>\n                            <p class='c-cesta__tbody-precio'>Ahorras: ${u} €</p>\n                        </div>\n                    </td>\n                    <td class='c-cesta__td'>21%</td>\n                    <td class='c-cesta__td'>${c}</td>\n                    <td class='c-cesta__td'>${d} €</td>\n                `,n.appendChild(m),0==s){const e=document.querySelector(".js-cesta__tbody-precios");e.children[1].classList.add("c-cesta__tbody-precio--mod"),e.children[2].classList.add("c-cesta__tbody-precio--mod")}});redondearResultado(e.reduce((e,t)=>e+t.cantidad*t.precioNew,0));redondearResultado(e.reduce((e,t)=>e+(t.precio-t.precioNew),0))}}tramitarPedido(){console.log("estas tramitando el pedido")}}const ui=new UI;function mostrarNav(){contenedorNav.classList.toggle("c-nav--mod"),contenedorHeader.classList.toggle("c-header--fixed"),btnBurger.children[0].children[0].classList.toggle("fa-bars"),btnBurger.children[0].children[0].classList.toggle("fa-xmark")}function mostrarContacto(){btnContacto.children[1].classList.toggle("c-contacto__screen--mod"),btnContacto.children[0].children[0].classList.toggle("c-contacto__img--mod"),btnContacto.children[0].children[0].classList.toggle("fa-envelope"),btnContacto.children[0].children[0].classList.toggle("fa-xmark"),btnContacto.children[0].children[0].classList.toggle("fa-solid"),btnContacto.children[0].children[0].classList.toggle("fa-regular")}function moverVisitados(e,t,a){const i=Number(a.getPropertyValue("--slide-transform").replace("px",""));"izquierda"===e?a.setProperty("--slide-transform",i+t+"px"):"derecha"===e&&a.setProperty("--slide-transform",i-t+"px")}function mostrarRadioButton(){formularioNewsletter.children[2].classList.add("c-newsletter__form-radio--mod"),formularioNewsletter.children[0].addEventListener("input",()=>{""!=formularioNewsletter.children[0].value?formularioNewsletter.children[1].classList.add("c-newsletter__label--mod"):formularioNewsletter.children[1].classList.remove("c-newsletter__label--mod")})}function comprobarEmail(e){let t=!1;return er.test(e)?(t=!0,t):t}function habilitarBoton(e){e.classList.remove("u-cursor--not-allowed","u-opacity--50"),e.disabled=!1}function deshabilitarBoton(e){e.classList.add("u-cursor--not-allowed","u-opacity--50"),e.disabled=!0}function mostrarSpiner(e){e.classList.remove("u-display--none"),setTimeout(()=>{e.classList.add("u-display--none")},3e3)}function resetFormulario(e,t){setTimeout(()=>{e.reset(),t.classList.add("u-cursor--not-allowed","u-opacity--50"),t.disabled=!0},3e3)}function enviarEmail(e){console.log("ENVIANDO EMAIL...a "+e)}function redondearResultado(e){return Math.round(100*e)/100}function guardarStorage(e,t){localStorage.setItem(e,JSON.stringify(t))}function cargarStorage(e){return JSON.parse(localStorage.getItem(e))||[]}async function consultarBD(e){const t="http://localhost:4000/"+e;try{const e=await fetch(t);return await e.json()}catch(e){return console.log(e),materialDeportivo}}function numerosAleatorios(e,t){const a=[];for(;a.length<e;){const e=Math.floor(Math.random()*t)+1;let i=!1;for(let t=0;t<a.length;t++)if(a[t]==e){i=!0;break}i||a.push(e)}return a}window.addEventListener("DOMContentLoaded",async()=>{articulosCarrito=cargarStorage("articulosCarrito"),articulosVisitados=cargarStorage("articulosVisitados");let e=await consultarBD("materialDeportivo");deshabilitarBoton(btnEnviarNewsletter),deshabilitarBoton(btnEnviarContacto),ui.imprimirCarrito(articulosCarrito);const t=ui.comprobarNumeroArticulos(articulosCarrito);ui.imprimirNumeroArticulos(t),ui.imprimirVisitados(articulosVisitados);const a=numerosAleatorios(8,e.length),i=ui.compararBD(e,a);ui.imprimirBD(i,contenedorDestacados,"c-item")}),btnBurger.addEventListener("click",mostrarNav),btnConsulta.addEventListener("click",mostrarContacto),btnContacto.children[0].addEventListener("click",mostrarContacto),formularioNewsletter.children[0].addEventListener("click",mostrarRadioButton),formularioNewsletter.children[0].addEventListener("blur",e=>{if("email"===e.target.type){comprobarEmail(e.target.value)?habilitarBoton(btnEnviarNewsletter):(deshabilitarBoton(btnEnviarNewsletter),ui.imprimirAlerta(contenedorNewsletter,"error","el email no es valido"))}}),formularioNewsletter.addEventListener("submit",e=>{e.preventDefault();enviarEmail(e.target.value),mostrarSpiner(spinnerNewsletter),ui.imprimirAlerta(contenedorNewsletter,"exito","mensaje enviado correctamente"),resetFormulario(formularioNewsletter,btnEnviarNewsletter)}),formularioContacto.children[0].children[1].addEventListener("blur",e=>{if("email"===e.target.type){comprobarEmail(e.target.value)?habilitarBoton(btnEnviarContacto):(deshabilitarBoton(btnEnviarContacto),ui.imprimirAlerta(contenedorContacto,"error","el email no es valido"))}}),formularioContacto.addEventListener("submit",e=>{e.preventDefault();enviarEmail(e.target.value),mostrarSpiner(spinnerContacto),ui.imprimirAlerta(contenedorContacto,"exito","mensaje enviado correctamente"),resetFormulario(formularioContacto,btnEnviarContacto)}),btnChat.addEventListener("click",()=>{console.log("has pulsado el boton del chat")}),btnBuscador.addEventListener("click",()=>{ui.buscadorArticulos()}),window.addEventListener("resize",()=>{contenedorHeader.clientWidth>=1024&&contenedorNav.classList.contains("c-nav--mod")&&(contenedorNav.classList.remove("c-nav--mod"),contenedorHeader.classList.remove("c-header--fixed"),btnBurger.children[0].children[0].classList.toggle("fa-bars"),btnBurger.children[0].children[0].classList.toggle("fa-xmark"))}),contenedorNav.addEventListener("click",e=>{if(e.target.classList.contains("c-subnav__li")){const t=e.target.textContent;ui.buscadorArticulos(t);const a=document.querySelector(".js-buscador__ul-buscar");ui.limpiarHTML(a);const i=ui.filtarArticulos(t);console.log(i),ui.imprimirBD(i,a,"c-buscador")}}),contenedorDestacados.addEventListener("click",e=>{if(e.target.classList.contains("c-button")){const t=e.target.parentElement.parentElement,a=e.target.parentElement.parentElement.children[3],i=ui.leerArticulo(t,"c-item"),o=ui.agregarCarrito(i);ui.imprimirCarrito(o);const r=ui.comprobarNumeroArticulos(o);ui.imprimirNumeroArticulos(r),guardarStorage("articulosCarrito",o),ui.imprimirAlerta(a,"exito","producto añadido al carrito")}if(e.target.classList.contains("js-picture")){const t=e.target.parentElement.parentElement.parentElement,a=ui.leerArticulo(t,"c-item");ui.modalArticulos(a);const i=ui.agregarVisitados(a);ui.imprimirVisitados(i),guardarStorage("articulosVisitados",i)}}),contenedorCarrito.addEventListener("click",e=>{if(e.target.classList.contains("js-submenus__cesta-eliminar")){const t=e.target,a=ui.eliminarArticulo(t);ui.imprimirCarrito(a);const i=ui.comprobarNumeroArticulos(a);ui.imprimirNumeroArticulos(i),guardarStorage("articulosCarrito",a)}}),contenedorCarrito.parentElement.children[1].addEventListener("click",e=>{e.target.classList.contains("js-submenus__ver-cesta")&&(ui.imprimirCesta(articulosCarrito,contenedorCesta),setTimeout(()=>{contenedorHeader.classList.add("c-header--fixed")},2e3)),e.target.classList.contains("js-submenus__resultado-button")&&ui.tramitarPedido()}),contenedorModal.addEventListener("click",e=>{if((e.target.classList.contains("fa-solid")||e.target.classList.contains("c-modal__screen"))&&(contenedorModal.classList.remove("c-modal--mod"),setTimeout(()=>{ui.limpiarHTML(contenedorModal)},100)),e.target.classList.contains("c-button")){const t=e.target.parentElement.parentElement.parentElement,a=t.children[4],i=ui.leerArticulo(t,"c-modal"),o=ui.agregarCarrito(i);ui.imprimirCarrito(o);const r=ui.comprobarNumeroArticulos(o);ui.imprimirNumeroArticulos(r),guardarStorage("articulosCarrito",o),ui.imprimirAlerta(a,"exito","producto añadido al carrito")}}),contenedorBuscador.addEventListener("click",e=>{const t=document.querySelector(".js-buscador__ul-buscar");let a=document.querySelector(".js-buscador__input");if((e.target.classList.contains("c-buscador__close")||e.target.classList.contains("fa-solid"))&&(contenedorBuscador.classList.remove("c-buscador--mod"),setTimeout(()=>{ui.limpiarHTML(contenedorBuscador)},100),ui.imprimirVisitados(articulosVisitados)),e.target.classList.contains("c-button")){const t=e.target.parentElement.parentElement,a=e.target.parentElement.parentElement.children[3],i=ui.leerArticulo(t,"c-buscador"),o=ui.agregarCarrito(i);ui.imprimirCarrito(o);const r=ui.comprobarNumeroArticulos(o);ui.imprimirNumeroArticulos(r),guardarStorage("articulosCarrito",o),ui.imprimirAlerta(a,"exito","producto añadido al carrito")}if(e.target.classList.contains("js-picture")){const t=e.target.parentElement.parentElement.parentElement,a=ui.leerArticulo(t,"c-buscador");ui.modalArticulos(a);guardarStorage("articulosVisitados",ui.agregarVisitados(a))}if(e.target.classList.contains("c-buscador__li-populares")){ui.limpiarHTML(t);const i=e.target.textContent,o=ui.filtarArticulos(i);ui.imprimirBD(o,t,"c-buscador"),a.value=i}}),contenedorBuscador.addEventListener("input",e=>{const t=document.querySelector(".js-buscador__ul-buscar");let a=e.target.value;if(ui.limpiarHTML(t),e.target.classList.contains("c-buscador__input"))if(""===a)ui.imprimirAlerta(t,"alerta","¿qué quieres buscar?");else{const e=ui.filtarArticulos(a);ui.imprimirBD(e,t,"c-buscador")}}),contenedorProductosVisitados.addEventListener("click",e=>{if(e.target.classList.contains("c-button")){const t=e.target.parentElement.parentElement,a=e.target.parentElement.parentElement.children[3],i=ui.leerArticulo(t,"c-visitados"),o=ui.agregarCarrito(i);ui.imprimirCarrito(o);const r=ui.comprobarNumeroArticulos(o);ui.imprimirNumeroArticulos(r),guardarStorage("articulosCarrito",o),ui.imprimirAlerta(a,"exito","producto añadido al carrito")}if(e.target.classList.contains("js-picture")){const t=e.target.parentElement.parentElement.parentElement,a=ui.leerArticulo(t,"c-visitados");ui.modalArticulos(a)}const t=document.documentElement.style,a=document.querySelectorAll(".c-visitados__li");let i=a[0].scrollWidth;e.target.classList.contains("fa-angle-left")&&contadorvisitados>0&&(moverVisitados("izquierda",i,t),contadorvisitados--),e.target.classList.contains("fa-angle-right")&&contadorvisitados<a.length-1&&(moverVisitados("derecha",i,t),contadorvisitados++)}),contenedorCesta.addEventListener("click",e=>{if((e.target.classList.contains("fa-solid")||"Continuar comprando"==e.target.textContent)&&(contenedorCesta.classList.remove("c-cesta--mod"),contenedorHeader.classList.remove("c-header--fixed"),setTimeout(()=>{ui.limpiarHTML(contenedorCesta)},100)),e.target.classList.contains("c-cesta__tbody-a")){const t=e.target,a=ui.eliminarArticulo(t);ui.imprimirCarrito(a);const i=ui.comprobarNumeroArticulos(a);ui.imprimirNumeroArticulos(i),guardarStorage("articulosCarrito",a),ui.imprimirCesta(a,contenedorCesta)}contenedorCarrito.addEventListener("click",e=>{if(e.target.classList.contains("js-submenus__cesta-eliminar")){const t=e.target,a=ui.eliminarArticulo(t);ui.imprimirCarrito(a);const i=ui.comprobarNumeroArticulos(a);ui.imprimirNumeroArticulos(i),guardarStorage("articulosCarrito",a),ui.imprimirCesta(a,contenedorCesta)}})});let materialDeportivo=[{marca:"Roxi",nombre:"Liberty Hoodie W",tipo:"sudadera",imagen:"build/img/material/material1",precio:115.49,descuento:0,id:1},{marca:"Grifone",nombre:"Costoia Pants",tipo:"pantalon",imagen:"build/img/material/material2",precio:50.55,descuento:18,id:2},{marca:"Trangoworld",nombre:"Velez",tipo:"sudadera",imagen:"build/img/material/material3",precio:82.8,descuento:12,id:3},{marca:"Grifone",nombre:"Adur Jacket W",tipo:"chaqueta impermeable",imagen:"build/img/material/material4",precio:150.15,descuento:43,id:4},{marca:"Salomon",nombre:" Speed Jaket W",tipo:"chaqueta plumas plumifero",imagen:"build/img/material/material5",precio:80.45,descuento:33,id:5},{marca:"The North Face",nombre:"Summit Pro 120",tipo:"sudadera camiseta",imagen:"build/img/material/material6",precio:322.8,descuento:50,id:6},{marca:"Salomon",nombre:"Pierra Ment Pant",tipo:"pantalon",imagen:"build/img/material/material7",precio:150.15,descuento:60,id:7},{marca:"+8000",nombre:"TLT Gtx Overpant",tipo:"pantalon",imagen:"build/img/material/material8",precio:80.45,descuento:8,id:8},{marca:"Petzl",nombre:"Quark",tipo:"piolet",imagen:"build/img/material/material9",precio:242,descuento:25,id:9},{marca:"Atomic",nombre:"Nightshade",tipo:"casco esqui",imagen:"build/img/material/material10",precio:129.99,descuento:30,id:10},{marca:"Scarpa",nombre:"Ribelle HD",tipo:"botas alpinismo",imagen:"build/img/material/material11",precio:312.55,descuento:0,id:11},{marca:"La Sportiva",nombre:"miura",tipo:"pies de gato escalada",imagen:"build/img/material/material12",precio:145.99,descuento:9,id:12},{marca:"La Sportiva",nombre:"Kataki",tipo:"pies de gato escalada",imagen:"build/img/material/material13",precio:151.95,descuento:9,id:13},{marca:"La Sportiva",nombre:"Katana",tipo:"pies de gato escalada",imagen:"build/img/material/material14",precio:139,descuento:9,id:14},{marca:"Totem Cams",nombre:"0.65",tipo:"friends escalada clasica",imagen:"build/img/material/material15",precio:84.95,descuento:0,id:15},{marca:"Totem Cams",nombre:"1.80",tipo:"friends escalada clasica",imagen:"build/img/material/material16",precio:84.95,descuento:0,id:16},{marca:"Totem Cams",nombre:"Set intermedio",tipo:"friends escalada clasica",imagen:"build/img/material/material17",precio:264.95,descuento:0,id:17},{marca:"Petzl",nombre:"Tango 8.5mm x 60m",tipo:"cuerda dinamica escalada",imagen:"build/img/material/material18",precio:140,descuento:29,id:18},{marca:"Petzl",nombre:"Paso Guide 7.7mm x 60m",tipo:"cuerda dinamica escalada",imagen:"build/img/material/material19",precio:152,descuento:25,id:19},{marca:"Petzl",nombre:"Volta Guide 9.2mm x 30m",tipo:"cuerda dinamica escalada",imagen:"build/img/material/material20",precio:116.5,descuento:29,id:20},{marca:"Petzl",nombre:"Pack 6 Djinn Axess 12cm",tipo:"cintas expres escalada deportiva mosqueton",imagen:"build/img/material/material21",precio:151.95,descuento:9,id:21},{marca:"Fixe",nombre:"Lotus rosca",tipo:"cintas expres escalada deportiva mosqueton",imagen:"build/img/material/material22",precio:11.99,descuento:12,id:22},{marca:"Camp",nombre:"Nano 22 Rack Pack",tipo:"cintas expres escalada deportiva mosqueton",imagen:"build/img/material/material23",precio:46,descuento:10,id:23},{marca:"Petzl",nombre:"OK Triact-Lock",tipo:"cintas expres escalada deportiva mosqueton",imagen:"build/img/material/material24",precio:139,descuento:9,id:24},{marca:"Kong",nombre:"Frog Quickdraw",tipo:"cintas expres escalada deportiva mosqueton",imagen:"build/img/material/material25",precio:35.48,descuento:14,id:25},{marca:"Black Diamond",nombre:"ATC-Guide",tipo:"descensor escalada deportiva",imagen:"build/img/material/material26",precio:39,descuento:12,id:26},{marca:"Climbing Technology",nombre:"Alpine Up",tipo:"descensor escalada deportiva",imagen:"build/img/material/material27",precio:115.95,descuento:20,id:27},{marca:"Petzl",nombre:"Grigri +",tipo:"asegurador escalada deportiva",imagen:"build/img/material/material28",precio:121,descuento:30,id:28},{marca:"Fixe",nombre:"Parabold M12 x 90mm (20 uds)",tipo:"escalada deportiva equipamiento",imagen:"build/img/material/material29",precio:110.45,descuento:30,id:29},{marca:"Grivel",nombre:"Stealth Titanium",tipo:"escalada deportiva casco",imagen:"build/img/material/material30",precio:102,descuento:23,id:30},{marca:"Mammut",nombre:"Skywalker 2",tipo:"escalada deportiva casco",imagen:"build/img/material/material31",precio:70,descuento:40,id:31},{marca:"Petzl",nombre:"Meteor S/M",tipo:"escalada deportiva casco",imagen:"build/img/material/material32",precio:90.75,descuento:20,id:32}];
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/!function(e,t,a){function i(e,t){return typeof e===t}function o(e){var t=u.className,a=l._config.classPrefix||"";if(m&&(t=t.baseVal),l._config.enableJSClass){var i=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");t=t.replace(i,"$1"+a+"js$2")}l._config.enableClasses&&(t+=" "+a+e.join(" "+a),m?u.className.baseVal=t:u.className=t)}function r(e,t){if("object"==typeof e)for(var a in e)d(e,a)&&r(a,e[a]);else{var i=(e=e.toLowerCase()).split("."),s=l[i[0]];if(2==i.length&&(s=s[i[1]]),void 0!==s)return l;t="function"==typeof t?t():t,1==i.length?l[i[0]]=t:(!l[i[0]]||l[i[0]]instanceof Boolean||(l[i[0]]=new Boolean(l[i[0]])),l[i[0]][i[1]]=t),o([(t&&0!=t?"":"no-")+i.join("-")]),l._trigger(e,t)}return l}var s=[],n=[],c={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var a=this;setTimeout((function(){t(a[e])}),0)},addTest:function(e,t,a){n.push({name:e,fn:t,options:a})},addAsyncTest:function(e){n.push({name:null,fn:e})}},l=function(){};l.prototype=c,l=new l;var d,u=t.documentElement,m="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;d=i(e,"undefined")||i(e.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(t,a){return e.call(t,a)}}(),c._l={},c.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),l.hasOwnProperty(e)&&setTimeout((function(){l._trigger(e,l[e])}),0)},c._trigger=function(e,t){if(this._l[e]){var a=this._l[e];setTimeout((function(){var e;for(e=0;e<a.length;e++)(0,a[e])(t)}),0),delete this._l[e]}},l._q.push((function(){c.addTest=r})),l.addAsyncTest((function(){function e(e,t,a){function i(t){var i=!(!t||"load"!==t.type)&&1==o.width;r(e,"webp"===e&&i?new Boolean(i):i),a&&a(t)}var o=new Image;o.onerror=i,o.onload=i,o.src=t}var t=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],a=t.shift();e(a.name,a.uri,(function(a){if(a&&"load"===a.type)for(var i=0;i<t.length;i++)e(t[i].name,t[i].uri)}))})),function(){var e,t,a,o,r,c;for(var d in n)if(n.hasOwnProperty(d)){if(e=[],(t=n[d]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(a=0;a<t.options.aliases.length;a++)e.push(t.options.aliases[a].toLowerCase());for(o=i(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)1===(c=e[r].split(".")).length?l[c[0]]=o:(!l[c[0]]||l[c[0]]instanceof Boolean||(l[c[0]]=new Boolean(l[c[0]])),l[c[0]][c[1]]=o),s.push((o?"":"no-")+c.join("-"))}}(),o(s),delete c.addTest,delete c.addAsyncTest;for(var p=0;p<l._q.length;p++)l._q[p]();e.Modernizr=l}(window,document);
//# sourceMappingURL=bundle.js.map
