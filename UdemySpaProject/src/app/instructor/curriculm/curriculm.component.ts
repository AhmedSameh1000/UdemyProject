import { Component, OnInit } from '@angular/core';
import { ComponentNumbers } from 'src/app/Models/component-numbers';

@Component({
  selector: 'app-curriculm',
  templateUrl: './curriculm.component.html',
  styleUrls: ['./curriculm.component.css'],
})
export class CurriculmComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem(
      'SelectedComponent',
      ComponentNumbers.curriculmComponentnumber.toString()
    );
  }
}
