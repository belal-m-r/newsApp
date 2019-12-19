import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowToggleService {

  toggler : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  showGrid() {
    this.toggler.next(false);
  }

  showList() {
    this.toggler.next(true);
  }
}
