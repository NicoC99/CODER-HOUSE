const nuevaCompetencia = {}

// FUNCION PARA CREAR LA COMPETENCIA
function crearCompetencia() {
    if (hayDatosGuardados() && !confirmarEliminarDatos()) {
        return
    }
    
    let nombre = document.getElementById("nombre").value
    let modalidad = document.getElementById("modalidad").value
    let categorias = []
    document.querySelectorAll('input[name="categorias"]:checked').forEach(function(checkbox) {
        categorias.push(checkbox.value)
    })
    let cantidadEventos = document.getElementById("cantidadEventos").value

    let indHombresP = document.getElementById("indHombresP").value
    let indMujeresP = document.getElementById("indMujeresP").value
    let duplasHombresP = document.getElementById("duplasHombresP").value
    let duplasMujeresP = document.getElementById("duplasMujeresP").value
    let indHombresI = document.getElementById("indHombresI").value
    let indMujeresI = document.getElementById("indMujeresI").value
    let duplasHombresI = document.getElementById("duplasHombresI").value
    let duplasMujeresI = document.getElementById("duplasMujeresI").value
    let indHombresA = document.getElementById("indHombresA").value
    let indMujeresA = document.getElementById("indMujeresA").value
    let duplasHombresA = document.getElementById("duplasHombresA").value
    let duplasMujeresA = document.getElementById("duplasMujeresA").value
    
    nuevaCompetencia.nombre = nombre
    nuevaCompetencia.modalidad = modalidad
    nuevaCompetencia.categorias = categorias
    nuevaCompetencia.cantidadEventos = cantidadEventos

    if (modalidad === "1") {
        nuevaCompetencia.hombresPrincipiante = indHombresP
        nuevaCompetencia.mujeresPrincipiante = indMujeresP
        nuevaCompetencia.hombresIntermedio = indHombresI
        nuevaCompetencia.mujeresIntermedio = indMujeresI
        nuevaCompetencia.hombresAvanzado = indHombresA
        nuevaCompetencia.mujeresAvanzado = indMujeresA
    } else if (modalidad === "2") {
        nuevaCompetencia.duplasHombresPrincipiante = duplasHombresP
        nuevaCompetencia.duplasMujeresPrincipiante = duplasMujeresP
        nuevaCompetencia.duplasHombresIntermedio = duplasHombresI
        nuevaCompetencia.duplasMujeresIntermedio = duplasMujeresI
        nuevaCompetencia.duplasHombresAvanzado = duplasHombresA
        nuevaCompetencia.duplasMujeresAvanzado = duplasMujeresA
    }
    
    localStorage.setItem("competencia", JSON.stringify(nuevaCompetencia))
    console.log(nuevaCompetencia) 
    console.log("creando")
}

