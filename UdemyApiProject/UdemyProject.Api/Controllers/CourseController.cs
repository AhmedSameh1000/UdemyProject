using MediatR;
using Microsoft.AspNetCore.Mvc;
using UdemyProject.Application.Features.Course.CourseCommands.Models;
using UdemyProject.Application.Features.Course.CourseQueries.Models;
using UdemyProject.Contracts.DTOs.Course;
using UdemyProject.Contracts.DTOs.CourseDTOs;

namespace UdemyProject.Api.Controllers
{
    public class CourseController : AppBaseController
    {
        private readonly IMediator _Mediator;
        private readonly IWebHostEnvironment _WebHostEnvironment;

        public CourseController(IMediator mediator, IWebHostEnvironment webHostEnvironment)
        {
            _Mediator = mediator;
            _WebHostEnvironment = webHostEnvironment;
        }

        [HttpPost("CreateBasicCourse")]
        public async Task<IActionResult> CreateBasicCourse(CourseBasicDataDTO courseBasicDataDTO)
        {
            var Response = await _Mediator.Send(new CreateBasicCourseModelCommand(courseBasicDataDTO));
            return NewResult(Response);
        }

        [HttpPost("CreateRequirmentCourse")]
        public async Task<IActionResult> CreateRequirmentCourse(CoursePrerequisiteDTO prerequisiteDTO)
        {
            var Response = await _Mediator.Send(new CreateCourseRequirmentModelCommand(prerequisiteDTO));
            return NewResult(Response);
        }

        [HttpPost("SaveCourseLanding")]
        public async Task<IActionResult> SaveCourseLanding([FromForm] CourseLandingDTO courseLandingDTO)
        {
            var Response = await _Mediator.Send(new SaveCourseLandingModelCommand(courseLandingDTO));
            return NewResult(Response);
        }

        [HttpGet("GetCourseDetails")]
        public async Task<IActionResult> GetCourseDetails(int Id)
        {
            var Response = await _Mediator.Send(new GetCourseDetailsModelQuery(Id));
            return NewResult(Response);
        }

        [HttpGet("CourseLandingPage")]
        public async Task<IActionResult> GetCourseLandingPage(int Id)
        {
            var Response = await _Mediator.Send(new GetCourseLandingPageQuery(Id));
            return NewResult(Response);
        }

        [HttpGet("StreamVideoPromotion")]
        public async Task<IActionResult> StreamVideoPromotion(int Id)
        {
            var Response = await _Mediator.Send(new GetCourseVideoPromotionpathQuery(Id));

            return new FileStreamResult(new FileStream(Response, FileMode.Open), "video/mp4");
        }
    }
}