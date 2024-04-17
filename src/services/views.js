import { tasks } from "./store";
import { checkCompleted,deleteTask, editTask } from "./taskApi";




export const rootView = `
<form action="" class="flex my-10px mx-auto fit-content px-8px py-8px border-round-50 ">
 <input class="border-none min-w-250 max-w-400 bg-another-shade-of-gray taskInput" type="text" placeholder="What do you need to do?">
 <button class="bg-light-blue outline-none border-none text-white addBtn">Add</button>
</form>
<div>
<ul class="flex taskHolder flex-column gap-15 my-10px min-w-250 max-w-400 mx-auto bg-another-shade-of-gray  border-round-50 padding-16px">
 
</ul>
<p class="clearBtn mx-auto fit-content text-orange">clear completed</p>
</div>


`;


export function welcomeMessage(){
    const welcome = document.querySelector('.welcome');
    const taskHolder = document.querySelector('.taskHolder');
    const clearBtn = document.querySelector('.clearBtn');
    const getTasks = tasks();
    //todo, this is a very wacky hack, comeback to refactor
   //update: can't get any better than this
   if(getTasks.length == 0){
     welcome.style.visibility = 'visible';
     taskHolder.style.display = 'none';
     clearBtn.style.visibility = 'hidden';
   
}else{
    welcome.style.visibility = 'hidden';
    taskHolder.style.display = 'flex';
    clearBtn.style.visibility = 'visible';
}



}

export function renderTask(task){

  if(task.completed == true){
    const li = document.createElement('div');
    li.innerHTML = `
    <li class="flex taskItem justify-between items-center my-10px border bottom-blue" data-todo-id = '${task.id}' data-updated = '${task.updatedAt}' data-completed = "${task.completed}">
    <span class="flex gap-15  items-center ${task.title}">
        <input data-todo="toggle" data-completed='${task.completed}' data-todo-id = '${task.id}' class="toggle" type="checkbox" checked>      
       <p class="taskInput strike" data-todo-id='${task.id}'>${task.body}</p>
      </span>
      <i class="fa-solid fa-trash text-orange deleteBtn" data-todo-id = '${task.id}'></i>
    </li>
       `;
   
    return li;
}
       else{
        const li = document.createElement('div');
        li.innerHTML =  `

        <li class="flex taskItem justify-between items-center my-10px border bottom-blue" data-todo-id = '${task.id}' data-updated = '${task.updatedAt}' data-completed = "${task.completed}">
        <span class="flex gap-15  items-center ${task.title}">
            <input data-todo="toggle" data-completed='${task.completed}' data-todo-id ='${task.id}' class="toggle ${task.updatedAt}" type="checkbox">      
           <p class="taskInput"  data-todo-id='${task.id}'>${task.body}</p>
          </span>
          <i class="fa-solid fa-trash text-orange deleteBtn" data-todo-id = '${task.id}'></i>
        </li>
        `;

                  return li;
       }
       
}

export function displayTask(renderedTask){

     renderedTask.querySelector('input').addEventListener('click',()=>{
               const completed = renderedTask.querySelector('input').dataset.completed;
               const id = renderedTask.querySelector('input').dataset.todoId;
               const completedStore = {completed,id};
               checkCompleted(completedStore);
    });

    renderedTask.querySelector('.deleteBtn').addEventListener('click',()=>{
         const whatToDelete = renderedTask.querySelector('.deleteBtn').dataset.todoId;
          deleteTask(whatToDelete);
         });

         renderedTask.querySelector('.taskItem').addEventListener('dblclick',()=>{
          const taskInput = renderedTask.querySelector('.taskInput');
          taskInput.addEventListener('dblclick',()=>{
            taskInput.contentEditable = 'true';
            const initial = taskInput.innerHTML;
                 
        
            taskInput.addEventListener('keypress', (e)=>{
                if(e.key == 'Enter'){
                    taskInput.contentEditable = 'false'
                    const edit = taskInput.innerHTML;
                    if(edit.length>0){
                    const id = taskInput.dataset.todoId;
                    const storeThem = {edit,id};
                    editTask(storeThem)
                    }else{
                      alert('wetin be this again');
                      taskInput.innerHTML = initial;
                    }

                }
            })
            });
                     });

                     /**
                      * A lot of query selectors yeah, it's just to make everything easier
                      * there was no other way
                      */
      
        const taskHolder = document.querySelector('.taskHolder');
     taskHolder.appendChild(renderedTask);
     }

export function deleteThemAll(newTaskList){
     const taskHolder = document.querySelector('.taskHolder');
     // as usual destroy before rendering
     taskHolder.innerHTML = '';
    newTaskList.forEach((newTask)=>{
        const renderedTask = renderTask(newTask);
       displayTask(renderedTask);
       
    
});



}

