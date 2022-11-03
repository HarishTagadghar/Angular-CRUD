import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class userService{
    users = new Subject<any>()

    isData = localStorage.getItem('user')
   
}