let usuario;
let tabla = document.getElementById("tabla")


const cargaSesion=()=>{
    usuario = JSON.parse(sessionStorage.getItem("tecnico-token"));
    console.log(usuario)
    // let datos = getDatos();
}

const cargainicial=()=>{
    cargaSesion();
    fetch("http://localhost:3000/sanitaria/cassette/", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "tecnico-token": usuario.token, 
        },
       
    })
        .then((resp) => {
            return resp.json()
        })
        .then((respJSON) => {
            let fragment = document.createDocumentFragment();
            console.log(respJSON);
            respJSON.forEach(cassette => {
               
                let tbody = document.createElement("TBODY");
                let tr = document.createElement("TR");
                let tdfecha = document.createElement("TD")
                tdfecha.textContent=cassette.fecha_cassette
                let tdcar = document.createElement("TD")
                tdcar.textContent = cassette.caracteristicas_cassette
                let tdorg = document.createElement("TD")
                tdorg.textContent = cassette.organo_cassette
                let button = document.createElement("BUTTON")
                button.type="button"
                button.className="btn btn-info m-3"
                button.textContent="Detalles"

                //<button type="button" class="btn btn-info">Info</button>

                tr.appendChild(tdfecha)
                tr.appendChild(tdcar)
                tr.appendChild(tdorg)
                tr.appendChild(button)
              
                tbody.appendChild(tr);
                fragment.appendChild(tbody);

            });
            tabla.appendChild(fragment)
            //   respJSON.map((elemento) => {

            // 	if (elemento.email && elemento.password) {

        })


        .catch(error => console.log(error));

}


document.addEventListener("DOMContentLoaded", cargainicial)