import { Injectable } from '@angular/core';
import { Task } from './modules/task.module';
import { WebrequestService } from './webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService:WebrequestService) { }

  createList(title:string){
    //we want to send a web request to create a list
    return this.webService.post("lists",{title});
  }
  createTasks(title:string,listsId:string){
    //we want to send a web request to create a task
    return this.webService.post(`lists/${listsId}/tasks`,{title});
  }
  
  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webService.delete(`lists/${id}`);
  }

  getLists(){
    return this.webService.get('lists');
  }
  getTasks(listId:string){
    return this.webService.get(`lists/${listId}/tasks`);
  }

  complete(task:Task){
    return this.webService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed:!task.completed
    })
  }
  

}
