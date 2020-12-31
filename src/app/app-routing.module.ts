/**
 * This module is used to manage the navigation of the user and show the components according to the state of the application
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseCaseAComponent } from './components/UC-A/use-case-a.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path:'Home',
    component: UseCaseAComponent
  },
  // {
  //   path: 'logged',
  //   children: [
  //     // {
  //     //   path: 'applicationi-internet/students',
  //     //   component: StudentsContComponent
  //     // },
  //     // {
  //     //   path: 'applicationi-internet/vms',
  //     //   component: VmsContComponentComponent
  //     // }
  //   ]
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
