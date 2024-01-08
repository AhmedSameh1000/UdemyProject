import { Injectable } from '@angular/core';
import { GeneralCourse } from './general-course';
import { CourseService, MyData } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class LandingpageService implements GeneralCourse {
  constructor(private CourseService: CourseService) {}
  SaveCourse(formdata: MyData) {
    console.log('in landing service');
    console.log(formdata);

    this.CourseService.SaveCourseLandingPage(formdata.Data).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
