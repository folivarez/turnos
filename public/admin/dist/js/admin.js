$(document).ready(function() {


    /*Para que el menu no le saque responsive a la tabla*/
    $('.table-responsive').on('show.bs.dropdown', function() {
        $('.table-responsive').css("overflow", "inherit");
    });

    $('.table-responsive').on('hide.bs.dropdown', function() {
        $('.table-responsive').css("overflow", "auto");
    });

    $('.listaTurno').DataTable({
        "order": [
            [10, "asc"]
        ],
        "paging": false,
        "searching": false,
    });

    $('.listaTurnoMobile').DataTable({
        "order": [
            [4, "asc"]
        ],
        "paging": false,
        "searching": false,
    });

    $(".eliminar-jornada").click(function(e) {
        e.preventDefault();
        var localidad = $(this).data('localidad');
        var idJornada = $(this).data('id');

        $("#modal-body-eliminar").html("<p>Usted va a eliminar la Jornada " + localidad + " !!!</p>");
        $(".confirma-eliminar").click(function(e) {

            console.log("eliminando " + localidad);
            $("#modal-body-eliminar").html("<p>Eliminada</p>");

            $.ajax({
                url: "./jornadas/" + idJornada + "/delete",
                type: 'DELETE',
                success: function(status) {
                    console.log("status " + status);
                    if (status == "Deleted successfully!") {
                        console.log('**********biennn');
                        $('.modal-eliminar').modal('toggle');
                        $(location).attr("href", "./dashboard");
                    }
                }
            });
        });
    });

    $(".suspender-jornada").click(function(e) {
        e.preventDefault();

        var localidad = $(this).data('localidad');
        var idJornada = $(this).data('id');

        $("#modal-body-suspender").html("<p>Usted va a SUSPENDER la Jornada " + localidad + " !!!</p>");
        $(".confirma-suspender").click(function(e) {
            console.log("suspendiendo " + localidad);
            $("#modal-body-suspender").html("<p>Suspendida</p>");

            $.post("/castraciones/jornadas/update", { id: idJornada },
                function(status) {
                    if (status == "Suspendida successfully!") {
                        console.log('**********biennn');
                        $('.modal-suspender').modal('toggle');
                        $(location).attr("href", "./dashboard");
                    }
                });
        });
    });


    $(".bloquear-jornada").click(function(e) {
        e.preventDefault();

        var localidad = $(this).data('localidad');
        var idJornada = $(this).data('id');

        $("#modal-body-bloquear").html("<p>Usted va a BLOQUEAR la Jornada " + localidad + " !!!</p>");
        $(".confirma-bloquear").click(function(e) {

            console.log("bloqueando " + localidad);
            $("#modal-body-suspender").html("<p>Bloqueada</p>");


            $.post("/castraciones/jornadas/completa", { id: idJornada },
                function(status) {
                    if (status == "Bloqueada successfully!") {
                        console.log('**********biennn');
                        $('.modal-bloquear').modal('toggle');
                        $(location).attr("href", "./dashboard");
                    }
                });
        });
    });

    $("#guardar-jornada").click(function(e) {
        e.preventDefault();
        console.log('**entre');

        var localidad = $("#localidad").val();
        var fecha = $("#fecha-jornada").val();
        var direccion = $("#direccion").val();
        var direparcial = $("#direparcial").val();
        var precio = $("#precio").val();
        var cant_grupo = $("#cant_grupo").val();
        var cont = 1;
        var activa = $("#activa").val();
        var hora_prox_turno = $("#fecha-jornada").val();
        var completa = "";
        var veterinario = $("#veterinario").val();
        var observacion = $("#observacion").val();

        $.post("/castraciones/jornadas", { localidad: localidad, fecha: fecha, direccion: direccion, direparcial: direparcial, precio: precio, cant_grupo: cant_grupo, hora_prox_turno: hora_prox_turno, cont: cont, activa: activa, completa: completa, veterinario: veterinario, observacion: observacion },
            function(status) {

                location.reload();
            });
    });


    $('.btn-filter').on('click', function() {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
            $('.table tr[data-status="no"]').fadeIn('slow');

        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });


});


$(document).on("click", ".estadoPersona", function(e) {
    e.preventDefault();
    var idTurno = $(this).data('id');
    var estado = $(this).data('estado');
    
    console.log('estadoPersona ' + estado);
    if (estado == 'presente') {
        $(this).html('Presente');
        $(this).data('estado','ausente');
        $(this).addClass( "presente" );
        //$(this).removeAttr( "data-estado" );
        //$(this).attr('data-estado', 'ausente');
    } else {
        estadoPersona = 1;
        $(this).html('Ausente');
        $(this).data('estado','presente');
        $(this).removeClass( "presente" );
        //$(this).removeAttr( "data-estado" );
        //$(this).attr('data-estado', 'presente');
        //location.reload();
    }

    //$(this).html('Presente');


    $.post("/castraciones/presente", { idTurno: idTurno, estado: estado },
        function(status) {
            console.log(status);
        });
});

$(document).on("click", ".estadoPersonaMobile", function(e) {
    e.preventDefault();
    var idTurno = $(this).data('id');
    var estado = $(this).data('estado');
    
    console.log('estadoPersona ' + estado);
    if (estado == 'presente') {
        $(this).html('<i class="fas fa-toggle-off fa-2x"></i>');
        $(this).data('estado','ausente');
        $(this).addClass( "presente" );
        //$(this).removeAttr( "data-estado" );
        //$(this).attr('data-estado', 'ausente');

    } else {
        estadoPersona = 1;
        $(this).html('<i class="fas fa-toggle-on fa-2x"></i>');
        $(this).data('estado','presente');
        $(this).removeClass( "presente" );
        //$(this).removeAttr( "data-estado" );
        //$(this).attr('data-estado', 'presente');
        //location.reload();
    }

    //$(this).html('Presente');


    $.post("/castraciones/presente", { idTurno: idTurno, estado: estado },
        function(status) {
            console.log(status);
        });
});