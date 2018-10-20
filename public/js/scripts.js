var dia;

function mostrarDia(dia){
		console.log('hoy es: ' + dia);
}



function validateEmail(sEmail){
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
return true;
}
else {
return false;
}
}

/* ---------------------------------------------------------------------- */
/*	LOADER
/* ---------------------------------------------------------------------- */
$(window).load(function() {
	"use strict";
	$("#loading").fadeOut("1000", function() {
	// Animation complete
		$('#loading img').css("display","none");
		$('#loading').css("display","none");
		$('#loading').css("background","none");
		$('#loading').css("width","0");
		$('#loading').css("height","0");
		$('.animate').waypoint(function() {
			var animation = $(this).attr("data-animate");
			$(this).addClass(animation);
			$(this).addClass('animated');
		}, { offset: '95%' }); 
		
	});


});



	/* ---------------------------------------------------------------------- */
	/*	MAP HEIGHT & CANVAS
	/* ---------------------------------------------------------------------- */
	// function divHeight(){
	// 	var windowHeight = $(window).height();
	// 	var homepageHeight = $('#home').height();
		
	// 	if (windowHeight >= homepageHeight){
	// 		$('.home-content').css("height", (windowHeight));
	// 		$('.map-content').css("height", (windowHeight));
	// 		$('#canvas').css("height", (windowHeight));
	// 	} else{
	// 		$('.home-content').css("height", (homepageHeight+50));
	// 		$('.map-content').css("height", (homepageHeight+50));
	// 		$('#canvas').css("height", (homepageHeight+50));
	// 	}
	// }
	
	// divHeight();
	
	// $(window).resize(function() {
	// 	divHeight();
	// });
	
	/* ---------------------------------------------------------------------- */
	/*	DIV HOME POSITION
	/* ---------------------------------------------------------------------- */
	/*function homePosition(){
		var windowHeight = $(window).height();
		var homepageHeight = $('#home').height();
		
		if (windowHeight >= homepageHeight){
			$('#home').css("margin-top", ((windowHeight-homepageHeight))/2);
		} else {
			$('#home').css("margin-top", "0");
		}
	}
		
	homePosition();

	$(window).resize(function() {		
		homePosition()	
	});
	
	/* ---------------------------------------------------------------------- */
	/*  DIV CONTACTFORM POSITION
	/* ---------------------------------------------------------------------- */
	
/*
	function contactPosition(){
		var footerHeight = $('footer').height();
		var contactHeight = $('.contact').height();
		var windowtWidth = $(window).width();
		var mapContentHeight = $('.map-content').height();
		
		if (windowtWidth >= 478){
			var difference = mapContentHeight - footerHeight;
			$('.contact').css("margin-top", ((difference-contactHeight)/2));
		} else {
			$('.contact').css("margin-top", '0');
		}
	}
	
	contactPosition();
	
	$(window).resize(function() {
		contactPosition();
	});	
	
	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	if (windowWidth <= 480){
		$('.meet-us').css("height", (windowHeight-70));
	}*/
	
	/* ---------------------------------------------------------------------- */
	/*	SCROLL PAGE WITH EASING EFFECT
	/* ---------------------------------------------------------------------- */
	
  	/*
  	$('#link-map').bind('click', function(e) {
	    e.preventDefault();
	    var target = this.hash;
	    $.scrollTo(target, 750, {
	    	easing: 'swing',
	    	axis: 'y'
	    });
	});
	$('#home-top').bind('click', function(e) {
	    e.preventDefault();
	    $.scrollTo(0, 1250, {
	    	easing: 'swing',
	    	axis: 'y'
	    });
	});
  	*/
	
	
    /* ---------------------------------------------------------------------- */
	/*	CONTACT FORM
	/* ---------------------------------------------------------------------- 
    $('.success-message-2').hide();
    $('.error-message-2').hide();
    $('.success-message-3').hide();
    $('.error-message-3').hide();*/

   /*$("#submit").click(function() {
   	console.log('intentado mandar msj');
		var name = $("#name").val();
		var email = $("#email").val();
		$("#returnmessage").empty(); // To empty previous error/success message.
		// Checking for blank fields.
		if (name == '' || email == '' || contact == '') {
			alert("Please Fill Required Fields");
		} else {
			// Returns successful data submission message when the entered information is stored in database.
		$.post("php/contact.php", {
		name1: name,
		email1: email
		}, function(data) {
		$("#returnmessage").append(data); // Append returned message to message paragraph.
		if (data == "Your Query has been received, We will contact you soon.") {
		$("#form")[0].reset(); // To reset form fields on success.
		}
		});
		}
	});*/

$(document).on("click", ".fechaJornada", function () {
     var idJornada = $(this).data('id');
     $("#myModal2").attr('data-id', idJornada)
     // As pointed out in comments, 
     // it is superfluous to have to manually call the modal.
     // $('#addBookDialog').modal('show');
});

