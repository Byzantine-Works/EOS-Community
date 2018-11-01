import React from 'react';



const Message = props => {

    const send = () => {
        Email.send("vicfaucon@gmail.com",
        "vicfaucon@gmail.com",
"This is a subject",
"this is the body",
"smtp.yourisp.com",
"username",
"password");
    }
  
    return (
        <div className="MessageBox">
            <form id="form" action="" method="post" enctype="text/plain">
                If you need custom test for your contracts please tell us how we can help you.<br/><br/>
                <ul id="email">Your e-mail:  <input id="inputEmail" type="text" name="mail" style={{borderRadius:'5px'}}></input></ul><br/>
                <textarea id="message" name="comment" size="50" placeholder="Type your message here."></textarea><br/>
                <input id="send" type="submit" value="Send"></input>
            </form>
        </div>
    )

}

export default Message;
