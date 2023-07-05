import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {
  private eventSubject = new Subject<string>();

  emitEvent(event: string) {
    this.eventSubject.next(event);
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }
}