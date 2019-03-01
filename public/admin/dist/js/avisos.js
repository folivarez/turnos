$(document).ready(function() {


    $.get("/castraciones/getAviso/web", function(data) {
        $("#aviso").val(data.aviso);
        $("#aviso").attr('data-id', data._id);
        console.log(data._id);
        if (data.activo) {
            $('.webAviso').addClass('box-danger');
            $("#webAviso").html("<h3>Cartel Activo!</h3>");
            $('#activo').prop('checked', true);
        } else {
            console.log('desactivado');
            $("#webAviso").html("<h3>Cartel Desactivado</h3>");
            $('#activo').prop('checked', false);
        }
    });

    $.get("/castraciones/getAviso/otros", function(data) {
            $("#avisoOtros").val(data.aviso);
            $("#avisoOtros").attr('data-id', data._id);
            console.log(data._id);
        
    });


$("#editar_aviso").click(function(e) {
    e.preventDefault();

    var aviso_id = $("#aviso").data('id');
    var aviso = $("#aviso").val();
    var tipo = $(this).data('tipo');
    var activo = $(this).data('id');
    if ($('#activo').prop('checked')) {
        activo = true;
    }
    else{
        activo = false;
    }

    //console.log("48 horas");
    $.post("/castraciones/updateAviso", { id: aviso_id, aviso: aviso, activo: activo, tipo:tipo },
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
    $.post("/castraciones/updateAviso", { id: aviso_id, aviso: aviso, activo: activo, tipo:tipo },
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



});