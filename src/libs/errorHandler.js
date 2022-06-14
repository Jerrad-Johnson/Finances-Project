export function errorHandler(message){
    let x = document.createElement("div");
    x.setAttribute("class", "errorMessage");
    x.innerText = message;

    let y = document.createElement("button");
    y.innerText = "Close"
    y.setAttribute("onClick", `let temp = document.querySelector(".errorMessage"); temp.remove()`);

    x.append(y);

    let z = document.querySelector("body");

    z.append(x);
}

