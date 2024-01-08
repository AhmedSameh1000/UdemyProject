import { MyData } from './course.service';
import { GeneralCourse } from './general-course';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements GeneralCourse {
  constructor() {}
  SaveCourse(formdata: MyData) {
    console.log('In Mesage Service');
    console.log(formdata);
  }
}
