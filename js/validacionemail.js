"use strict";

const fname = document.querySelector('#fname');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const asunto = document.querySelector('#asunto');
const formulario = document.querySelector('#formulario');
const submit = document.querySelector('.submit');
const reset = document.querySelector('.reset');
const botones = document.querySelector('.botones');



const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

fname.addEventListener('blur', validarFormulario);
email.addEventListener('blur', validarFormulario);
number.addEventListener('blur', validarFormulario);
asunto.addEventListener('blur', validarFormulario);
reset.addEventListener('click', recetearFormulario);
formulario.addEventListener('submit', enviaremail)


document.addEventListener('DOMContentLoaded', iniciarapp);

function iniciarapp() {
    submit.disabled = true;
    submit.classList.add('opacidad');
}

function validarFormulario(e) {
    // const error = document.querySelector('p.error');

    if (e.target.value === '') {
        e.target.classList.add('img-error');
        msnError('Todos los campos son obligatorios');
        iniciarapp();
    } else {
        const error = document.querySelector('p.text-error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('img-error');
    }
    if (e.target.type === 'email') {
        if (er.test(e.target.value)) {
            e.target.classList.remove('img-error');
            const error = document.querySelector('p.text-error');
            if (error) {
                error.remove();
            }
        } else {
            e.target.classList.add('img-error');
            msnError('Ingrese un Email valido');
            iniciarapp()
        }
    }
    if (er.test(email.value) && number.value !== '' && asunto.value !== '') {
        console.log('pasaste la validacion');
        submit.disabled = false;
        submit.classList.remove('opacidad');
    }
}

function msnError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('text-error');

    const errores = document.querySelectorAll('.text-error');
    if (errores.length === 0) {
        formulario.insertBefore(mensajeError, botones);
    }
}

function enviaremail(e) {
    e.preventDefault();

    setTimeout(() => {
        const parrafo = document.createElement('p');
        parrafo.classList.add('mnsExitoso')
        formulario.insertBefore(parrafo, botones);
        parrafo.textContent = 'El mensaje se envio correctamente';
        setTimeout(() => {
            parrafo.remove();
            recetearFormulario();
        }, 2000);
    }, 2000);
}

function recetearFormulario() {

    const error = document.querySelector('p.text-error');
    if (error) {
        error.remove();
    }
    fname.classList.remove('img-error');
    email.classList.remove('img-error');
    number.classList.remove('img-error');
    asunto.classList.remove('img-error');
    formulario.reset();
    iniciarapp();
}