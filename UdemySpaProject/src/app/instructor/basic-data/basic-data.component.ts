import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css'],
})
export class BasicDataComponent implements OnInit {
  ngOnInit(): void {
    this.CreateCourseIntro();
  }
  selectedTabIndex: number = 0;

  Categoeies = [
    {
      Id: 1,
      Name: 'Development',
    },
    {
      Id: 2,
      Name: 'Programing',
    },
  ];
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
