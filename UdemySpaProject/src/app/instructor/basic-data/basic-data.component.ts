import { CourseCategoryService } from './../../Services/course-category.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css'],
})
export class BasicDataComponent implements OnInit {
  constructor(private CourseCategoryService: CourseCategoryService) {}

  ngOnInit(): void {
    this.CreateCourseIntro();
    this.GetCategories();
  }

  GetCategories() {
    this.CourseCategoryService.GetCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.Categoeies = res.data;
      },
    });
  }
  selectedTabIndex: number = 0;

  Categoeies = [];
  CourseIntro: FormGroup;

  CreateCourseIntro() {
    this.CourseIntro = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Category: new FormControl('', [Validators.required]),
    });
  }

  GoPrevios() {
    if (this.selectedTabIndex == 0) return;
    this.selectedTabIndex--;
  }

  Continue() {
    if (this.selectedTabIndex == 1) return;
    this.selectedTabIndex++;
  }
}
