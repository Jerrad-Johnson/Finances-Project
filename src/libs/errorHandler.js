export function errorHandler(message){
    if (document.querySelector(".errorMessage")) return;

    let body = document.querySelector("body");
    let errorElement = document.createElement("div");
    errorElement.setAttribute("class", "errorMessage");
    errorElement.innerText = message;
    body.append(errorElement);

    body.addEventListener("click", () => { handleErrorClick(errorElement) }, {capture: false, once: true});
}

export function handleErrorClick(errorElement){
    errorElement.remove();
}