var table = document.getElementById("tablaR");

const url = "https://api.propublica.org/congress/v1/113/house/members.json";

let members =[];


//FECTH

fetch(url,{
    method: "GET",
    headers: {
        'X-API-Key': 'ywKz0PzhvrV6I2eSNMqNQs46E6voyZ6JDDZaT2xq'
    }
})
.then(response => response.json())
.then( data => {
     members = data.results[0].members
    init(members)
})
.catch( error => console.log("Hay Error", error))

// FUNCION INICIALIZAR BASE DATOS

function init(array) {

  
    createListStates(array);
    quitLoader();
    crearRow(array);
    
    }


// TABLA MIEMBROS DEL CONGRESO

        // CREAR TABLA

        function crearRow (lista){    
        if(lista.length == 0){
            
            warningMessage = document.createElement("tr");

            warningMessage.append("*NO RESULTS MATCH YOUR SEARCH CRITERIA");

            table.appendChild(warningMessage);
        }
        else{
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
        
                
                elm_party = document.createElement("td");
                
                if(lista[i].party == "R")
                    {elm_party.innerHTML ="Republican"}
                else if(lista[i].party == "D")
                    {elm_party.innerHTML ="Democrat"}
                else if(lista[i].party == "I")
                    {elm_party.innerHTML ="Indepent"}
                
                elm_state = document.createElement("td");
                elm_state.innerHTML = lista[i].state;
                
                elm_seniority = document.createElement("td");
                elm_seniority.innerHTML = lista[i].seniority + " Years";
                
                elm_percentWP = document.createElement("td");
                elm_percentWP.innerHTML = lista[i].votes_with_party_pct +"%";
        
        
                
                row.append(elm_fullName, elm_fullName, elm_party, elm_state, elm_seniority, elm_percentWP);
        
                table.appendChild(row);
        
            }
            
        }
        }
        

        

// CHECKBOX

        var checkboxR = document.getElementById("republican");
        var checkboxD = document.getElementById("democrat");
        var checkboxI = document.getElementById("independent");

        var selector = document.getElementById("estadoslist");
    console.log(selector);

        checkboxR.addEventListener("click", function () {
            filterByState(members)
        });
        checkboxD.addEventListener("click", function () {
            filterByState(members)
        });
        checkboxI.addEventListener("click", function () {
            filterByState(members)
        });
        

        selector.addEventListener("change", function () {
            filterByState(members)
        });

        console.log(selector);


// CALCULAR NUMERO FRACCION


        

// FILTER BY STATE

function filterByState (array) {

    var optionSelected = selector.options[selector.selectedIndex].value;

    if( optionSelected == "All States")
    {
        check(array);
    }
    else{
        let filterMembersByState = array.filter( member =>  member.state == optionSelected);
        check(filterMembersByState);
    }    

}




// LISTA DE ESTADOS


function createListStates(array){
listState = [];

for( var i=0; i < array.length; i++)
{
    var estados = array[i].state.toString();

    if(!listState.includes(estados)){
        listState.push(estados);
    }
}

listState.sort();

for ( var i=0; i < listState.length; i++)
{
    elm_option = document.createElement("option");
    elm_option.innerHTML = listState[i];

    selector.appendChild(elm_option);
    
}

}


function check(filteredMembers) {

    

    let arrayParaPintar = filteredMembers.filter(member =>  checkboxR.checked &&  member.party == "R" || checkboxD.checked && member.party == "D" || checkboxI.checked && member.party == "I" || !checkboxR.checked && !checkboxD.checked && !checkboxI.checked);

    if(table.hasChildNodes())
        {
            table.innerHTML = "";
            crearRow(arrayParaPintar);
        }
    else{
        table.innerHTML = "";
        crearRow(arrayParaPintar);
    }
    
}



// //LOADER IMAGES

// window.addEventListener("load",function(){

// const loader = document.querySelector(".loader");
// loader.className += " hidden";

// });



    //OCULTAR LOADER

     function quitLoader() {

        var loadTime = document.getElementById("loader");
        loadTime.style.display = "none";
        
     }








