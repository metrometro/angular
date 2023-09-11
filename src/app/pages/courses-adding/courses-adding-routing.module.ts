import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesAddingComponent } from './courses-adding.component';

const routes: Routes = [{ path: '', component: CoursesAddingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesAddingRoutingModule { }
