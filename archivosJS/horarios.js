
function encontrarPeli(movie){

    return peliculas.find((el)=>{

        return el.nombre === movie
    })

}


function TextoPeli (peliSeleccionada){

    Toastify({
        text: `el precio de la pelicula ${peliSeleccionada.nombre} es: ${peliSeleccionada.precio}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        backgroundColor: "green",
        
    }).showToast();
}


const peliculas = [

    {
    nombre: "Halloween",
    precio: 50,
    },

    {
        nombre: "Coraline y la puerta secreta",
        precio:25,
    },

    {
        nombre: "Hasta el ultimo hombre",
        precio: 45,
    },

    {
        nombre:"Guerra mundial Z",
        precio: 35,
    },

    {
        nombre:"Batman: El caballero de la noche",
        precio: 70,

    },

    {
        nombre: "Piratas del caribe: En el fin del mundo",
        precio: 40,
    },

    {
        nombre: "Buscando a Nemo",
        precio:55,
    },

    {
        nombre: "John Wick",
        precio: 45,
    },

    {
        nombre:"The Lost World: Jurassic Park",
        precio: 50,
    },

    {
        nombre:"El ultimo samurai",
        precio: 45,
    },
]


const select = document.getElementById("seleccionar_pelis")

const formulario = document.getElementById("formulario")

const inputNombre = document.getElementById("nombres")

const inputEntradas = document.getElementById("entradas")

const selectHorarios = document.getElementById("horarios")

const inputMonto = document.getElementById("monto")


const peliSeleccionada = []

//variable de la fecha
const fechaHoy = new Date()
let inputFecha = document.getElementById("input")
inputFecha.min= `${fechaHoy.getFullYear()}-${fechaHoy.getMonth() +1}-${fechaHoy.getDate()}`
formulario.append(inputFecha)





for(const movie of peliculas){

    const option = document.createElement("option")

    option.value = movie.nombre;

    option.innerHTML = movie.nombre;


    select.append(option)
}



const paso1 = document.getElementById("paso1")
const paso2 = document.getElementById("paso2")



select.addEventListener("change",(event)=>{

    
    
    const target = event.target

    const valor = target.value
    
    const peli = encontrarPeli(valor)

    peliSeleccionada.push(peli)

    TextoPeli(peli)
    
    if(select.value !== ""){
        paso1.className = "no-mostrar"
        paso2.className = "formulario"
    }
    
})



formulario.addEventListener("submit",(event)=>{

    event.preventDefault()

    
    


    const fecha = inputFecha.value
    const nombre = inputNombre.value
    const entradas = parseInt(inputEntradas.value)
    const horarios = selectHorarios.value
    
    

    inputFecha.value = ""
    inputEntradas.value = ""
    inputNombre.value = ""
    selectHorarios.value= "none"
    const precioInial = peliSeleccionada.reduce((acc,el) => el.precio,0 )
    let precioTotal = parseInt(precioInial * entradas)



    const monto = inputMonto.value

    const montoFinalizar = parseInt(monto)

    inputMonto.value = ""

    if(precioTotal > montoFinalizar || horarios === "none" || entradas < 1 || asientosSeleccionados < entradas || asientosSeleccionados < 1){
        

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "el monto que usted desea ingresar es menor al precio u o esta poniendo algo faltantel, su precio total es de:" + precioTotal,
            footer: '<strong>Vuelva a intentarlo</strong>>'
        })

        
    }else{

        peliSeleccionada.push({
            fecha : fecha,
            nombre :nombre,
            entradas: entradas,
            horarios: horarios,
            precioTotal: precioTotal,
            monto: montoFinalizar
        })

        
        

        for(const asientosSeleccionado of asientosSeleccionados){

            asientosReservados.push({
                id:asientosSeleccionado,
            })
        }

        formulario.style.display ="none"

        
        //guardo en local storage
        localStorage.setItem("asientos", JSON.stringify(asientosReservados))


        renderizarAsientos()

        const resto = montoFinalizar - precioTotal;

        Swal.fire({
            title: 'Bienvendio a Cinema',
            icon: 'success',
            text: "su vuelto es de: " + resto,
            confirmButtonText: 'Cool',
            footer: '<strong>Formulario enviado con exito</strong>',

            
        })
        
    
    }

})


console.log(peliSeleccionada)









function validarSeleccionAsiento(event,id){

    const target = event.target

    //si el asiento esta seleccionado
    if(asientosSeleccionados.includes(id)){

        target.className = "asiento"
        //borro asiento seleccionado
        asientosSeleccionados = asientosSeleccionados.filter((Element)=>{
            return Element !== id
        })

        
    }else{ 

        //si la cantidad de asientos menor a las entradas
        if(asientosSeleccionados.length < cantidadEntradas){

            if(!estaElAcientoReservado(id)){

                target.className = "asiento seleccionado"
                //agrego asiento
                asientosSeleccionados.push(id)
                console.log(asientosSeleccionados)

            }else{
                asientosSeleccionados.pop(id)
            }

        }
        
    }

    



}


function estaElAcientoReservado(id){
    const reserva = asientosReservados.find((elemento) =>{
        return elemento.id === id
    })

    return (reserva !== undefined)
}




function renderizarAsientos(){

    //limpiar el contenedor

    contenedor.innerHTML = ""

    for(let i = 1; i <= filas; i++){

        //generamos id de los asientos
        
    
        //creo la fila
        const fila = document.createElement("div")
        fila.className ="fila";
    
        for(let j = 1; j <=columnas; j++){
    
            const id = i.toString() + j.toString();
            //creo el asiento
            const asiento = document.createElement("div")
            
            if(estaElAcientoReservado(id)){

                asiento.className = "asiento reservado"
            }else{
                asiento.className = "asiento"
            }
    
            asiento.addEventListener("click", (event)=>{
                validarSeleccionAsiento(event,id)
            })

            //agrego asiento a la fila
            fila.append(asiento)

        }
    
        //agrego fila al contenedor
        contenedor.append(fila)
    }
    
}




function obtenerAsientosReservados(){

    let asientos = []

    const reservasLS = localStorage.getItem("asientos")

    if(reservasLS !==null){
        asientos = JSON.parse(reservasLS)
    }

    
    return asientos


    
}










//crear asientos

//variables de los asientos


let cantidadEntradas = 0

const filas = 8;
const columnas = 8;

const contenedor = document.getElementById("contenedor")

let asientosSeleccionados = []

let asientosReservados = obtenerAsientosReservados()



renderizarAsientos()





inputEntradas.addEventListener("change", ()=>{

    cantidadEntradas = parseInt(inputEntradas.value);

    
})





console.log(asientosSeleccionados)


console.log(asientosSeleccionados)