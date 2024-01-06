import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private HttpClient: HttpClient) {}
  ComponentRedirection = new Subject<number>();
  CourseActionFire = new Subject<number>();

  EmitComponentNumber(ComponentNumber: number) {
    this.ComponentRedirection.next(ComponentNumber);
  }
  GetComponentNumber(): Subject<number> {
    return this.ComponentRedirection;
  }

  GetCourseFireAction() {
    return this.CourseActionFire.asObservable();
  }
  FireAction(numberofComponent: number) {
    return this.CourseActionFire.next(numberofComponent);
  }

  CreateBasicCourse(BasicCourse: any) {
    return this.HttpClient.post(
      'http://localhost:5227/api/Course/CreateBasicCourse',
      BasicCourse
    );
  }

  CreateCourseRequirments(Requirments: any) {
    return this.HttpClient.post(
      'http://localhost:5227/api/Course/CreateRequirmentCourse',
      Requirments
    );
  }

  GetCourseDetails(Id: any) {
    return this.HttpClient.get(
      `http://localhost:5227/api/Course/GetCourseDetails?Id=${Id}`
    );
  }
}
export class FormData {
  Data: any;
}
