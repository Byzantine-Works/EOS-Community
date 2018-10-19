import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';


const Staking = props => {
    
    const data = props.staking ? {
        datasets: [
          {
            label: 'staked',  
            backgroundColor: 'blue',
            borderColor: 'green',
            borderWidth: 1,
            data: [props.staking.staked/(props.staking.unstaked+props.staking.staked)]
          },
          {
            label: 'unstaked',  
            backgroundColor: 'rgba(0, 0, 189,0.2)',
            borderWidth: 1,
            borderColor: 'green',
            data: [props.staking.unstaked/(props.staking.unstaked+props.staking.staked)]
          }
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
                    return data.datasets[tooltipItems.datasetIndex].label + ' :' + props.staking[data.datasets[tooltipItems.datasetIndex].label] + ' EOS';
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
                        drawBorder: false,
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
                        drawBorder: false,
                    }
                }]
            }
        }


    return (
        <div className="StakingContainer">
            {props.staking ? <HorizontalBar data={data} options={options} height={20}/> : null}
            {/* Staking <div key="balContainer" style={StyleContainer}><div style={Style} key="balanceVisual" id="balanceVisual"></div></div> */}
        </div>
    )

}

export default Staking;
