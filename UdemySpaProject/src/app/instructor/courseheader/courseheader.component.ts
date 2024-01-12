import { PriceService } from './../../Services/price.service';
import { CourseService, MyData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';
import { RequirmentService } from 'src/app/Services/requirment.service';
import { MessageService } from 'src/app/Services/message.service';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { GeneralCourse } from 'src/app/Services/general-course';
import { LandingpageService } from 'src/app/Services/landingpage.service';

@Component({
  selector: 'app-courseheader',
  templateUrl: './courseheader.component.html',
  styleUrls: ['./courseheader.component.css'],
})
export class CourseheaderComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private requirmentService: RequirmentService,
    private messageService: MessageService,
    private landingservice: LandingpageService,
    private PriceService: PriceService
  ) {}

  CourseId: any;

  ngOnInit(): void {
    this.courseService.GetFiredData().subscribe({
      next: (data) => {
        if (
          data.isDirty ||
          data.numberObComponent == ComponentNumbers.RequirmentComponentnumber
        ) {
          console.log(data.isDirty);
          this.SaveCourse(data.numberObComponent, data);
        }
      },
    });
  }

  SaveCourse(numberOfComponent: number, data: MyData) {
    // Choose the service based on NumberOfComponent
    const selectedService: GeneralCourse =
      this.GetSelectedServices(numberOfComponent);

    // Call the SaveCourse method on the selected service
    selectedService.SaveCourse(data);
  }
  GetSelectedServices(numberOfComponent: number): any {
    switch (numberOfComponent) {
      case ComponentNumbers.RequirmentComponentnumber:
        return this.requirmentService;
      case ComponentNumbers.messageComponentnumber:
        return this.messageService;
      case ComponentNumbers.landingpageComponentnumber:
        return this.landingservice;
      case ComponentNumbers.pricingComponentnumber:
        return this.PriceService;
    }
  }

  FireActionSaveClick() {
    this.courseService.FireAction();
  }
}
