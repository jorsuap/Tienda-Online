//Declaracion de variables

const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelectorAll('.comprar');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let cantidadProductos = document.querySelector('.incador-cantidad');
let total = document.querySelector('.totalPagar');
let totalmsn = document.querySelector('.total');
const msnvacio = document.querySelector('.msnvacio');
let cantidadTotal = 0;
let totalPagar = 0;
let articulosCarrito = [];



//agregamos un Listenner a cada boton COMPRAR y ejecutamos funcion agregar producto
listaProductos.forEach(function (comprar) {
    comprar.addEventListener('click', function (e) {
        e.preventDefault();
        const productoSelecionado = e.target.parentElement.parentElement;
        agregarProducto(productoSelecionado);
    })
});

cargarEvenlisteners();

function cargarEvenlisteners() {
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarproducto);

    //obtener datos del local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        cantidadTotal = JSON.parse(localStorage.getItem('cantidadtotal'))  || 0;
        totalPagar = JSON.parse(localStorage.getItem('totalpagar'))  || 0;
        mostrarenHTML();
        totalaPagar();
        actualizardisplay();
        carritoVacio();
    })
}

function carritoVacio(){
    if(articulosCarrito.length < 1){
        vaciarCarrito.classList.add('hiddecarrito');
        totalmsn.classList.add('hiddecarrito');
        msnvacio.classList.add('msnvacio-block');
    }else{
        vaciarCarrito.classList.remove('hiddecarrito');
        totalmsn.classList.remove('hiddecarrito');
        msnvacio.classList.remove('msnvacio-block');
    }
}


//Funcion eliminar curso
function eliminarproducto(e) {

    if (e.target.classList.contains('borrar-producto')) {

        const productoId = e.target.getAttribute('data-id');

        //esta funcion elimina la cantidad de unidades de un producto en el contador
        articulosCarrito.map(producto => {
            if (producto.id === productoId) {
                cantidadTotal -= producto.cantidad;
                totalPagar -= parseInt(producto.precio); //Total a pagar bill
                totalaPagar();
                console.log(totalPagar);
            }
        })
        //elliminar del arreglo filtrando por ID
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        mostrarenHTML();
        actualizardisplay();
        carritoVacio();
        sincronizarStorage();
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

    //SUMANDO LA CANTIDAD TOTAL DE PRODUCTOS EN EL CARRITO

    cantidadTotal += infoProducto.cantidad;
    totalPagar += parseInt(infoProducto.precio); //Total a pagar bill
    totalaPagar();

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
    actualizardisplay();
    carritoVacio();
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
        row.innerHTML = `
            <td>
                <img src ="${imagen}" width="100px">
            </td>
            <td class="alinear" >
                <div class="name-producto-carrito">${name}</div>
                <div>$${precio} (${cantidad})</div>
            </td>
            <td>
                <button class="borrar-producto" data-id="${producto.id}">X</button>
            </td>
            `;
        contenedorCarrito.appendChild(row);
    });

    //sincronizar con localStorage
    sincronizarStorage();
};

//sincronizar con local storage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    localStorage.setItem('cantidadtotal', JSON.stringify(cantidadTotal));
    localStorage.setItem('totalpagar', JSON.stringify(totalPagar))
}

function limpiarHTML() {
    // contenedorCarrito.innerHTML ='';
    while (contenedorCarrito.firstChild) { //De esta forma se elimina los elementos del DOM
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }    
};
vaciarCarrito.addEventListener('click', () => {
    articulosCarrito = [];
    cantidadTotal = 0;
    totalPagar = 0;
    actualizardisplay();
    limpiarHTML();
    totalaPagar();
    carritoVacio();
    
});

function actualizardisplay() {
    if (articulosCarrito.length >= 1) {
        cantidadProductos.innerHTML = cantidadTotal;
        cantidadProductos.classList.add('incador-cantidad_visible');
    } else {
        cantidadProductos.classList.remove('incador-cantidad_visible');
    };
};

function totalaPagar() {
    total.innerHTML = totalPagar;
}

