using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UdemyProject.Application.Features.Course.CourseCommands.Models;
using UdemyProject.Application.Features.CourseCategory.CourseCategoryQuries.Models;
using UdemyProject.Contracts.DTOs.Course;

namespace UdemyProject.Api.Controllers
{
    public class CourseController : AppBaseController
    {
        private readonly IMediator _Mediator;

        public CourseController(IMediator mediator)
        {
            _Mediator = mediator;
        }

        [HttpPost("CreateBasicCourse")]
        public async Task<IActionResult> CreateBasicCourse(CourseBasicDataDTO courseBasicDataDTO)
        {
            var Response = await _Mediator.Send(new CreateBasicCourseModelCommand(courseBasicDataDTO));
            return NewResult(Response);
        }
    }
}