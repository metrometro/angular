import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesShowingComponent } from './courses-showing.component';

const routes: Routes = [{ path: '', component: CoursesShowingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesShowingRoutingModule { }
