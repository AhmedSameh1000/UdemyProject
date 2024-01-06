import { CourseService, FormData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courserequirment',
  templateUrl: './courserequirment.component.html',
  styleUrls: ['./courserequirment.component.css'],
})
export class CourserequirmentComponent implements OnInit {
  constructor(
    private CourseService: CourseService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.CreateCoursePrerequisiteForm();
    this.OnFormValueChanges();
    this.GetCoursId();
    this.LoadCourses();
  }

  CourseId: any;
  GetCoursId() {
    this.ActivatedRoute.paramMap.subscribe({
      next: (data: any) => {
        this.CourseId = +data.get('Id');
      },
    });
  }
  LoadCourses() {
    this.CourseService.GetCourseDetails(this.CourseId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.SetValuesToFormControl(res.data.requirments, 'Requiments');
        this.SetValuesToFormControl(
          res.data.whateWillYouLearnFromCourse,
          'WhateYouLearnFromCourse'
        );
        this.SetValuesToFormControl(
          res.data.whoIsThisCourseFor,
          'WhoIsCourseFor'
        );
      },
    });
  }

  SetValuesToFormControl(Values: any[], ArrayControls: string) {
    var FormArray = this.PrerequisiteForm.get(ArrayControls) as FormArray;
    var LengthOfArray = FormArray.length - 1;
    while (FormArray.length) {
      FormArray.removeAt(LengthOfArray--);
    }

    Values.forEach((arr) => {
      FormArray.insert(
        arr.id,
        new FormControl(arr.name, [Validators.required])
      );
      console.log(arr);
    });
  }

  OnFormValueChanges() {
    this.PrerequisiteForm.valueChanges.subscribe({
      next: (Value) => {
        var formData = new FormData();
        formData.Data = Value;
        formData.isNotValid = this.PrerequisiteForm.invalid;
        if (this.PrerequisiteForm.valid) {
          this.CourseService.EmitFormData(formData);
        }
      },
    });
  }
  PrerequisiteForm: FormGroup;

  CreateCoursePrerequisiteForm() {
    this.PrerequisiteForm = new FormGroup({
      WhateYouLearnFromCourse: new FormArray([
        new FormControl(null, [Validators.required]),
        new FormControl(null, [Validators.required]),
        new FormControl(null, [Validators.required]),
      ]),
      Requiments: new FormArray([new FormControl(null, [Validators.required])]),
      WhoIsCourseFor: new FormArray([
        new FormControl(null, [Validators.required]),
      ]),
    });
  }

  AddMoreToYourResponse(FormArrayName: string) {
    var FormArray = this.PrerequisiteForm.get(FormArrayName) as FormArray;

    if (FormArray.invalid) {
      return;
    }
    FormArray.push(new FormControl(null, [Validators.required]));
  }
}
