
import {EventType} from "./event-type";

export interface Event {
  type: EventType;
  eventNum:string;
  amount:number;
  term:number;
}
