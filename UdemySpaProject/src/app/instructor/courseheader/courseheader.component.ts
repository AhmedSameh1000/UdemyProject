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
  constructor(private CourseService: CourseService) {}
  CourseId: any;
  NumberOfComponent: number;
  ngOnInit(): void {}

  FireActionSaveClick() {
    this.CourseService.FireAction(this.NumberOfComponent);
  }
}
