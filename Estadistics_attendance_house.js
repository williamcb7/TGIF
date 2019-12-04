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
    if(response.ok){
    return response.json();
    }
    throw new Error()
})
.then( data => {
    let members = data.results[0].members;
    init(members);
 })
.catch( error => {
     console.log("Hay Error", error);
})



// FUNCION INICIALIZAR BASE DATOS

function init(members) {
    
    crearListaPerUpMVP(members);
    crearListaPerDownMVP(members);
    crearNumOfRep(members);
    createPerVWP(members);
    quitLoader();
    
    }


// LISTA LEAST AND MOST LOYALTY

function crearListaPerUpMVP(array) {
    var ListaPerUpVWP = [];

    var numFrac = Math.round(array.length*0.1);

    for(var i=0; i < numFrac; i++)
     {   
         array.sort(function(a,b){return a.missed_votes_pct - b.missed_votes_pct});
         ListaPerUpVWP.push(array[i]);
     }
crearRowME(ListaPerUpVWP);    
    
}




//-- LEAST LOYALTY

 function crearListaPerDownMVP(array){
    var ListaPerDownVWP = [];

    var numFrac = Math.round(array.length*0.1);

    for(var i=0; i < numFrac; i++)
    {   
        array.sort(function(a,b){return b.missed_votes_pct - a.missed_votes_pct});
        ListaPerDownVWP.push(array[i]);
    }
    crearRowLE(ListaPerDownVWP)
}


// -- CREAR LISTAS

var tlb = document.getElementById("tLeastBody");
var tmb = document.getElementById("tMostBody");

function crearRowLE (lista){    

    for (var i=0; i < lista.length; i++)
        {
            row = document.createElement("tr");
            
            cn = [];
                
            elm_fullName = document.createElement("td"); 
    
            if(lista[i].middle_name == null){
                cn[i] = lista[i].first_name+" "+lista[i].last_name;
                
            }
            else{
                cn[i] = lista[i].first_name +" "+lista[i].middle_name+" "+lista[i].last_name;
            }

                a = document.createElement('a');
                linkText = document.createTextNode(cn[i]);
                a.appendChild(linkText);
                a.title = "urlMembers";
                a.href = lista[i].url;
                elm_fullName.appendChild(a);
           
           
           
            elm_numPV = document.createElement("td");
            elm_numPV.innerHTML = lista[i].missed_votes + " Votes";
            
            elm_perPV = document.createElement("td");
            elm_perPV.innerHTML = lista[i].missed_votes_pct +"%";
    
    
            
            row.append(elm_fullName, elm_numPV, elm_perPV);
    
            tlb.appendChild(row);
    
        }
        
    }

function crearRowME (lista){    

        for (var i=0; i < lista.length; i++)
            {
                row = document.createElement("tr");
                
                cn = [];
                    
                elm_fullName = document.createElement("td"); 
        
                if(lista[i].middle_name == null){
                    cn[i] = lista[i].first_name+" "+lista[i].last_name;
                    
                }
                else{
                    cn[i] = lista[i].first_name +" "+lista[i].middle_name+" "+lista[i].last_name;
                }
    
                    a = document.createElement('a');
                    linkText = document.createTextNode(cn[i]);
                    a.appendChild(linkText);
                    a.title = "urlMembers";
                    a.href = lista[i].url;
                    elm_fullName.appendChild(a);
               
               
               
                elm_numPV = document.createElement("td");
                elm_numPV.innerHTML = lista[i].missed_votes + " Votes";
                
                elm_perPV = document.createElement("td");
                elm_perPV.innerHTML = lista[i].missed_votes_pct +"%";
        
        
                
                row.append(elm_fullName, elm_numPV, elm_perPV);
        
                tmb.appendChild(row);
        
            }
            
    }



// SENATE AT A GLANCE

var nR = document.getElementById("nR");
var nD = document.getElementById("nD");
var nI = document.getElementById("nI");
var nT = document.getElementById("nT");
var perR = document.getElementById("perR");
var perD = document.getElementById("perD");
var perI = document.getElementById("perI");
var perT = document.getElementById("perT");

//NUMBER OF REPS

MemR = [];
MemD = [];
MemI = [];

function crearNumOfRep(array) {



    for ( var i=0; i < array.length; i++){

        if(array[i].party == "R"){
            MemR.push(array[i]);
        }
        else if(array[i].party == "D"){
            MemD.push(array[i]);
        }
        else if(array[i].party == "I"){
            MemI.push(array[i]);
        }

    }
    
}



// PERCENTAGE V/W PARTY



function createPerVWP(array) {

    perWPR = 0;
    perWPD = 0; 
    perWPI = 0;


    for ( var i=0; i < array.length; i++){
        if(array[i].party == "R"){
            perWPR = perWPR + (array[i].votes_with_party_pct/MemR.length);
        }
        else if(array[i].party == "D"){
            perWPD = perWPD + (array[i].votes_with_party_pct/MemD.length);
        }
        else if(array[i].party == "I"){
            perWPI = perWPI + (array[i].votes_with_party_pct/MemI.length);
        }

    }

    perWPT =((perWPR*MemR.length)+(perWPD*MemD.length)+(perWPI*MemI.length))/(MemR.length+MemD.length+MemI.length);


nR.innerHTML = MemR.length;
nD.innerHTML = MemD.length;
nI.innerHTML = MemI.length;
nT.innerHTML = MemR.length + MemD.length + MemI.length;
perR.innerHTML = perWPR.toFixed(2)+" %";
perD.innerHTML = perWPD.toFixed(2)+" %";
perI.innerHTML = perWPI.toFixed(2)+" %";
perT.innerHTML = perWPT.toFixed(2)+" %";
    
}








// //LOADER IMAGES

// window.addEventListener("load",function(){

//     const loader = document.querySelector(".loader");
//     loader.className += " hidden";
    
//     });



    //OCULTAR LOADER

    function quitLoader() {

        var loadTime = document.getElementById("loader");
        loadTime.style.display = "none";
        
     }

    





























