const formEle = document.querySelector(".form");
const inputEle = document.querySelector(".input");
const ListEle = document.querySelector(".list");
/// getting th saved items list from local storage
let list = JSON.parse(localStorage.getItem("list"))|| [];
// console.log(list);

list.forEach(task => {
    ToDoList(task);
})
formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    ToDoList();
    UpdateLocalStorage();
})
function ToDoList(task) {
    let newTask = inputEle.value;
    if (task) {
        newTask = task.name;
    }
    const liEle = document.createElement("li");
    if (task && task.checked) {
        liEle.classList.add("checked");
    }
    liEle.innerHTML = newTask;
    ListEle.appendChild(liEle);
    inputEle.value = "";

    ////// Creating checked button
    const checkButtonEle = document.createElement("div");
    checkButtonEle.innerHTML = `<i class="fa-solid fa-square-check">`;
    liEle.appendChild(checkButtonEle);


    ////// Creating edit button
    const EditButtonEle = document.createElement("div");
    EditButtonEle.innerHTML = `<i class="fa-solid fa-pen-to-square">`;
    liEle.appendChild(EditButtonEle);

    ////// Creating Delete button
    const DeleteButtonEle = document.createElement("div");
    DeleteButtonEle.innerHTML = `<i class="fa-solid fa-trash">`;
    liEle.appendChild(DeleteButtonEle);


    checkButtonEle.addEventListener("click", () => {
        liEle.classList.toggle("checked");
        UpdateLocalStorage();
    })

    EditButtonEle.addEventListener("click", () => {
        liEle.remove();
        inputEle.value = liEle.innerText;
        UpdateLocalStorage();
    })

    DeleteButtonEle.addEventListener("click", () => {
        liEle.remove();
        UpdateLocalStorage();
    })
    UpdateLocalStorage();
}
// saving list items in local storage.
function UpdateLocalStorage() {
    const liEles = document.querySelectorAll("li");
    list = [];
    liEles.forEach(liEle => {
        list.push({
            name: liEle.innerText,
            checked: liEle.classList.contains("checked"),
        })

    });
    localStorage.setItem("list", JSON.stringify(list));
}