class Funciones {
    static claveSecreta = "vsd23jKAd132DBSsajbca23rfbldacvq";

    stringValida(cadena) {
        // Expresión regular para verificar si la cadena contiene únicamente los caracteres permitidos
        const regex = /^[a-zA-Z0-9.,:;/#@!¡?¿\s]+$/;
        // Verificar si la cadena cumple con el patrón de la expresión regular
        return regex.test(cadena);
    }

    crearToken(nombreDeUsuario, estado, foto) {
        const resultado = Funciones.claveSecreta + ':' + nombreDeUsuario + '/' + estado + '/' + foto;
        return resultado;
    }
    comprobarToken(token) {
        const partes = token.split(':');
        if (partes.length !== 2) {
            return false; 
        }
        if (partes[0]!=Funciones.claveSecreta) {
            return false;
        }
        const datos = partes[1].split('/');
        if (datos.length!==3) {
            return false;
        }
        if (!datos.every(this.stringValida)) {
            return false;
        }
        return {
            "name": datos[0],
            "estado":datos[1],
            "fotoDePerfil":datos[2],
            "token":token
        };
    }

}
module.exports = Funciones;