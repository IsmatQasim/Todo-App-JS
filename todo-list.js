const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


const getTodoListFromLocal= () =>{
    return JSON.parse(localStorage.getItem("todoList"));
}

const addTodoListLocalStorage =(localTodoLists) =>{
    return localStorage.setItem("todoList", JSON.stringify(localTodoLists));
}

let localTodoLists = getTodoListFromLocal() || []; //defined here to prevent the the empty array everytime we entering the value

const addTodoDynamicElement =(curElem) =>{
    
    const divElement = document.createElement("div"); //create div element
    divElement.classList.add("main-todo-div");  //add class to div element
    divElement.innerHTML = `<li>${curElem}</li>
    <button class="deleteBtn"><i class="fa-solid fa-trash" style="color: #050505;"></i></button>`;
    mainTodoElem.append(divElement);    
}
const addTodoList = (e) =>{
    e.preventDefault(); //prevent submit event

    const todoListValue = inputValue.value.trim(); //remove white  spaces
    inputValue.value =''; //remove the input field after putting values.

     if(todoListValue !=='' && !localTodoLists.includes(todoListValue)){ // if cond for duplicate & empty strings
        localTodoLists.push(todoListValue); //push values to localTodoLists
        localTodoLists = [...new Set(localTodoLists)]; //created set for uniqueness
        console.log(localTodoLists);
        localStorage.setItem('todoList', JSON.stringify(localTodoLists)); //for saving in the localStorage & localStorage stored data in the form of string
        
        addTodoDynamicElement(todoListValue);
    }
    else if(todoListValue ===''){
        alert("Empty list! Kindly add some item")
    }
    else if(localTodoLists.includes(todoListValue)){
        alert("You have already added this item")
    }
}
const showTodoList = () =>{ // show the list after refreshing the page
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem);      
    });
}
showTodoList();

const removeTodoElem =(e) =>{
    const todoToRemove = e.target; //for targeting div
    let todoListContent = todoToRemove.previousElementSibling.innerText; //targeting list  element

    let parentElem = todoToRemove.parentElement; //
    console.log(todoListContent)

    // 
    localTodoLists =localTodoLists.filter((curTodo) => {
        return curTodo !== todoListContent.toLowerCase();
    })
    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();
}
mainTodoElem.addEventListener("click", (e) => { 
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")){ //delete
        removeTodoElem(e);
    }
}) 
document.querySelector('.btn').addEventListener("click", (e) =>{
    addTodoList(e);
})