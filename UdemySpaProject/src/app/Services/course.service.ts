import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private HttpClient: HttpClient) {
    this.FiredData = new Subject<MyData>(); // Initialize FiredData here
  }

  ComponentRedirection = new Subject<number>();
  CourseActionFire = new Subject<void>();
  FiredData: Subject<MyData>; // Initialized in the constructor

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
  SaveCourseLandingPage(CourseLandingPage: any) {
    return this.HttpClient.post(
      'http://localhost:5227/api/Course/SaveCourseLanding',
      CourseLandingPage
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

  SetFiredData(Data: MyData) {
    this.FiredData.next(Data);
  }

  GetFiredData() {
    return this.FiredData.asObservable();
  }
}

export class MyData {
  Data: any;
  CourseId: number;
  numberObComponent: number;
  constructor() {}
}