//CREA LA TABLA PARA VER LOS PUNTAJES
function crearTabla() {
    let datos = JSON.parse(localStorage.getItem("competencia"))
    let cantidadEventos = datos.cantidadEventos || []
    let tablaContainer = document.getElementById("tablaContainer")
    for (let categoria = 0; categoria <= 2; categoria++) {
        if ((datos.categorias[categoria] === "principiante" || datos.categorias[categoria] === "intermedio" || datos.categorias[categoria] === "avanzado") && datos.categorias[categoria] != null) {
            let sexo = ["Masculino", "Femenino"]
            for (let s = 0; s <= 1; s++) {
                let atletas
                let puntajesAtletas = []
                let tabla = document.createElement("table")
                tabla.style.margin = "0 auto"
                tabla.style.marginTop = "20px"
                tabla.style.width = "80%"
                tabla.style.fontFamily = "Arial, sans-serif"
                let filaCategoria = document.createElement("tr")
                let celdaCategoria = document.createElement("td")
                celdaCategoria.style.fontWeight = "bold"
                celdaCategoria.style.fontSize = "20px"
                celdaCategoria.textContent = "Categoría " + datos.categorias[categoria] + " - " + sexo[s]
                celdaCategoria.setAttribute("colspan", cantidadEventos + 3)
                celdaCategoria.style.textAlign = "center"
                filaCategoria.appendChild(celdaCategoria)
                tabla.appendChild(filaCategoria)
                let fila1 = document.createElement("tr")
                let celdaModalidad = document.createElement("td")
                celdaModalidad.textContent = datos.modalidad == 1 ? "Atleta" : "Equipo"
                fila1.appendChild(celdaModalidad)
                for (let i = 1; i <= cantidadEventos; i++) {
                    let celdaEvento = document.createElement("td")
                    celdaEvento.textContent = "Puntos evento " + i
                    let celdaPosicion = document.createElement("td")
                    celdaPosicion.textContent = "Posición"
                    fila1.appendChild(celdaEvento)
                    fila1.appendChild(celdaPosicion)
                }
                let celdaTotal = document.createElement("td")
                celdaTotal.textContent = "Puntaje total"
                fila1.appendChild(celdaTotal)
                let celdaPosicion = document.createElement("td")
                celdaPosicion.textContent = "Posición"
                fila1.appendChild(celdaPosicion)
                tabla.appendChild(fila1)
                if(datos.modalidad == 1){
                    if (sexo[s] === "Masculino" && datos.categorias[categoria] === "principiante") {
                        atletas = datos.hombresPrincipiante
                    } else if (sexo[s] === "Masculino" && datos.categorias[categoria] === "intermedio") {
                        atletas = datos.hombresIntermedio
                    } else if (sexo[s] === "Masculino" && datos.categorias[categoria] === "avanzado") {
                        atletas = datos.hombresAvanzado
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "principiante") {
                        atletas = datos.mujeresPrincipiante
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "intermedio") {
                        atletas = datos.mujeresIntermedio
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "avanzado") {
                        atletas = datos.mujeresAvanzado
                    }
                } else {
                    if (sexo[s] === "Masculino" && datos.categorias[categoria] === "principiante") {
                        atletas = datos.duplasHombresPrincipiante
                    } else if (sexo[s] === "Masculino" && datos.categorias[categoria] === "intermedio") {
                        atletas = datos.duplasHombresIntermedio
                    } else if (sexo[s] === "Masculino" && datos.categorias[categoria] === "avanzado") {
                        atletas = datos.duplasHombresAvanzado
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "principiante") {
                        atletas = datos.duplasMujeresPrincipiante
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "intermedio") {
                        atletas = datos.duplasMujeresIntermedio
                    } else if (sexo[s] === "Femenino" && datos.categorias[categoria] === "avanzado") {
                        atletas = datos.duplasMujeresAvanzado
                    }
                }
                for (let j = 1; j <= atletas; j++) {
                    let atleta = {
                        categoria: datos.categorias[categoria],
                        sexo: sexo[s],
                        modalidad: datos.modalidad == 1 ? "Individual" : "Dupla",
                        numero: j,
                        puntajes: []
                    }
                    for (let i = 0; i < cantidadEventos; i++) {
                        atleta.puntajes.push(0)
                    }
                    puntajesAtletas.push(atleta)
                }
                puntajesAtletas.forEach(atleta => {
                    let fila = document.createElement("tr")
                    let celdaAtleta = document.createElement("td")
                    celdaAtleta.textContent = atleta.numero
                    fila.appendChild(celdaAtleta)
                    atleta.puntajes.forEach(puntaje => {
                        let celda = document.createElement("td")
                        celda.textContent = puntaje !== undefined ? puntaje : 0
                        fila.appendChild(celda)
                        let celdaVacia = document.createElement("td")
                        celdaVacia.textContent = "-"
                        fila.appendChild(celdaVacia)
                    })
                    let celdaPuntajeTotal = document.createElement("td")
                    celdaPuntajeTotal.textContent = 0
                    fila.appendChild(celdaPuntajeTotal)
                    let celdaPosicionFinal = document.createElement("td")
                    celdaPosicionFinal.textContent = "-"
                    fila.appendChild(celdaPosicionFinal)
                    tabla.appendChild(fila)
                })
                tablaContainer.appendChild(tabla)
            }
        }
    }   
}

// VERIFICA SI HAY DATOS QUE SE PUEDAN BORRAR
function hayDatosGuardados() {
    return localStorage.getItem("competencia") !== null
}

//PIDE EL OK PARA ELIMINAR AL CREAR NUEVA COMPETENCIA
function confirmarEliminarDatos() {
return swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Al crear una nueva competencia se borrarán los datos de la competencia existente.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        return result.isConfirmed
    })
}

// ELIMINA LOS DATOS DE LA COMPETENCIA PARA CREAR UNA NUEVA
function eliminarDatosCompetencia() {
    localStorage.removeItem("competencia")
    localStorage.removeItem("puntajes")
}

