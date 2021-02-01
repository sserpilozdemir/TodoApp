const form            = document.querySelector("#todo-form");
 
const todoInput       = document.querySelector("#todo");

const todoList        = document.querySelector(".list-group");

const firstCardBody   =  document.querySelectorAll(".card-body")[0];

const secondCardBody  = document.querySelectorAll(".card-body")[1];

var filter            = document.querySelector("#filter");

const clearButton     = document.querySelector("#clear-todos");

//submit event 


eventListeners();

function eventListeners(){   //all eventListeners

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);


}

function clearAllTodos(e) {
    // removing todos from GUI

    if (confirm(" Are you sure that you delete all todos ?")) {

        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
}




function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {

        const text = listItem.textContent.toLowerCase();

        if( text.indexOf(filterValue) === -1) { // -1 means that "not found "

            listItem.setAttribute( "style", "display : none !important");
            
        }
        else {

            listItem.setAttribute("style", "display : block")
        }






    });

}




function deleteTodo(e) {

    if (e.target.className === "fa fa-remove") {        
        
        e.target.parentElement.parentElement.remove();

        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success", "Removed Successfully!")


    }

}

function deleteTodoFromStorage(deletetodo) {

    let todos = getTodosFromStorage();

    
    todos.forEach(function(todo, index){

        if (todo === deletetodo) {

            todos.splice(index,1);     //removing an item from array
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}


// usage the global function => getTodosFromStorage
function loadAllTodosToUI() {

    let todos = getTodosFromStorage();

    todos.forEach(function(todo) {

        addTodoUI(todo);
    })



}

function addTodo(e){
    const newTodo = todoInput.value.trim();   //trim deletes all gap left and right side of input


    if(newTodo === "") {

        showAlert("danger", "Please write a todo...");

    }
    else{
        addTodoUI(newTodo);

        addTodoToStorage(newTodo);

        showAlert("success", "Todo is added succesfully !")
    }

    e.preventDefault();
}

// take all todos from storage

function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {

    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){

        alert.remove();

    },1000);
     

}
function addTodoUI(newTodo){

    //create link 
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML= "<i class = 'fa fa-remove'></i>";


    listItem.className = "list-group-item d-flex justify-content-between";

    //add text node 
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    //add list-item to todo list
    todoList.appendChild(listItem);
    todoInput.value = "";

}

