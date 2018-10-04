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
    let buttons = props.message === "transacSuccess" ? 
    <div id="success"><button onClick={messageFalse} style={{display:'inline-block'}}>No thank you.</button><button style={{display:'inline-block'}}><a href={`https://eosflare.io/tx/${props.transactionID}`} target="_blank" rel="noopener noreferrer">Sure!</a></button></div>
    : <button onClick={messageFalse}>OK</button>;

    let message ={
        notScatterConnected: "We could not pair with your Scatter account. Please ensure that the Scatter desktop application or web extension is signed in before trying again.",
        authRefused: "We could not pair with your Scatter account. Please ensure that the Scatter desktop application or web extension is signed in before trying again.",
        transacRefused: "We were not able to perform the transaction. Please ensure that every field is filled properly.",
        transacSuccess: "Your transaction was executed successfully. Check its status." }

    return (
    <div className="Dialog" style={props.message === "transacSuccess" ? successStyle : errorStyle} >
        <p>{message[props.message]}</p>
        {buttons}
        
    </div>
    )

}

export default Dialog;