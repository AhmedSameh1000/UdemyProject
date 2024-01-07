import { Injectable } from '@angular/core';
import { GeneralCourse } from './general-course';
import { FormData } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class LandingpageService implements GeneralCourse {
  constructor() {}
  SaveCourse(formdata: FormData) {
    console.log('in landing service');
    console.log(formdata);
  }
}
