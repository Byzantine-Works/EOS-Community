import React from 'react';



const Message = props => {


    const script = document.createElement("script");

    script.src = "https://form.jotform.com/jsform/83055085808158";
    script.async = true;
    console.log(script)
    let s = [];
    s.push(script);

    // console.log(document.getElementsByClassName("MessageBox").appendChild(script))


    return (
        <div className="MessageBox">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSercRxm2e9fGGti06PYgUFj42sN4LFOuG801rldzZ-sah7LmQ/viewform?embedded=true" width="640" height="945" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>                If you need custom test for your contracts please tell us how we can help you.<br/><br/>
                {/* <ul id="email">Your e-mail:  <input id="inputEmail" type="text" name="mail" style={{borderRadius:'5px'}}></input></ul><br/>
                <textarea id="message" name="comment" size="50" placeholder="Type your message here."></textarea><br/>
                <input id="send" type="submit" value="Send"></input>
            </form> */} */}
        </div>
    )

}

export default Message;
