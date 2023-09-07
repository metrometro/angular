import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlTree } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    if (this.authService.isAuthorised) {
      return true;
    }
    const tree: UrlTree = this.router.parseUrl(route.path || "");
    this.router.navigate([`${tree.root.toString()}${"/login"}`]);

    return false;
  }
}
