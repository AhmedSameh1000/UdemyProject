import { CourseService } from 'src/app/Services/course.service';
import { Injectable } from '@angular/core';
import { GeneralCourse } from './general-course';
import { FormData } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class RequirmentService implements GeneralCourse {
  constructor(private CourseService: CourseService) {}
  SaveCourse(formdata: FormData) {
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
