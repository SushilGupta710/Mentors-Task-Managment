import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/modules/list.module';
import { Task } from 'src/app/modules/task.module';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  
  lists:List[]
  tasks:Task[]

  selectedListId: string
  
  constructor(private taskService:TaskService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        if(params.listId){
          this.selectedListId=params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks:Task[])=>{
          this.tasks=tasks;
        })
        }else{
          this.tasks = undefined;
        }
        // console.log(params)
      }
    )

    this.taskService.getLists().subscribe((lists:List[])=>{
      // console.log(lists);
      this.lists = lists;
    })
  }

  ontaskClick(task:Task){
    //set the task to completed
    this.taskService.complete(task).subscribe(()=>{
      console.log("completed successfully");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
     this.router.navigate(['/lists']);
      console.log(res);
    });
  }

  onTaskDeleteClick(id:string){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((res:any)=>{
      this.tasks=this.tasks.filter(val => val._id !== id);
       console.log(res);
     });
  }
}
