import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "@core/type/event.type";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public event!: Event;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    // Resolver
    this.event = this.route.snapshot.data["event"];
  }
}
