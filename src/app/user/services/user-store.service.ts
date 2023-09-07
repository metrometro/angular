import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$: BehaviorSubject<string> = new BehaviorSubject("");
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  name$: Observable<string> = this.name$$.asObservable();
  isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      if (!res.successful) {
        return;
      }
      const user = res.result;
      this.isAdmin = user.role === "admin";
      this.name$$.next(user.name);
    });
  }

  get isAdmin() {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
