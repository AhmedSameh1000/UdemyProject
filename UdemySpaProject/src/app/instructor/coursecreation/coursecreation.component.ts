import { CourseService } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coursecreation',
  templateUrl: './coursecreation.component.html',
  styleUrls: ['./coursecreation.component.css'],
})
export class CoursecreationComponent implements OnInit {
  constructor(private CourseService: CourseService) {}
  ngOnInit(): void {
    this.CourseService.GetComponentNumber().subscribe({
      next: (res) => {
        this.SelectedComponent = res;
      },
    });
  }
  SelectedComponent: number = 1;
}
