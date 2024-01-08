import { CourseService, MyData } from 'src/app/Services/course.service';
import { Injectable } from '@angular/core';
import { GeneralCourse } from './general-course';

@Injectable({
  providedIn: 'root',
})
export class RequirmentService implements GeneralCourse {
  constructor(private CourseService: CourseService) {}
  SaveCourse(formdata: MyData) {
    let prerequisiteDTO = {
      id: formdata.CourseId,
      requiments: formdata.Data.Requiments,
      whateYouLearnFromCourse: formdata.Data.WhateYouLearnFromCourse,
      whoIsCourseFor: formdata.Data.WhoIsCourseFor,
    };
    this.CourseService.CreateCourseRequirments(prerequisiteDTO).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {},
    });
  }
}
