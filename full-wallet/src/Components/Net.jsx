import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';


const Net = props => {

    const data = props.net ? {
        datasets: [
          {
            label: 'used',  
            backgroundColor: 'blue',
            borderColor: 'green',
            borderWidth: 1,
            data: [props.net.used/props.net.max]
          },
        //   props.bill ? {
        //     label: 'Contract cost estimation',
        //     backgroundColor: 'red',
        //     borderColor: 'green',
        //     borderWidth: 1,
        //     data: [Object.keys(props.bill).map(x => {
        //       return props.bill[x].net;
        //   }).reduce((a, b) => { a = a + b
        //   return a;})]
        // } : null,
          {
            label: 'available',  
            backgroundColor: 'rgba(0, 0, 189, 0.2)',
            borderWidth: 1,
            borderColor: 'green',
            data: [props.net.available/props.net.max]
           },
   
         ]
      } 
    : null;


    let options = {
        tooltips: {
                yAlign: 'left',
                position: 'nearest',
                enabled: true,
                callbacks: {
                    label: function(tooltipItems) { 
                        return data.datasets[tooltipItems.datasetIndex].label + ' :' + props.net[data.datasets[tooltipItems.datasetIndex].label] + 'bytes';
                    }
                }
        },
        legend: {
            display: false
        },
        title: {
            display: false
        },
        barThickness: '20px',
        data,
        scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false

                    }
                }],
                yAxes: [{
                    stacked: true,
                    barThickness: 20,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            }
        }



    return (
        <div className="NetContainer">
            {props.net ? <HorizontalBar data={data} options={options} height={20}/> : null}
            {/* Net <div key="balContainer" style={StyleContainer}><div style={Style} key="balanceVisual" id="balanceVisual"></div>{actions}</div> */}
        </div>
    )

}

export default Net;
