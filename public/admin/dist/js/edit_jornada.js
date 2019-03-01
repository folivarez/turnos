$(document).ready(function() {


   $("#guardar-jornada").click(function(e) {
        e.preventDefault();
        console.log('**entre');
        var idJornada = $("#localidad").data('id');
        console.log('**entre ' + idJornada);
        var localidad = $("#localidad").val();
        var direccion = $("#direccion").val();
        var direparcial = $("#direparcial").val();
        var precio = $("#precio").val();
        var cant_grupo = $("#cant_grupo").val();
        var hora_prox_turno = $("#fecha-jornada").val();
        var veterinario = $("#veterinario").val();
        var observacion = $("#observacion").val();

        $.post("/castraciones/jornadas/updateAll", {id: idJornada, localidad: localidad, direccion: direccion, direparcial: direparcial, precio: precio, cant_grupo: cant_grupo, veterinario: veterinario, observacion: observacion },
            function(status) {

                
                window.location.replace("/castraciones/dashboard");
            });
    });





});