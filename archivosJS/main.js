
const peli1 = document.getElementById("pel1")
const mostrarInfo = document.getElementById("informacion")


let peliEscojida = []

// inicio con peliculas

console.log(peliEscojida)

function cargarPeliculas(){
    fetch("./peliculas.json")
    .then(response => response.json())
    .then(producto => {
        producto.forEach(producto => {
            const div = document.createElement("div")
        div.className="container"
        //crear imagenes y el nombre  
        div.innerHTML = `
        <img src="${producto.img}"
        <h3 class="nombre_pelis">${producto.nombre}</h3>
        `;   
        peli1.append(div)
        //creo el boton
        let boton = document.createElement("button")
        boton.className="boton"    
        boton.innerText= "Informacion"
        boton.addEventListener("click",()=>{
            peliEscojida.push({
                informacion: producto.informacion,
                precio: producto.precio,
                trailer:producto.trailer,
            })
            mostrarInfo.className ="info-1"
            mostrarInfo.innerHTML = `
            <h1 class="titulo">${producto.nombre}</h1>
            <p class="Texto">${producto.informacion}</p>
            <li><a href=${producto.trailer}target="_blank">trailer: ${producto.nombre} </a></li>
            `      
            mostrarInfo.style.display = "flex"
            const crearBoton = document.createElement("h1")
            crearBoton.innerText = "X"
            crearBoton.className = "botonCerrar"              
            crearBoton.addEventListener("click", ()=>{
                mostrarInfo.style.display = "none"
            })       
            mostrarInfo.append(crearBoton)         
        })
        div.append(boton)
        })   
    })

}
cargarPeliculas()


