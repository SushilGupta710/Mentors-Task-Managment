import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/modules/task.module';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService:TaskService, private route:ActivatedRoute, private router : Router) { }

  listId:string;

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.listId = params['listId'];
        // console.log(this.listId)
      }
    )
  }

  createNewTask(title:string){
    this.taskService.createTasks(title,this.listId).subscribe((task:Task)=>{
      // console.log(task);
      // now here we have to navigate to /lists/response._id
      this.router.navigate(['../'],{relativeTo:this.route});
    }) 
  }

}
