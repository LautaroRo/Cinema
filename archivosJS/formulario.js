
const mainFormulario = document.getElementById("containerFormulario")

const inputName = document.getElementById("Name")

const inputGmail = document.getElementById("Gmail")

const inputTelefono = document.getElementById("Telefono")

const inputDireccion = document.getElementById("Direccion")

const textoResultado = document.getElementById("textoResultado")




function bloquearBoton(bloqueado = true){
    

    const botonFormulario = document.getElementById("botonFormulario")

    
        if(bloqueado){
            botonFormulario.disabled = "true"
        } else{
            botonFormulario.disabled = ""
        }
    
}






function enviarFormulario(name, gmail, telefono, direccion){

    return new Promise((resolve,reject)=>{

        bloquearBoton()
        const random = Math.round(Math.random())

        setTimeout(() =>{

            if(random === 1){
                resolve("formulario enviado con exito")
            } else{
                reject("ERROR al enviar formulario")
            }
        },1000)
    })
}


const datosFormulario = []


mainFormulario.addEventListener("submit", (e) =>{

    e.preventDefault()

    const name = inputName.value

    const gmail = inputGmail.value

    const telefono = inputTelefono.value

    const direccion = inputDireccion.value

    enviarFormulario(name,gmail,telefono,direccion).then((mensaje)=>{

        textoResultado.innerHTML =  `<strong style="color: green"> ${mensaje} </strong>`

        Swal.fire({
            title: 'Bienvendio a Cinema',
            icon: 'success',
            confirmButtonText: 'Cool',
            footer: '<strong>Formulario enviado con exito</strong>',
        })

        mainFormulario.style.display = "none"

        datosFormulario.push({
            name: name,
            gmail: gmail,
            telefono: telefono,
            direccion: direccion,
        })

    }).catch((errorDeFormulario) =>{


        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error inesperado!',
            footer: '<strong>Vuelva a intentarlo</strong>>'
        })

        textoResultado.innerHTML = `<strong style="color : red"> ${errorDeFormulario}</strong>`

        inputName.value = ""
        inputGmail.value = ""
        inputTelefono.value= ""
        inputDireccion.value=""

    }).finally(() =>{

        bloquearBoton(false);
    })
})





console.log(datosFormulario)