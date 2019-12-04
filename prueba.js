var members = data.results[0].members; 


listState = ["All States"];

for( var i=0; i < members.length; i++)
{
    var estados = members[i].state.toString();

    if(!listState.includes(estados)){
        listState.push(estados);
    }
}


var selector = document.getElementById("estadoslist");

for ( var i=0; i < listState.length; i++)
{
    elm_option = document.createElement("option");
    elm_option.innerHTML = listState[i];

    selector.appendChild(elm_option);
    
}

selector.addEventListener("change",filterByState);

function filterByState () {

    var optionSelected = selector.options[selector.selectedIndex].value;

    if( optionSelected == "All States")
    {
        let filterMembersByState = members;

        
        console.log(optionSelected);
        console.log(filterMembersByState);
    }
    else{
        let filterMembersByState = members.filter( member =>  member.state == optionSelected);
        console.log(optionSelected);
        console.log(filterMembersByState);
    }    

}







    
    




    


console.log(listState);


console.log(members)



