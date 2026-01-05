import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../../models/event/event/event.module";

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http:HttpClient) { }

  createEvent(event:Event,forecastNum:string){
    console.log(event);
    console.log(forecastNum);
    return this.http.post<Event>("http://localhost:8080/api/events/save",event,{params:{forecastNum:forecastNum}});
  }

  getEvent(eventNum:string){
    return this.http.get<Event>("http://localhost:8080/api/events/"+eventNum);
  }

  updateEvent(event:Event){
    return this.http.put<Event>("http://localhost:8080/api/events/update",event);
  }

  deleteEvent(eventNum:string){
    return this.http.delete<Event>("http://localhost:8080/api/events/delete",{params:{eventNum:eventNum}});
  }

  getEvents(forecastNum:string){
    return this.http.get<Event[]>("http://localhost:8080/api/events/eventList/"+forecastNum);
  }
}
