import { Injectable, Inject } from "@angular/core";

const TOKEN = "SESSION_TOKEN";

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {

  setToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    sessionStorage.removeItem(TOKEN);
  }
}
