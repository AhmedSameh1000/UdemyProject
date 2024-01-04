import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { LandingComponent } from './landing/landing.component';
import { MaterialModule } from '../material/material.module';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { RouterModule } from '@angular/router';
import { CoursecreationComponent } from './coursecreation/coursecreation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingComponent, BasicDataComponent, CoursecreationComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class InstructorModule {}
