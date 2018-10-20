$(document).ready(function(){  

		$(".eliminar-jornada").click(function(e){
			e.preventDefault();

			var localidad = $(this).data('localidad');
			var idJornada = $(this).data('id');
			
			
			
			

			$("#modal-body-eliminar").html("<p>Usted va a eliminar la Jornada " + localidad + " !!!</p>");

			$(".confirma-eliminar").click(function(e){

				console.log("eliminando " + localidad);
				$("#modal-body-eliminar").html("<p>Eliminada</p>");
		

				$.ajax({
				    url: "./jornadas/" + idJornada + "/delete",
				    type: 'DELETE',
				    success: function(status) {
				    	console.log("status " + status);
				        if(status=="Deleted successfully!"){
							console.log('**********biennn');
							$('.modal-eliminar').modal('toggle');
							$(location).attr("href", "./admin");
						}
			   		}
				});

			});

			    			
		});

	


		$("#guardar-jornada").click(function(e){
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
			
			$.post("/castraciones/jornadas",{ localidad:localidad, fecha:fecha, direccion:direccion, direparcial:direparcial, precio:precio, cant_grupo: cant_grupo, hora_prox_turno: hora_prox_turno, cont:cont, activa:activa},
					   function(status) {
					   
					   location.reload();
			});	        			
		});



});


