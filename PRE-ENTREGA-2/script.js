
const equipos = []
ingresarEquipos()
cargarPuntajes()
equipos.sort((a, b) => b.total - a.total)
mostrarTabla()
const promedio = calcularPromedio()
superanMedia(promedio)

function ingresarEquipos(){
    let cantidadEquipos;
    do {
        cantidadEquipos = parseInt(prompt("Ingrese la cantidad de equipos que participan."))
        if (isNaN(cantidadEquipos)) {
            alert("Por favor, ingrese un número válido.")
        } else if(cantidadEquipos === 0){
            alert("Debe haber al menos un equipo.")
        }
    } while (isNaN(cantidadEquipos) || cantidadEquipos === 0)

        for(let i = 1 ; i <= cantidadEquipos; i++) {
            let nombre1
            let nombre2
            do{
            nombre1 = prompt("Nombre del primer integrante del equipo " + i)
            if(nombre1.length === 0 ){
                alert("El campo no puede estar vacío.")
            }
            }while(nombre1.length === 0)

            do{
            nombre2 = prompt("Nombre del segundo integrante del equipo " + i)
            if(nombre2.length === 0 ){
                alert("El campo no puede estar vacío.")
            }
            }while(nombre2.length === 0)

            equipos.push({equipo : i, participante1 : nombre1, participante2 : nombre2, evento: []})
        }
}

function cargarPuntajes(){
    let cantidadEventos
    do{
    cantidadEventos= parseInt(prompt("Indique la cantidad de eventos."))
    if (isNaN(cantidadEventos)) {
        alert("Por favor, ingrese un número válido.")
    } else if(cantidadEventos === 0){
        alert("Debe haber al menos un evento.")
    }
    }while(isNaN(cantidadEventos) || cantidadEventos === 0)

    for (let i = 0; i < equipos.length; i++){
        for (let u = 0; u < cantidadEventos; u++){
            let puntaje

            do{
            puntaje = parseInt(prompt("Ingrese puntaje del evento "+ (u+1) + " del equipo " + (i+1) + " - " + equipos[i].participante1 + " y " + equipos[i].participante2))
                if (isNaN(puntaje)) {
                    alert("Por favor, ingrese un número válido.")
                }
            }while (isNaN(puntaje))

            equipos[i].evento[u] = puntaje
        }
        let puntajeTotal = 0
            for (let p = 0; p < equipos[i].evento.length; p++){
                puntajeTotal += equipos[i].evento[p]
            }
        equipos[i].total = puntajeTotal
    }
}

function mostrarTabla(){
    let tabla = ""
    let posicion = 1
    equipos.forEach(equipo =>{
        tabla += "Equipo: " + equipo.equipo + " - Integrantes: " + equipo.participante1 + " y " + equipo.participante2 + " - Puntos: " + equipo.total + " - Posición: " + posicion + "\n"
        posicion++
    })
    alert(tabla)
}

function calcularPromedio(){
    let promedio = 0
    let contador = 0
    equipos.forEach(equipo =>{
        promedio += equipo.total
        contador ++
    })
    promedio = promedio / contador
    return promedio
    
}

function superanMedia(promedio){
    const encimaMedia = equipos.filter(equipo => equipo.total >= promedio)
    let listado = "Los siguientes equipos están igual o encima de la media de puntos, que es igual a: " + promedio + "\n"
    encimaMedia.forEach(equipo =>{
        listado += "Equipo: " + equipo.equipo + " - Integrantes: " + equipo.participante1 + " y " + equipo.participante2 + " - Puntos: " + equipo.total + "\n"
    })
    alert(listado)
}