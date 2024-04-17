import { v4 as uuidv4 } from 'uuid';
import  { update,tasks } from './store';
import { displayTask, renderTask, welcomeMessage } from './views';



//todo this addTask function is too bulky and contains a lot of repetitive code, try to take care of that bro
export function addTask(content){

    const newTask = {
        title: 'newTask',
        body : content,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toISOString()

    }

let getTasks = tasks(); //If i don't let I cannot push
getTasks.push(newTask);
update(getTasks);
welcomeMessage();
const renderedTask = renderTask(newTask);
displayTask(renderedTask);
}




export  function deleteTask(identity){
    let getTasks = tasks(); // let so that I can mutate
  const deletedTask = getTasks.find((gottenTask) => gottenTask.id == identity);
  const index = getTasks.indexOf(deletedTask);
if (index > -1) { // only splice array when item is found
  getTasks.splice(index, 1); // 2nd parameter means remove one item only
}
update(getTasks);

//todo: come and polish this delete function, so many repeated code
//update: added some DRYness


 const taskHolder = document.querySelector('.taskHolder');
 taskHolder.innerHTML = '';

 //check to see if data is returned
  if(getTasks.length > 0){
    getTasks.forEach((gottenTask)=>{
        const renderedTask = renderTask(gottenTask);
       displayTask(renderedTask);
       });
}else{
    welcomeMessage();
}
}



export function editTask(editParams){
   let getTasks = tasks();
   const particularTask =  getTasks.find(gottenTask => gottenTask.id == editParams.id);
   if(particularTask){
    particularTask.body = editParams.edit;
    update(getTasks);
   const taskHolder = document.querySelector('.taskHolder');
   taskHolder.innerHTML = ''; //destroy before rerendering
    getTasks.forEach((gottenTask)=>{
    const renderedTask = renderTask(gottenTask);
    displayTask(renderedTask);
      
   });
   
   }
}


export function checkCompleted(completedStore){
   let getTasks = tasks();
  const particularTask =  getTasks.find(gottenTask => gottenTask.id == completedStore.id);
  const index = getTasks.indexOf(particularTask);
   
 if(particularTask){
      const taskHolder = document.querySelector('.taskHolder');
     const itemToStrikes = taskHolder.querySelectorAll('.taskInput');
     switch(particularTask.completed){
        case false:
          particularTask.completed = true;
        update(getTasks);
          itemToStrikes[index].classList.add('strike');       
          break;
        case true:
            particularTask.completed = false;
           
            update(getTasks);
           
            itemToStrikes[index].classList.remove('strike');
            //let it be on record that I tried to use the dumbest query selector ever
         //  console.log(document.querySelector(`.${particularTask.id}`).classList.remove('strike'));
             break;
       
      }
}
}

