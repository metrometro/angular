import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@app/shared/shared.module";
import { CoursesEditingRoutingModule } from "./courses-editing-routing.module";
import { CoursesEditingComponent } from "./courses-editing.component";

@NgModule({
  declarations: [CoursesEditingComponent],
  imports: [CommonModule, CoursesEditingRoutingModule, SharedModule],
})
export class CoursesEditingModule {}
