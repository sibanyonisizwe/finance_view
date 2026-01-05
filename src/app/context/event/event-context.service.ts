import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Event} from "../../models/event/event/event.module";

@Injectable({
  providedIn: 'root'
})
export class EventContextService {
    events$ = new BehaviorSubject<Event[]>([]);
  constructor() { }

  getEventList(){
    return this.events$.asObservable();
  }

  updateEventList(eventList:Event[]){
    this.events$.next(eventList)
  }
}