//ELIMINA LA TABLA PARA CREAR UNA NUEVA
function eliminarTabla() {
    let tablaContainer = document.getElementById("tablaContainer")
    tablaContainer.innerHTML = "" 
}

// DESACTIVAR EL BOTON PARA VER LA TABLA Y NO SE VUELVA A GENERAR
function deshabilitarBotonVerTablas() {
    console.log("Deshabilitar")
    document.getElementById("verTablas").disabled = true
}

// PARA ABRIR EL FORMULARIO DE LOS DATOS DE LA COMPETENCIA
document.getElementById("nuevaCompetencia").addEventListener("click", function() {
    if (hayDatosGuardados()) {
        confirmarEliminarDatos().then((confirmed) => {
            if (confirmed) {
                eliminarTabla()
                eliminarDatosCompetencia()
                document.getElementById("verTablas").disabled = false
                document.getElementById("formularioCompetencia").style.display = "block"
                document.getElementById("verTablas").disabled = true
            }
        })
    } else {
        document.getElementById("formularioCompetencia").style.display = "block"
    }
})

//PARA CREAR LA COMPETENCIA VERIFICANDO CON UNA PROMESA QUE SE LLENEN TODOS LOS CAMPOS
document.getElementById("crearCompetencia").addEventListener("click", function(event) {
    event.preventDefault()

    const mensajeError = document.getElementById("mensajeError")

    const verificarDatos = new Promise((resolve, reject) => {
        const nombre = document.getElementById("nombre").value
        const modalidad = document.getElementById("modalidad").value
        const categorias = document.querySelectorAll('input[name="categorias"]:checked')
        const cantidadEventos = document.getElementById("cantidadEventos").value
        
        if (nombre.trim() === "") {
            reject(new Error("Debe indicar un nombre para la competencia."))
        } else if (modalidad !== "1" && modalidad !== "2") {
            reject(new Error("Seleccione una modalidad válida para la competencia."))
        } else if (categorias.length === 0) {
            reject(new Error("Debe seleccionar al menos una categoría para la competencia."))
        } else if (cantidadEventos.trim() === "") {
            reject(new Error("Debe indicar la cantidad de eventos para la competencia."))
        } else {
            resolve()
        }
    })

    verificarDatos.then(() => {
        crearCompetencia()
        document.getElementById("formularioCompetencia").style.display = "none"
        // USO DE FETCH PARA MOSTRAR A LA HORA QUE SE CREO LA COMPETENCIA
            fetch('http://worldtimeapi.org/api/ip')
            .then(response => response.json())
            .then(data => {
                const horaCreacion = new Date(data.datetime)
                swal.fire({
                    icon: 'info',
                    title: 'Competencia creada',
                    text: 'La hora a la que se creó la competencia es: ' + horaCreacion.toLocaleString(),
                    showConfirmButton: false,
                    timer: 3000,
                })
            })
            .catch(error => {
                console.error('Se produjo un error al obtener la hora:', error)
            })
        document.getElementById("nuevaCompetencia").disabled = true
        setTimeout(function() {
            document.getElementById("verTablas").disabled = false
        }, 3000)
        setTimeout(function() {
            document.getElementById("nuevaCompetencia").disabled = false
        }, 10000)
    }).catch(error => {
        mensajeError.textContent = error.message
    })
})

// PARA GENERAR LA TABLA LUEGO DE CREAR LA COMPETENCIA
document.getElementById("verTablas").addEventListener("click", function() {
    crearTabla()
    deshabilitarBotonVerTablas()
})

// PARA ABRIR Y CERRAR LOS DIVS EN LOS CUALES SE INDICAN LA CANTIDAD DE ATLETAS O EQUIPOS
document.getElementById("modalidad").addEventListener("change", function() {
    let modalidad = this.value

    if (modalidad === "1") {
        document.querySelectorAll('.form-group[id^="individual"]').forEach(function(div) {
            div.style.display = "block"
        })
        document.querySelectorAll('.form-group[id^="duplas"]').forEach(function(div) {
            div.style.display = "none"
        })
    } else if (modalidad === "2") {
        document.querySelectorAll('.form-group[id^="individual"]').forEach(function(div) {
            div.style.display = "none"
        })
        document.querySelectorAll('.form-group[id^="duplas"]').forEach(function(div) {
            div.style.display = "block"
        })
    }
})

