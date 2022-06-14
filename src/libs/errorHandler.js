export function errorHandler(message){
    //alert(message);

    let buttonFunction = (() => {
       console.log(5);
    });

    let x = document.createElement("div");
    x.setAttribute("class", "errorMessage");
    x.innerText = message;

    let y = document.createElement("button");
    y.innerText = "Close"
    y.setAttribute("onClick", buttonFunction);

    x.append(y);

    let z = document.querySelector("body");

    z.append(x);



    //let y = (<div><button>${message}</button></div>);
    //console.log(y);

    console.log(x)

}


