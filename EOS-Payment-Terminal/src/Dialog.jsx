import React from 'react';

const Dialog = (props) => {

    const messageFalse = () => props.updateState(["message", false]);

    const successStyle = {
                        color: '#14466C',
                        background: 'white',
                        border: 'solid',
                        borderColor: '#14466C',
                        borderRadius: '10px',
                        borderWidth: '2px',
                        padding: '10px'

                    }

    const errorStyle =  {   
                         color: 'white',
                         background: '#14466C',
                         borderRadius: '10px',
                         padding: '10px'
                        }


    console.log(props);

    let message ={
        notScatterConnected: "We could not pair with your Scatter account. Please ensure that the Scatter desktop application or web extension is signed in before trying again.",
        authRefused: "We could not pair with your Scatter account. Please ensure that the Scatter desktop application or web extension is signed in before trying again.",
        transacRefused: "We were not able to perform the transaction. Please ensure that every field is filled properly.",
        transacDenied: "The transaction has been denied.",
        transacSuccess: "Your transaction was executed successfully. Check its status.",
        cpuExceeded: "You exeeded your CPU usage limit. Please wait few minutes before trying again.",
        missingField: "Please make sure that all the fields are filled.",
        mustPositive: "The transaction has not been performed. The amount must be greater than 0."}

    return (
    <div className="Dialog" style={props.message === "transacSuccess" ? successStyle : errorStyle} >
        <p>{message[props.message] ? message[props.message] : "The transaction has not been performed: " + props.message+"."}</p>
        <button onClick={messageFalse}>OK</button>
        
    </div>
    )

}

export default Dialog;