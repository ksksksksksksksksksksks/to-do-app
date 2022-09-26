import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [  
  // {
  //   path: 'todo-list',
  //   loadChildren: () => import('./components/todo-list/todo-list.module').then(m => m.TodoListModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
