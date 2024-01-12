import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { PriceService } from './../../Services/price.service';
import { CourseService, MyData } from './../../Services/course.service';
import { Component, OnInit } from '@angular/core';
import { RequirmentService } from 'src/app/Services/requirment.service';
import { MessageService } from 'src/app/Services/message.service';
import { ComponentNumbers } from 'src/app/Models/component-numbers';
import { GeneralCourse } from 'src/app/Services/general-course';
import { LandingpageService } from 'src/app/Services/landingpage.service';
import Swal from 'sweetalert2';

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
    private PriceService: PriceService,
    private AuthService: AuthService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {}

  CourseId: any;
  GetCoursId() {
    this.ActivatedRoute.paramMap.subscribe({
      next: (data: any) => {
        this.CourseId = +data.get('Id');
        console.log(this.CourseId);
      },
    });
  }
  ngOnInit(): void {
    this.GetCoursId();
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

  DeleteCourse() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService
          .DeleteCourse(this.CourseId, this.AuthService.GetUserId())
          .subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              this.Router.navigate(['']);
            },
          });
      }
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