$(document).ready(function(){  

		$("#submit").click(function(e){
			e.preventDefault();

			var idJornada = $("#myModal2").data('id');
			
			var nombre = $("#nombre").val();
			var telefono = $("#telefono").val();
			var email = $("#email").val();
			var dni = $("#dni").val();
			
			var tipo = $("#tipo").val();
			var peso = $("#peso").val();
			var cantidad = $("#cantidad").val();
			var preniado;
			if ($('#preniado').is(":checked")){
			  preniado = 1;
			}
			else{
				preniado = 0;
			}
			var aviso = 0 ;
			var confirmado = $("#confirmado").val();
			var asistio = $("#asistio").val();	
			
			console.log("mail1 " + email + " - jornada " + idJornada);

			if(nombre==''||email==''||telefono==''|| dni==''|| peso=='Seleccione Peso Aprox.'|| telefono==''|| tipo == 'Seleccione Animal' || cantidad=='Cantidad de animales'){
			console.log('no entre');
		   	alert("Todos los campos son requeridos! "); 

			}
			else{


				$.post("/castraciones/turno",{ nombre:nombre, telefono:telefono,mail:email, dni:dni, jornada:idJornada, tipo:tipo,  peso:peso, cantidad:cantidad,aviso:aviso, preniado:preniado, confirmado:confirmado, asistio:asistio},
					   function(status) {
					   console.log("mail2 " + email);
					   //location.reload();
					   $('#submit').addClass("ocultar");
					   $('.ocul').addClass("ocultar");
						var success = 'Hemos recibido su mensaje. \n Verifique su casilla de mail para confirmar el turno.\n\n  Muchas Gracias!';
						   	
			            $('.error-message-2').hide();
	                    $('.success-message-2').hide();
	                    $('.ocultar').hide();
	                    $('#contactform').hide();
	                    $('#contactform input').val('');
	                    $('#contactform textarea').val('');
	                    $('.success-message-2').html('<div class="success-message-2">'+ success +'</div>');
	                    $('.success-message-2').fadeIn().delay(4000);

	                    console.log("mail3 " + email);                     
			                
						if(status=="success"){
							console.log('**********biennn');
						}
					
			});	

			}

			        			
		});
			

			//$("#returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
/*
		if(nombre==''||email==''||mensaje==''|| animal == 'Seleccione Animal'){
			console.log('no entre');
		   	alert("Complete los campos y seleccione su animal! "); 

		}
		else{

			if(validateEmail(email)){
					console.log('aca si entre');
					$('#submit').addClass("ocultar");
					var success = 'Su mensaje ha sido enviado. Aguarde la confirmacion del turno. Muchas Gracias!';

					$.post("php/contacto.php",{ nombre:nombre, email:email, telefono:telefono, jornada:jornada, animal:animal},
					   function(status) {
					   	
		            $('.error-message-2').hide();
                    $('.success-message-2').hide();
                    $('#contactform').hide().delay(3000).fadeIn();
                    $('#contactform input').val('');
                    $('#contactform textarea').val('');
                    $('.success-message-2').html('<div class="success-message-2">'+ success +'</div>');
                    $('.success-message-2').fadeIn().delay(2000);
		                
							if(status=="success"){
								console.log('**********biennn');
							}
					});
		         }
		         else{
		         	alert("Ingrese un E-mail valido");
		         }
		 
			}*/
});	





    
	/*var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		
	$contactform.submit(function(){
		
		
		$.ajax({
		   type: "POST",
		   url: "php/contacto.php",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND'){
					$('.error-message-2').hide();
                    $('.success-message-2').hide();
                    $contactform.hide().delay(3000).fadeIn();
                    $('#contactform input').val('');
                    $('#contactform textarea').val('');
                    $('.success-message-2').html('<div class="success-message-2">'+ $success +'</div>');
                    $('.success-message-2').fadeIn().delay(2000).fadeOut();
				}
				else{
					console.log('dio error');
					$('.success-message-2').hide();
                    $('.error-message-2').hide();
                    $('.error-message-2').html('<div class="error-message-2">'+ msg +'</div>');
                    $('.error-message-2').fadeIn().delay(3000).fadeOut();
				}
			}
		 });
		console.log('mandando msj ' + $(this).serialize());
		return false;

	});	*/
	
	/* ==============================================
    COUNTDOWN
    =============================================== */
	/*if ( $.fn.TimeCircles ) {
		countDownCircular();
		function countDownCircular() {
			$("#DateCountdown").TimeCircles({
			    "animation": "smooth",
			    "bg_width": 0.1,
			    "fg_width": 0.016666666666666666,
			    "circle_bg_color": "#fff",
			    "time": {
			        "Days": {
			            "text": "days",
			            "color": "#fff",
			            "show": true
			        },
			        "Hours": {
			            "text": "hours",
			            "color": "#fff",
			            "show": true
			        },
			        "Minutes": {
			            "text": "minutes",
			            "color": "#fff",
			            "show": true
			        },
			        "Seconds": {
			            "text": "seconds",
			            "color": "#fff",
			            "show": true
			        }
			    }
			});
		};
		$(window).resize(function() {		
			$("#DateCountdown").TimeCircles().rebuild();
		});
	}
	*/
	
	/* ---------------------------------------------------------------------- */
	/*  TOOLTIP
	/* ---------------------------------------------------------------------- */
	//$('.footer-social a').tooltip();	
			



