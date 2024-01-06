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

        [HttpPost("CreateRequirmentCourse")]
        public async Task<IActionResult> CreateRequirmentCourse(CoursePrerequisiteDTO prerequisiteDTO)
        {
            var Response = await _Mediator.Send(new CreateCourseRequirmentModelCommand(prerequisiteDTO));
            return NewResult(Response);
        }

        [HttpGet("GetCourseDetails")]
        public async Task<IActionResult> GetCourseDetails(int Id)
        {
            var Response = await _Mediator.Send(new GetCourseDetailsModelQuery(Id));
            return NewResult(Response);
        }
    }
}