using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Application.Features.Course.CourseCommands.Models;
using UdemyProject.Application.ResponseHandler;
using UdemyProject.Application.Shared;
using UdemyProject.Contracts.DTOs.Course;
using UdemyProject.Contracts.ServicesContracts;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace UdemyProject.Application.Features.Course.CourseCommands.Handlers
{
    public class CourseCommandHandler : ResponseHandlerModel, IRequestHandler<CreateBasicCourseModelCommand, ResponseModel<int>>
    {
        private readonly ICourseService _CourseService;
        private readonly IValidator<CourseBasicDataDTO> _BasicCoursevalidation;

        public CourseCommandHandler(IStringLocalizer<Sharedresources> stringLocalizer, ICourseService courseService, IValidator<CourseBasicDataDTO> BasicCoursevalidation) : base(stringLocalizer)
        {
            _CourseService = courseService;
            _BasicCoursevalidation = BasicCoursevalidation;
        }

        public async Task<ResponseModel<int>> Handle(CreateBasicCourseModelCommand request, CancellationToken cancellationToken)
        {
            var ValidationResponse = await _BasicCoursevalidation.ValidateAsync(request.CourseDTO);

            if (!ValidationResponse.IsValid)
            {
                return BadRequest<int>(string.Join(',', ValidationResponse.Errors.Select(c => c.ErrorMessage)));
            }

            var CourseId = await _CourseService.CreateBasicCourse(request.CourseDTO);

            return Success(CourseId);
        }
    }
}