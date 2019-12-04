//  LISTA MIEMBROS 


var ListaPerUpVWP = [];
var ListaPerDownVWP = [];

// VAR INICIALES

const url = "https://api.propublica.org/congress/v1/113/house/members.json";

//FETCH

fetch(url,{
    method: "GET",
    headers: {
        'X-API-Key': 'ywKz0PzhvrV6I2eSNMqNQs46E6voyZ6JDDZaT2xq'
    }
})
.then(response => {
    if(response.ok) {
    return response.json()
    }
    throw new Error()
})
.then( data => {
    let members = data.results[0].members
    init(members)
})
.catch( error => console.log("Hay Error",error))


// FUNCION INICIALIZAR BASE DATOS

function init(array) {

    crearListaPerDownMVP(array);
    numRep(array);
    crearListaPerUpMVP(array);
    createPerVWP(array);

}