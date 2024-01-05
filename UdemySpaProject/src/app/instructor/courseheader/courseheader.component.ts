import { formatDate } from '@angular/common';
import { CourseService, FormData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courseheader',
  templateUrl: './courseheader.component.html',
  styleUrls: ['./courseheader.component.css'],
})
export class CourseheaderComponent implements OnInit {
  constructor(private CourseService: CourseService) {}
  ngOnInit(): void {
    this.GetFormData();
  }
  IsNotValidToSave = true;
  FormData: any;
  GetFormData() {
    this.CourseService.GetGetFormData().subscribe({
      next: (res) => {
        this.IsNotValidToSave = res.isNotValid;
        this.FormData = res.Data;
      },
    });
  }
  SaveCourseDetails() {
    console.log(this.FormData);
  }
}
