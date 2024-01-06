using MediatR;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Application.Features.Course.CourseQueries.Models;
using UdemyProject.Application.ResponseHandler;
using UdemyProject.Application.Shared;
using UdemyProject.Contracts.DTOs.CourseDTOs;
using UdemyProject.Contracts.ServicesContracts;

namespace UdemyProject.Application.Features.Course.CourseQueries.Handlers
{
    public class CourseHandlerQuery : ResponseHandlerModel, IRequestHandler<GetCourseDetailsModelQuery, ResponseModel<CourseForReturnDto>>
    {
        private readonly ICourseService _CourseService;

        public CourseHandlerQuery(IStringLocalizer<Sharedresources> stringLocalizer, ICourseService courseService) : base(stringLocalizer)
        {
            _CourseService = courseService;
        }

        public async Task<ResponseModel<CourseForReturnDto>> Handle(GetCourseDetailsModelQuery request, CancellationToken cancellationToken)
        {
            var CourseDetails = await _CourseService.GetCourse(request.CourseId);
            if (CourseDetails == null)
            {
                return BadRequest<CourseForReturnDto>("ERR,ERR");
            }

            return Success(CourseDetails);
        }
    }
}