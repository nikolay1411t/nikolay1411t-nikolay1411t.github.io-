const  expresiones  =  { 

    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	//nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	//password: /^.{4,12}$/, // 4 a 12 digitos.
	//correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	//telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	 
	nombre :  /^[a-zA-ZÀ-ÿ\s]{1,50}$/ ,  
	correo : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ,
    asunto : /^[a-zA-ZÀ-ÿ\s]{1,50}$/ ,
	mensaje : /^[a-zA-ZÀ-ÿ\s]{1,300}$/  
}

const campos = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false
}



const formulario= document.getElementById("formulario")
const inputs= document.querySelectorAll("#formulario input")
const areatexto =  document.querySelector("[data-textarea]")


const validar = (expresion, input, caso)=>{
    if(expresion.test(input.value)){
        document.getElementById(`input-${caso}`).classList.remove("input-container-incorrecto")
        document.getElementById(`input-${caso}`).classList.add("input-container-correcto")
        document.querySelector(`#input-${caso} i`).classList.remove("fa-circle-xmark")
        document.querySelector(`#input-${caso} i`).classList.add("fa-check-circle")
        document.querySelector(`#input-${caso} .input-message-error`).classList.remove("input-message-error-active")
        campos[caso] = true;
    } else {
        document.getElementById(`input-${caso}`).classList.remove("input-container-correcto")
        document.getElementById(`input-${caso}`).classList.add("input-container-incorrecto")
        document.querySelector(`#input-${caso} i`).classList.remove("fa-check-circle")
        document.querySelector(`#input-${caso} i`).classList.add("fa-circle-xmark")
        document.querySelector(`#input-${caso} .input-message-error`).classList.add("input-message-error-active")
        campos[caso] = false;

    }
}



const validarFormulario = (event) =>{
    switch (event.target.name){
        case "name":
           validar(expresiones.nombre, event.target, 'nombre' )
            break;
        case "email":
            validar(expresiones.correo, event.target, 'email' )
            break;

        case "asunto":
            validar(expresiones.asunto, event.target, 'asunto' )
            break;

        case "mensaje":
            validar(expresiones.mensaje, event.target, 'mensaje' )
             break;
    }
}



inputs.forEach((input)=>{
    input.addEventListener("keyup",validarFormulario)
    input.addEventListener("blur",validarFormulario)
    areatexto.addEventListener("blur",validarFormulario)
    areatexto.addEventListener("keyup",validarFormulario)
})

formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    if (campos.nombre && campos.email && campos.asunto && campos.mensaje){
        formulario.reset();
        console.log("si estan los campos")
        document.querySelector(".input-message-error-p").classList.add("input-message-error-p-activo")

        setTimeout (()=>{
            document.querySelector(".input-message-error-p").classList.remove("input-message-error-p-activo")
        }, 5000)

        document.querySelectorAll(".input-container-correcto").forEach((icono)=>{
            icono.classList.remove("input-container-correcto")
        })
    }

})