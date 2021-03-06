var dia;

function mostrarDia(dia) {
    console.log('hoy es: ' + dia);
}


/* ---------------------------------------------------------------------- */
/*	LOADER
/* ---------------------------------------------------------------------- */
$(window).load(function() {
    "use strict";
    $("#loading").fadeOut("1000", function() {
        // Animation complete
        $('#loading img').css("display", "none");
        $('#loading').css("display", "none");
        $('#loading').css("background", "none");
        $('#loading').css("width", "0");
        $('#loading').css("height", "0");
        $('.animate').waypoint(function() {
            var animation = $(this).attr("data-animate");
            $(this).addClass(animation);
            $(this).addClass('animated');
        }, { offset: '95%' });

    });

});


$(document).on("click", ".fechaJornada", function() {
    var idJornada = $(this).data('id');
    var localidad = $(this).data('localidad');
    var direparcial = $(this).data('direparcial');
    var completa = $(this).data('completa');
    var observacion = $(this).data('observacion');
    var precio = $(this).data('precio');
    var fecha = $(this).data('turno');
    
   

    if (completa == "") {
        $("#myModal2").attr('data-id', idJornada);
        $("#fecha").html('Turno: <b>' + fecha + ' hs.</b>')
        $("#localidadJornada").html('Jornada: <b>' + localidad + '</b>')
        $(".precio").html('$' + precio);
        $("#direccionJornada").html('Zona: <b>' + direparcial + '</b>')
        if (typeof name !== "undefined") {
            $("#observacionJornada").html('<b>' + observacion + '</b>')
            $("#obser").html('<b>  ' + observacion + '</b>')
        }

    } else {
        $("#myModal2").modal('toggle');
        $('#myModalCompleto').modal('toggle');
    }
});


$(document).ready(function() {


    $( "#telefono" ).keyup(function() {  
        if($("#telefono").val().startsWith(0)){
            $(".form-group").addClass("has-error");
            $(".siguiente").attr("disabled",true);
            //$(".stepwizard-step").hide();
        }
        else{
            $(".form-group").removeClass("has-error");
            $(".siguiente").removeAttr("disabled");
            //$(".stepwizard-step").show();
        }
    });




    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='email'],input[type='url'],input[type='number']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }



        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
        $(".error-label").empty();
    });

    $('div.setup-panel div a.btn-primary').trigger('click');



    //reservar turno
    $("#submit").click(function(e) {
        e.preventDefault();

        var idJornada = $("#myModal2").data('id');

        var nombre = $("#nombre").val();
        var telefono = $("#telefono").val();
        var email = '';
        var dni = $("#dni").val();

        var tipo = $("#tipo").val();
        var peso = $("#peso").val();
        var nombreMascota = $("#nombreMascota").val();
        var cantidad = $("#cantidad").val();
        var preniado;
        if ($('#preniado').is(":checked")) {
            preniado = 1;
        } else {
            preniado = 0;
        }
        var aviso = 0;
        var confirmado = $("#confirmado").val();
        var asistio = $("#asistio").val();
        var reserva = new Date();

        //console.log("mail1 " + email + " - jornada " + idJornada);

        if (nombre == '' || telefono == '' || dni == '' || peso == 'Seleccione Peso Aprox.' || telefono == '' || tipo == 'Seleccione Animal') {
            console.log('no entre');
            alert("Todos los campos son requeridos! ");

        } else {


            $.post("/castraciones/turno", { nombre: nombre, telefono: telefono, mail: email, dni: dni, jornada: idJornada, tipo: tipo, peso: peso, nombreMascota: nombreMascota, cantidad: cantidad, aviso: aviso, preniado: preniado, confirmado: confirmado, asistio: asistio, reserva: reserva },
                function(status) {
                    console.log('status ' + status);
                    //console.log("mail2 " + email);
                    //location.reload();
                    if (status == 'guardando turno en database' ) {
                        $('#submit').addClass("ocultar");
                        $('.ocul').addClass("ocultar");
                        var success = '<span> 24 horas antes </span> del dia de la campaña enviaremos un mensaje automático por <span>Whatsapp</span> con las indicaciones y direccion del lugar. </p> <p>¡Muchas Gracias!</p>';

                        $('.error-message-2').hide();
                        $('.success-message-2').hide();
                        $('.ocultar').hide();
                        $('#contactform').hide();
                        $('#contactform input').val('');
                        $('#contactform textarea').val('');
                        $('.success-message-2').html('<div class="center negro success-message-2"><h3>SU TURNO FUE RESERVADO EXITOSAMENTE</h3><p>' + success + '</p></div>');
                        $('.success-message-2').fadeIn().delay(4000);
                    }
                    else{
                        $('#submit').addClass("ocultar");
                        $('.ocul').addClass("ocultar");
                        var success = '<span>' + status + '</span> Usted ya cuenta con un turno para esta Jornada. Entre <span>24 y 48 horas</span> antes del dia de la campaña de castración enviaremos un mensaje automático por <span>Whatsapp</span> con todas las indicaciones. </p> <p>¡Muchas Gracias!</p>';

                        $('.error-message-2').hide();
                        $('.success-message-2').hide();
                        $('.ocultar').hide();
                        $('#contactform').hide();
                        $('#contactform input').val('');
                        $('#contactform textarea').val('');
                        $('.success-message-2').html('<div class="center negro success-message-2"><h3>USTED YA TIENE UN TURNO</h3><p>' + success + '</p></div>');
                        $('.success-message-2').fadeIn().delay(4000);   
                    }
                    

                });

        }


    });


    $("#confirmaTurno").click(function(e) {
        e.preventDefault();

        var idTurno = $(".cancelaTurno").data('id');

        $.post("/castraciones/btnConfirmarTurno", { idTurno: idTurno },
            function(status) {

                if (status == "Turno Confirmado") {
                    console.log('Turno Confirmado');
                    location.reload();
                }

            });

    });

    $("#cancelar-turno").click(function(e) {
        e.preventDefault();

        var motivo = $("#motivo").val();

        // console.log(motivo)

        var idTurno = $(this).data('id');
        console.log('cancelo ' + idTurno);
        if (motivo == 'Seleccione Motivo') {
            
            alert("Seleccione un motivo por favor! ");
            return;
        }

         $.post("/castraciones/cancelarTurno", { idTurno: idTurno, motivo: motivo },
            function(status) {
                     location.reload();   
            });
        
    });


   

});