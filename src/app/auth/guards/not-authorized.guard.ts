import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // Add your code here
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthorised) {
        return true;
    }
    this.router.navigate([`${route.root.url}${"/courses"}`]);

    return false;
  }
}
