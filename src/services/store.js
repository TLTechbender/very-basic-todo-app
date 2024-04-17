 export function tasks(){
    return JSON.parse(localStorage.getItem("tasks") || "[]");
 }
 
 export function update (updatedTasks){
   return localStorage.setItem("tasks", JSON.stringify(updatedTasks));
 }

 