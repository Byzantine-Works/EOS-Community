import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';


const Ram = props => {
    const data = props.ram ? {
        datasets: [
          {
            label: 'used',  
            backgroundColor: 'rgb(0, 179, 0)',
            data: [props.ram.used/props.ram.max]
          },
        //   props.bill ? {
        //     label: 'Contract cost estimation',
        //     backgroundColor: 'red',
        //     borderColor: 'green',
        //     borderWidth: 1,
        //     data: [Object.keys(props.bill).map(x => {
        //       return props.bill[x].ram;
        //   }).reduce((a, b) => { a = a + b
        //   return a;})+props.contractSize]
        // } : null,
          {
            label: 'available',  
            backgroundColor: 'rgba(0, 179, 0, 0.4)',
            data: [props.ram.available/props.ram.max]
          }
        ]
      }: null;


    
    // let gradient = props.ram ? props.ram.usage / props.ram.quota : 0;


    // let Style = {
    //     display:'inline-block',
    //     borderLeftRadius: '15px',
    //     margin: 'auto 0',
    //     background: `brown`,
    //     height: '110%',
    //     width: `${gradient > 1 ? 100 : gradient * 100}%`
    // }

    // let StyleContainer = {
    //     transform: 'translateY(20%)',
    //     margin: '0 auto',
    //     borderRadius: '15px',
    //     border: 'solid',
    //     padding: '-5px',
    //     width: '50%',
    //     background: 'white',
    //     height: '10px',
    //     gridArea: 'j'
    // }

    let options = {
        tooltips: {
            yAlign: 'left',
            position: 'nearest',
            enabled: false,
            callbacks: {
                label: function(tooltipItems) { 
                    return data.datasets[tooltipItems.datasetIndex].label + ' :' + props.ram[data.datasets[tooltipItems.datasetIndex].label] + 'bytes';
                }
            }
    },
        legend: {
            display: false
        },
        title: {
            display: false
        },
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
        <div className="RamContainer">
        {props.ram ? <HorizontalBar data={data} options={options} height={20} /> : null}
            {/* RAM <div className="balContainer" key="balContainer" style={StyleContainer}><div style={Style} key="balanceVisual" id="balanceVisual"></div>{props.ram ? actions : null}</div> */}
        </div>
    )

}

export default Ram;
