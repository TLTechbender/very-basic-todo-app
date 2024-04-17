const app = document.querySelector('#app');
import {addTask} from "./src/services/taskApi";
import {tasks, update } from "./src/services/store";
import {deleteThemAll, displayTask, renderTask, rootView, welcomeMessage } from "./src/services/views";

app.innerHTML = rootView;


// prevent default form action
const form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
})



/**
 * check for todos, if empty it knows what do display to the dom
 */
welcomeMessage();


function check(){
const getTask = tasks();
getTask.forEach((gottenTask)=>{
const renderedTask = renderTask(gottenTask);
displayTask(renderedTask);
});
}

check(); //render all available tasks from the beginning of the file





const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', ()=>{
    const taskValue = taskInput.value.trim();
    if(taskValue.length == 0){
      alert('Todo is empty, add something jhoor')
     } else{
     addTask(taskValue);
    taskInput.value= '';
     }
});

/**
 * addBtn and taskInput basically do the same thing, add a new todo
 * most times I'm using task instead of todo, pardon the english
 *  
 */

const taskInput = document.querySelector('.taskInput');
taskInput.addEventListener('keypress', ()=>{

       switch (e.key) {
        case "Enter":
            const taskValue = taskInput.value.trim();
            if(taskValue.length == 0){
                alert('Todo is empty, add something jhoor');
               } else{
               addTask(taskValue);
              taskInput.value= '';
               }
          break;
      }
});





/**
 * Clear all tasks toggled as completed
 */
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click',()=>{

    /**
     * Kenbot gave me this idea, guess I was tryna implement it in the wrong way
     * by calling delete on each item 
     */
    let fetchTasks = tasks();
    let tracker = [];
     let unCompleted = fetchTasks.filter((fetchedTask) => fetchedTask.completed != true);
     tracker.push(...unCompleted);
     if(tracker.length > 0 ){
      update(tracker);
    deleteThemAll(tracker);
    tracker = [];
   }

   else{
    tracker = [];
    update(tracker);
    fetchTasks = tasks();
     const taskHolder = document.querySelector('.taskHolder');
    taskHolder.innerHTML = '';
    welcomeMessage();           
   }
  
});



 