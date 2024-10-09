function opensubTab(evt, subtabName){
    var i, tabcontent, tablinks;
    //Ocultar todas las sub pestañas
    tabcontent = document.getElementsByClassName("subtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].style.display === "block") {
            tabcontent[i].style.display = "none"; // Cerrar la pestaña visible
        }
    }

    // Eliminar la clase "active" de todos los botones de sub pestañas
    tablinks = document.getElementsByClassName("subtablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la nueva sub pestaña 
    document.getElementById(subtabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function opensubsubTab(evt, subsubtabName){
    var i, tabcontent, tablinks;
    //Ocultar todas las sub sub pestañas
    tabcontent = document.getElementsByClassName("subsubtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].style.display === "block") {
            tabcontent[i].style.display = "none"; // Cerrar la pestaña visible
        }
    }

    // Eliminar la clase "active" de todos los botones de sub sub pestañas
    tablinks = document.getElementsByClassName("subsubtablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la nueva sub sub pestaña 
    document.getElementById(subsubtabName).style.display = "block";
    evt.currentTarget.className += " active";
}