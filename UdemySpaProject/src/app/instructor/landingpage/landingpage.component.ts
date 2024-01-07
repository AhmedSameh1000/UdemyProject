import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { CourseCategoryService } from 'src/app/Services/course-category.service';
import { CourseService, FormData } from 'src/app/Services/course.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit, OnDestroy {
  constructor(
    private CourseService: CourseService,
    private CourseCategoryService: CourseCategoryService
  ) {}
  ngOnDestroy(): void {
    this.Obs1.unsubscribe();
  }
  ngOnInit(): void {
    this.CreateLandingForm();
    this.SaveLandingpageData();

    this.GetCategories();
    this.Getlanguges();
  }

  Categoris: any;
  GetCategories() {
    this.CourseCategoryService.GetCategories().subscribe({
      next: (res: any) => {
        this.Categoris = res.data;
      },
    });
  }
  languges: any;
  Getlanguges() {
    this.CourseCategoryService.Getlanguges().subscribe({
      next: (res: any) => {
        this.languges = res.data;
      },
    });
  }
  Obs1: any;
  SaveLandingpageData() {
    this.Obs1 = this.CourseService.GetCourseFireAction().subscribe({
      next: (res) => {
        var data = new FormData();
        data.Data = this.landingForm.value;
        data.CourseId = 1000;
        data.numberObComponent = ComponentNumbers.landingpageComponentnumber;
        this.CourseService.SetFiredData(data);
      },
    });
  }
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  landingForm: FormGroup;

  CreateLandingForm() {
    this.landingForm = new FormGroup({
      Title: new FormControl(null, [Validators.required]),
      Subtitle: new FormControl(null, [Validators.required]),
      Decribtion: new FormControl(null, [Validators.required]),
      Languge: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
    });
  }
}
