import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { CurriculmService } from 'src/app/Services/curriculm.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-curriculm',
  templateUrl: './curriculm.component.html',
  styleUrls: ['./curriculm.component.css'],
})
export class CurriculmComponent implements OnInit, OnDestroy {
  CurriculmForm: FormGroup;
  panelOpenState = false;

  constructor(private Service: CurriculmService) {}

  ngOnInit(): void {
    this.Service.ISCurriculmComponent(true);

    localStorage.setItem(
      'SelectedComponent',
      ComponentNumbers.curriculmComponentnumber.toString()
    );
    this.CreateCurriculmForm();
  }

  CreateCurriculmForm() {
    this.CurriculmForm = new FormGroup({
      Sections: new FormArray([]),
    });
  }

  AddSection() {
    var Sections = this.CurriculmForm.get('Sections') as FormArray;
    var Group = new FormGroup({
      SectionTitle: new FormControl(),
      SectionDescription: new FormControl(),
      Lectures: new FormArray([]),
    });
    Sections.push(Group);
  }
  AddLecture(sectionIndex: number) {
    var Sections = this.CurriculmForm.get('Sections') as FormArray;
    var Lectures = Sections.at(sectionIndex).get('Lectures') as FormArray;

    var Lecture = new FormGroup({
      Lecturetitle: new FormControl(),
      LectureDescription: new FormControl(),
      // Img: new FormControl(),
    });

    Lectures.push(Lecture);
  }

  Show(div: HTMLDivElement) {
    div.classList.toggle('d-none');
  }
  ngOnDestroy(): void {
    this.Service.ISCurriculmComponent(false);
  }
}
