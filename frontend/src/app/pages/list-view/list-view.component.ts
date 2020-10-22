import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/modules/list.module';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  constructor(private taskService:TaskService, private router:Router) { }

  ngOnInit() {
  }

  createNewList(title:string){
    this.taskService.createList(title).subscribe((list:List)=>{
      // console.log(list);
      // now here we have to navigate to /lists/list._id
      this.router.navigate(['/lists',list._id]);
    }) 
  }
}
