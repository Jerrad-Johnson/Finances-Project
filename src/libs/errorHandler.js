export function errorHandler(message){
    if (document.querySelector(".errorMessage")) return;

    let body = document.querySelector("body");
    let errorElement = document.createElement("div");
    errorElement.setAttribute("class", "errorMessage");
    errorElement.innerText = message;
    body.append(errorElement);
    let appContainer = document.querySelector(".App");
    appContainer.style.opacity = "0.5"
    document.addEventListener("click", () => { handleErrorClick(errorElement, appContainer) }, {capture: false, once: true});
}

function handleErrorClick(errorElement, appContainer){
    errorElement.remove();
    appContainer.style.opacity = "1";
}