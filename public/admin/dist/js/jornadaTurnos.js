$(document).ready(function() {

    var mensajeAviso = "";
    $.get("/castraciones/getAviso/otros", function(data) {

        mensajeAviso = data.aviso;

    });



     $('.whatsap').on('click', function(e) {
        e.preventDefault();

        var _telefono = $(this).data('telefono').toString();
        var id = $(this).data('id');
        var nombre = $(this).data('nombre');
        var hora = $(this).data('hora');
        var fecha = $(this).data('fecha');
        var localidad = $(this).data('localidad');
        var observacion = $(this).data('observacion');
        var telefono = _telefono.slice(2, 10);

        // var _mensaje_si_modificar = 'Hola ' + nombre + ', su turno para la Jornada de Castracion en ' + localidad + ' ha sido recibido.\n *Si Ud. desea confirmarlo presione aquí* 👇 \n https://castraciones-2.appspot.com/castraciones/confirmarTurno/' + id +'\n\nOrganizacion Love Animals🐾\n\n*Mensaje automático, NO responder.*'

        var _mensaje_si_modificar = 'Hola ' + nombre + ', su petición de turno para la Jornada de Castracion en ' + localidad + ' ha sido recibida. \nPara conocer dirección, horario, cuidados previos, confirmar o cancelar el turno, *por favor RESPONDA "OK" a este mensaje automático y luego ingrese aquí.* 👇  \n\n https://castraciones-2.appspot.com/castraciones/confirmarTurno/' + id + '\n\nOrganizacion Love Animals🐾'

        var mensaje = encodeURIComponent(_mensaje_si_modificar);

        $.post("/castraciones/envioAviso", { idJornada: id },
            function(status) {
                console.log(status);
            });
        window.open('https://wa.me/5411' + telefono + '?text=' + mensaje, '_blank');
        location.reload();

    });

    $('.postoperatorio').on('click', function(e) {
        e.preventDefault();

        var veterinarioJornada = $(this).data('veterinarionombre');
        var veterinarioPuntos = "";
        var veterinarioMedicacion = "";
        console.log("nombre de vete " + veterinarioJornada);

        var _telefono = $(this).data('telefono').toString();
        var id = $(this).data('id');
        var nombre = $(this).data('nombre');
        var nombreMascota = $(this).data('mascota');
        var hora = $(this).data('hora');
        var fecha = $(this).data('fecha');
        var localidad = $(this).data('localidad');
        var observacion = $(this).data('observacion');
        var telefono = _telefono.slice(2, 10);

        if(nombreMascota === ''){
            nombreMascota = 'el animal';
        }

            $.post("/castraciones/veterinariosNombre", { nombre: veterinarioJornada},
                    function(status) {
                        veterinarioPuntos = status.puntos;
                        veterinarioMedicacion = status.antibiotico; 


                    // var _mensaje_si_modificar = 'Hola ' + nombre + ', su turno para la Jornada de Castracion en ' + localidad + ' ha sido recibido.\n *Si Ud. desea confirmarlo presione aquí* 👇 \n https://castraciones-2.appspot.com/castraciones/confirmarTurno/' + id +'\n\nOrganizacion Love Animals🐾\n\n*Mensaje automático, NO responder.*'

                    var urlPostoperatorio = "";
                    //console.log('-------------- Puntos ' + veterinarioPuntos + ' | ' + veterinarioMedicacion);
                    if (veterinarioPuntos == 0 && veterinarioMedicacion == 'NO') {
                        urlPostoperatorio = "postoperatorionormalSin.html";
                    }
                    else{
                        if(veterinarioPuntos == 0 && veterinarioMedicacion == 'SI'){
                            urlPostoperatorio = "postoperatorionormal.html";   
                        }
                        else{
                            if (veterinarioPuntos == 1 && veterinarioMedicacion == 'NO') {
                                urlPostoperatorio = "postoperatoriointraSin.html";   
                            }
                            else{
                                urlPostoperatorio = "postoperatoriointra.html";   
                            }
                        }
                        
                    }

                    var _mensaje_si_modificar = 'Gracias por confiar en nosotros. Por favor RESPONDA "OK" a este mensaje automático y luego ingrese aquí para ver los cuidados post-operatorios. 👇\n\n' + 'http://www.castraciones.com.ar/' + urlPostoperatorio + '\n\n*Nos gustaría que pasados los 4 días* nos indique como evoluciona '+ nombreMascota +', y si tiene alguna inquietud respecto al post operatorio con gusto despejaremos su consulta. \n\nOrganizacion Love Animals🐾'

                    var mensaje = encodeURIComponent(_mensaje_si_modificar);

                   /* $.post("/castraciones/envioAviso", { idJornada: id },
                        function(status) {
                            console.log(status);
                        });*/
                    window.open('https://wa.me/5411' + telefono + '?text=' + mensaje, '_blank');
                    location.reload(); 
            });



    });

    $('.otrosAvisos').on('click', function(e) {
        e.preventDefault();

        var _telefono = $(this).data('telefono').toString();
        var telefono = _telefono.slice(2, 10);
        var mensaje = encodeURIComponent(mensajeAviso);

        window.open('https://wa.me/5411' + telefono + '?text=' + mensaje, '_blank');
        location.reload();
    });

    $('.cancelar-turno').on('click', function(e) {
        e.preventDefault();
        
        let id = $(this).data('id');
        
        $.post("/castraciones/cancelarTurno", { idTurno: id, motivo: 'SISTEMA' },
            function(status) {
                     location.reload();   
        });
    });
});