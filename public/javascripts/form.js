const remove = (x) => {
    x.getElementsByClassName('txt-label')[0].style.display = "none" ;
    var y = x.getElementsByClassName('txt')[0]
    y.style.display = 'block' ;
    y.contentEditable= true;
    y.spellcheck = false;
    y.focus();
    
}
const addIfNotEmpyt = (y) => {
    if (y.innerText === ""){
        y.previousElementSibling.style.display = "block" ;
        y.style.display = "none" ;
    }
} 

const send = () => {
    const reciver = document.getElementById("to-txt").innerText;
    // const sender  = document.getElementById("from-txt").innerText;
    const subject = document.getElementById("subject-txt").innerText;
    const message = document.getElementById("message-txt").innerText;
    fetch( 'http://localhost:3000/send' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            reciver:reciver , 
            // sender:sender , 
            subject:subject , 
            message:message 
        })
    })
    .then(data => {
        console.log('Success:', data);
        console.log(data.status);
        if ( data.status === 200 ){
            document.getElementById("result").innerText = "Mail sent successfully";
        } else {
            document.getElementById("result").innerText = "Failed to sent mail";
        }
    })
    .catch((error) => {
        console.error('Error:'+ error);
        document.getElementById("result").innerText = "Failed to sent mail";
    });
}