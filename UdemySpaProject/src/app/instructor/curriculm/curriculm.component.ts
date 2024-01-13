import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { CurriculmService } from 'src/app/Services/curriculm.service';

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
      Sections: new FormArray([
        new FormGroup({
          Title: new FormControl(),
          Desc: new FormControl(),
          Lectures: new FormArray([
            new FormGroup({
              title: new FormControl(),
              Img: new FormControl(),
            }),
            new FormGroup({
              title: new FormControl(),
              Img: new FormControl(),
            }),
          ]),
        }),
        new FormGroup({
          Title: new FormControl(),
          Desc: new FormControl(),
          Lectures: new FormArray([
            new FormGroup({
              title: new FormControl(),
              Img: new FormControl(),
            }),
          ]),
        }),
      ]),
    });
  }

  Show(div: HTMLDivElement) {
    div.classList.toggle('d-none');
  }
  ngOnDestroy(): void {
    this.Service.ISCurriculmComponent(false);
  }
}
