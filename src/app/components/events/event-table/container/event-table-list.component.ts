import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Event} from "../../../../models/event/event/event.module";
import {Subscription} from "rxjs";
import {EventService} from "../../../../services/event/event.service";
import {EventContextService} from "../../../../context/event/event-context.service";

@Component({
  selector: 'app-event-table-list',
  templateUrl: './event-table-list.component.html',
  styleUrls: ['./event-table-list.component.css']
})
export class EventTableListComponent implements OnInit, OnDestroy {
  @Input() forecastNum: string;

  @Output() alertDelete = new EventEmitter<boolean>();

  eventList: Event[];
  private subscriptions: Subscription[] = [];

  constructor(private service: EventService, private contextService: EventContextService) {
  }

  ngOnInit(): void {
    let subscription = this.contextService.getEventList().subscribe(data => this.eventList = data);
    let subscription1 = this.service.getEvents(this.forecastNum).subscribe(data => {
      this.contextService.updateEventList(data);
      console.log(this.eventList[0].type);
    });
    this.subscriptions.push(subscription);
    this.subscriptions.push(subscription1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  alertDeleteEvent(alert:boolean) {
    this.alertDelete.emit(alert);
  }
}
