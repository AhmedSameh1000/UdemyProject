import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { CourseCategoryService } from 'src/app/Services/course-category.service';
import { CourseService, MyData } from 'src/app/Services/course.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit, OnDestroy {
  constructor(
    private CourseService: CourseService,
    private CourseCategoryService: CourseCategoryService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.CreateLandingForm();
    this.GetCoursId();
    this.SaveLandingpageData();
    this.GetCategories();
    this.Getlanguges();
  }
  ngOnDestroy(): void {
    this.Obs1.unsubscribe();
  }
  CourseId: any;
  GetCoursId() {
    this.ActivatedRoute.paramMap.subscribe({
      next: (data: any) => {
        this.CourseId = +data.get('Id');
        console.log(this.CourseId);
      },
    });
  }

  Obs1: any;
  SaveLandingpageData() {
    this.Obs1 = this.CourseService.GetCourseFireAction().subscribe({
      next: (res) => {
        var data = new MyData();
        data.Data = this.CreateFormDataForSaveCourse();
        data.CourseId = this.CourseId;
        data.numberObComponent = ComponentNumbers.landingpageComponentnumber;
        this.CourseService.SetFiredData(data);
      },
    });
  }

  CreateFormDataForSaveCourse(): FormData {
    let courseLandingDTO = new FormData();
    courseLandingDTO.append('CourseId', this.CourseId);
    courseLandingDTO.append('Title', this.landingForm.value.Title);
    courseLandingDTO.append('SubTitle', this.landingForm.value.Subtitle);
    courseLandingDTO.append('Description', this.landingForm.value.Decribtion);
    courseLandingDTO.append('LangugeId', this.landingForm.value.Languge);
    courseLandingDTO.append('CategoryId', this.landingForm.value.Category);
    courseLandingDTO.append(
      'Image',
      this.landingForm.value['Image'],
      this.landingForm.value['Image'].name
    );
    courseLandingDTO.append(
      'PromotionVideo',
      this.landingForm.get('PromotionVideo').value,
      this.landingForm.get('PromotionVideo').value?.name
    );
    return courseLandingDTO;
  }

  CreateLandingForm() {
    this.landingForm = new FormGroup({
      Title: new FormControl(null, [Validators.required]),
      Subtitle: new FormControl(null, [Validators.required]),
      Decribtion: new FormControl(null, [Validators.required]),
      Languge: new FormControl(null, [Validators.required]),
      Category: new FormControl(null, [Validators.required]),
      Image: new FormControl(null),
      PromotionVideo: new FormControl(null),
    });
  }
  SelectImage($event: any) {
    this.landingForm.get('Image')?.setValue($event.target.files[0]);
  }
  SelectVideo($event: any) {
    this.landingForm.get('PromotionVideo')?.setValue($event.target.files[0]);
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

  landingForm: FormGroup;
}
