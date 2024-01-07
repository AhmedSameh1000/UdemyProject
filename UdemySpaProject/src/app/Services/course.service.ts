import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private HttpClient: HttpClient) {
    this.FiredData = new Subject<FormData>(); // Initialize FiredData here
  }

  ComponentRedirection = new Subject<number>();
  CourseActionFire = new Subject<void>();
  FiredData: Subject<FormData>; // Initialized in the constructor

  EmitComponentNumber(ComponentNumber: number) {
    this.ComponentRedirection.next(ComponentNumber);
  }

  GetComponentNumber(): Subject<number> {
    return this.ComponentRedirection;
  }

  GetCourseFireAction() {
    return this.CourseActionFire.asObservable();
  }

  FireAction() {
    return this.CourseActionFire.next();
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

  SetFiredData(Data: FormData) {
    this.FiredData.next(Data);
  }

  GetFiredData() {
    return this.FiredData.asObservable();
  }
}

export class FormData {
  Data: any;
  CourseId: number;
  numberObComponent: number;
  constructor() {}
}
