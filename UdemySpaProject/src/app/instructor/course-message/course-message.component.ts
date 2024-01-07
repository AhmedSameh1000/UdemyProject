import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { CourseService, FormData } from './../../Services/course.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-message',
  templateUrl: './course-message.component.html',
  styleUrls: ['./course-message.component.css'],
})
export class CourseMessageComponent implements OnInit, OnDestroy {
  constructor(private CourseService: CourseService) {}
  ngOnDestroy(): void {
    this.Obs1.unsubscribe();
  }
  Obs1: any;
  ngOnInit(): void {
    this.Obs1 = this.CourseService.GetCourseFireAction().subscribe({
      next: (res) => {
        var data = new FormData();

        data.numberObComponent = ComponentNumbers.messageComponentnumber;
        this.CourseService.SetFiredData(data);
      },
    });
  }
}
