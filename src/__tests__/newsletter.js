// NOTA: SI PASAN LOS TEST A NEWSLETTER, PASARÁN LOS TEST A CONTACTO YA QUE SON LAS MISMAS FUNCIONES

function comprobarEmail (email) {
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

    let correcto = false;
    if (!er.test(email)){
        return correcto;
    } else {
        correcto = true;
        return correcto;
    }
}

describe('testing al formulario newsletter', () => {
    test('email correcto', () => {
        expect(comprobarEmail('correo@correo.es')).toBe(true);
    });
    test('email correcto', () => {
        expect(comprobarEmail('correocorreo.es')).toBe(false);
    });
    test('email no correcto', () => {
        expect(comprobarEmail('correo@correoes')).toBe(false);
    });
    test('email no correcto', () => {
        expect(comprobarEmail('correo@correo.')).toBe(false);
    });
})