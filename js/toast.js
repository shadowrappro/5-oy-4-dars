export function toast(message) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const button = document.createElement("button");
    const span = document.createElement("span")

    span.style.cssText = `
        position: absolute;
        bottom: 0;
        height: 5px;
        width: 100%;
        background-color: purple;
        transition: width 0.1ms ease;
    `

    p.style.cssText = `
        margin-bottom: 10px;
    `

    button.style.cssText = `
        width: fit-content;
        cursor: pointer;
        top: 10px;
        right: 5px;
        margin-bottom: 20px;
        background-color: purple;
        color: white;
        border-radius: 8px;
        padding: 5px;
    `

    li.classList.add("toast-li")
    li.append(button, p, span)

    p.innerText = message;
    button.innerText = "x";

    button.addEventListener("click", (evt) => {
        evt.target.parentElement.remove()
    })

    setInterval(() => {
        const array = span.style.width.split("");
        array.pop();

        const num = Number(array.join(""))

        span.style.width = `${num - 1}%`;
    }, 30)

    setTimeout(() => {
        li.remove()
    }, 3000)

    const elToastContainer = document.getElementById("toastContainer")

    elToastContainer.appendChild(li)
}