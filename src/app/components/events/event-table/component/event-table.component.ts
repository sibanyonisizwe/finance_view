import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from "../../../../models/event/event/event.module";
import {map, Subscription, switchMap} from "rxjs";
import {EventService} from "../../../../services/event/event.service";
import {EventContextService} from "../../../../context/event/event-context.service";

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {
  @Input() eventList: Event[];

  @Output() alertDelete = new EventEmitter<boolean>();

  @Input()forecastNum: string;

  private subscriptions: Subscription[] = [];

  displayStyles: {
    displayStyle: string;
    num: string;
  }[] = [];

  constructor(private eventService: EventService, private eventContext: EventContextService) {
  }

  ngOnInit(): void {
    this.generateDeleteModal();
  }

  generateDeleteModal() {
    this.eventService.getEvents(this.forecastNum).subscribe((events =>
        events.forEach(event => {
          this.displayStyles.push({
            displayStyle: "none",
            num: event.eventNum
          })
        })
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  deleteEvent(eventNum: string) {
    this.subscriptions.push(this.eventService.deleteEvent(eventNum).pipe(
      map(() => this.eventService.getEvents(this.forecastNum)),
      switchMap((eventsObs) => {
        return eventsObs;
      })
    ).subscribe(events => {
      this.eventContext.updateEventList(events);
      this.alertDelete.emit(true);
      this.closePopup(eventNum)
    }))
  }

  openPopup(eventNum: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === eventNum) {
        object.displayStyle = "block";
      }
    })
  }

  closePopup(num: string) {
    this.displayStyles.forEach((object) => {
      if (object.num === num) {
        object.displayStyle = "none";
      }
    })
  }
}
