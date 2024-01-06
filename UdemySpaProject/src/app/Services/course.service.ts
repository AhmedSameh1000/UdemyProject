import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private HttpClient: HttpClient) {}
  ComponentRedirection = new Subject<number>();
  CourseData = new Subject<FormData>();

  EmitComponentNumber(ComponentNumber: number) {
    this.ComponentRedirection.next(ComponentNumber);
  }
  GetComponentNumber(): Subject<number> {
    return this.ComponentRedirection;
  }
  EmitFormData(FormData: FormData) {
    this.CourseData.next(FormData);
  }
  GetGetFormData(): Subject<FormData> {
    return this.CourseData;
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
  isNotValid: any;
  Data: any;
}
