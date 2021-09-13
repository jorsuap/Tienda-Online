//Declaracion de variables

const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelectorAll('.comprar');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//agregamos un Listenner a cada boton COMPRAR y ejecutamos funcion agregar producto
listaProductos.forEach(function (comprar) {
    comprar.addEventListener('click', function (e) {
        e.preventDefault();
        const productoSelecionado = e.target.parentElement.parentElement;
        agregarProducto(productoSelecionado);
        console.log(e.target);
    })
});

cargarEvenlisteners();
function cargarEvenlisteners() {
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarproducto);
}

//Funcion eliminar curso
function eliminarproducto(e) {
    
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');
        //elliminar del arreglo
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        mostrarenHTML();
    }
}


//Funcion crear un objeto con la informacion del curso y luego lo agrega a un arreglo
function agregarProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('.item').src,
        name: producto.querySelector('.name-producto').textContent,
        precio: producto.querySelector('.precio').getAttribute('value'),
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    //revisar si ya existe un cursor: 
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const producto = articulosCarrito.map(producto => {
            //Si el producto ya existe aumentar su cantidad en 1 en 1
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.precio = parseInt(producto.precio);
                infoProducto.precio = parseInt(infoProducto.precio);
                precioInicial = infoProducto.precio;
                producto.precio += precioInicial;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...producto];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto]
    }
    mostrarenHTML();
};

//Funcion para mostrar los productos en el Carrito de compras
function mostrarenHTML() {
    limpiarHTML();
    articulosCarrito.forEach(producto => {
        const {
            imagen,
            name,
            precio,
            id,
            cantidad
        } = producto;
        const row = document.createElement('tr');
        row.innerHTML =`
            <td>
                <img src ="${imagen}" width="100">
            </td>
            <td>
                ${name}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                $${precio}
            </td>
            <td>
                <button class="borrar-producto" data-id="${producto.id}">X</button>
            </td>
            `;
            contenedorCarrito.appendChild(row);
    })
};
function limpiarHTML() {
    // contenedorCarrito.innerHTML ='';
    while (contenedorCarrito.firstChild) { //De esta forma se elimina la redundancia mas rapido
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};
vaciarCarrito.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
});

