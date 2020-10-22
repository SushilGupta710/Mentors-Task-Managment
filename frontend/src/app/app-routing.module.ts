import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'lists',
    pathMatch:'full'
  },
  {
    path:'new-list',
    component:ListViewComponent
  },
  {
    path:'lists',
    component:TaskViewComponent
  },
  {
    path:'lists/:listId',
    component:TaskViewComponent
  },
  {
    path:'lists/:listId/new-task',
    component:NewTaskComponent
  },
  {
    path:'edit-list/:listId',
    component:EditListComponent
  },
  {
    path:'lists/:listId/edit-task/:taskId',
    component:EditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
