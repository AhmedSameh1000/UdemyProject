import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}
  ComponentRedirection = new Subject<number>();

  EmitComponentNumber(ComponentNumber: number) {
    this.ComponentRedirection.next(ComponentNumber);
  }
  GetComponentNumber(): Subject<number> {
    return this.ComponentRedirection;
  }
}
