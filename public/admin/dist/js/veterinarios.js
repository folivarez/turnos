$(document).ready(function() {



$("#guardar-veterinario").click(function(e) {
    e.preventDefault();

    
    var nombre = $("#nombre").val().trim();
    var adicional = $("#adicional").val().trim();
    var puntos = $("#puntos").val();
    var antibiotico = $("#antibiotico").val();

    console.log("datos a guardar " + nombre + ' - ' + adicional + ' - '  + puntos);
    $.post("/castraciones/veterinarios", { nombre: nombre, adicional: adicional, antibiotico:antibiotico, puntos: puntos, activo:1 },
        function(status) {
            
            console.log(status);
            location.reload();
        });
});

$(".eliminar-veterinario").click(function(e) {
    e.preventDefault();

    
    var id = $(this).data('id');
    console.log('eliminando ' + id);
    
   $.post("/castraciones/veterinarios/delete", { id: id },
        function(status) {
            
            console.log(status);
            location.reload();
        });
});



 

/*
$("#editar_otros_avisos").click(function(e) {
    e.preventDefault();

    var aviso_id = $("#aviso").data('id');
    var aviso = $("#avisoOtros").val();
    var tipo = $(this).data('tipo');
    var activo = 1;
    if ($('#activo').prop('checked')) {
        activo = true;
    }


    //console.log("48 horas");
    $.post("/castraciones/admin/updateAviso", { id: aviso_id, aviso: aviso, activo: activo, tipo:tipo },
        function(status) {
            if (status == 'aviso true') {
                $('.box').addClass('box-danger');
                $(".box-title").html("<h3>Cartel Activo!</h3>");
                $('#activo').prop('checked', true);
            } else {
                $('.box').removeClass('box-danger');
                $(".box-title").html("<h3>Cartel Desactivado</h3>");
                $('#activo').prop('checked', false);
            }
            console.log(status);
        });
});


*/
});