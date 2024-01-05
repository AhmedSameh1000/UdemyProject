import { CourseService, FormData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-courserequirment',
  templateUrl: './courserequirment.component.html',
  styleUrls: ['./courserequirment.component.css'],
})
export class CourserequirmentComponent implements OnInit {
  constructor(private CourseService: CourseService) {}
  ngOnInit(): void {
    this.CreateCoursePrerequisiteForm();
    this.OnFormValueChanges();
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
