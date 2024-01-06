import { formatDate } from '@angular/common';
import { CourseService, FormData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courseheader',
  templateUrl: './courseheader.component.html',
  styleUrls: ['./courseheader.component.css'],
})
export class CourseheaderComponent implements OnInit {
  constructor(
    private CourseService: CourseService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  CourseId: any;
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe({
      next: (data: any) => {
        this.CourseId = +data.get('Id');
      },
    });
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
    let prerequisiteDTO = {
      id: this.CourseId,
      requiments: this.FormData.Requiments,
      whateYouLearnFromCourse: this.FormData.WhateYouLearnFromCourse,
      whoIsCourseFor: this.FormData.WhoIsCourseFor,
    };
    this.CourseService.CreateCourseRequirments(prerequisiteDTO).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
