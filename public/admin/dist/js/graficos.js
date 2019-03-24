$(document).ready(function() {
var  jornada_cantidad = new Map();
var  localidades = [];
var  cantidades = [];
var e = ["Africa", "Asia", "Europe", "Latin America", "North America"];

    $.post("/castraciones/cantidadDeTurnos", function(data) { 

          data.turnosporjornada.forEach(element =>{
            jornada_cantidad.set(element._id,element.count);        
          });

          data.jornadas.forEach(element =>{                       
              for (var [clave, valor] of jornada_cantidad) {
                  if (clave == element._id ) {   
                      //jornada_cantidad.delete(clave);
                      //jornada_cantidad.set(element.localidad, valor);
                      localidades.push(element.localidad);
                      cantidades.push(valor);
                      
                      break;
                  }
              }        
          });

        console.log(localidades);
        console.log(cantidades);  
        console.log(data.start + ' - ' +  data.end); 



      new Chart(document.getElementById("bar-chart-horizontal"), {
          type: 'horizontalBar',
          data: {
            //labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            labels: localidades,
            datasets: [
              {
                label: "Cantidad",
                backgroundColor: "#3c8dbc",
                //data: [2478,5267,734,784,433]
                data: cantidades
              }
            ]
          },
          options: {
            legend: { display: true },
            title: {
              display: false,
              text: 'Cantidad de turnos por Localidades'
            },
            scales: {
            yAxes: [{
              barPercentage: 0.5,
              gridLines: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                zeroLineColor: "black",
                zeroLineWidth: 2
              },
              ticks: {
                min: 0,
                max: Math.max.apply(Math, cantidades),
                stepSize: 1
              },
              scaleLabel: {
                display: true,
                labelString: "Turnos"
              }
            }]
          },
          },
          
      });
    });

});