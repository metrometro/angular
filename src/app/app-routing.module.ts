import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "courses" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./pages/registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./pages/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/add",
    loadChildren: () =>
      import("./pages/courses-adding/courses-adding.module").then(
        (m) => m.CoursesAddingModule
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "courses/:id",
    loadChildren: () =>
      import("./pages/courses-showing/courses-showing.module").then(
        (m) => m.CoursesShowingModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    loadChildren: () =>
      import("./pages/courses-editing/courses-editing.module").then(
        (m) => m.CoursesEditingModule
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "**",
    redirectTo: "courses",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
