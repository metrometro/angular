import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesEditingComponent } from './courses-editing.component';

const routes: Routes = [{ path: '', component: CoursesEditingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesEditingRoutingModule { }
