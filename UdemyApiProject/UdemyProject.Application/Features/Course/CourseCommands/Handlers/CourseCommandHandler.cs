﻿using FluentValidation;
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
using UdemyProject.Contracts.DTOs.CourseDTOs;
using UdemyProject.Contracts.ServicesContracts;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace UdemyProject.Application.Features.Course.CourseCommands.Handlers
{
    public class CourseCommandHandler : ResponseHandlerModel,
        IRequestHandler<CreateBasicCourseModelCommand, ResponseModel<int>>,
        IRequestHandler<CreateCourseRequirmentModelCommand, ResponseModel<bool>>
    {
        private readonly ICourseService _CourseService;
        private readonly IValidator<CourseBasicDataDTO> _BasicCoursevalidation;
        private readonly IValidator<CoursePrerequisiteDTO> _CoursePrerequisiteDTOValidator;

        public CourseCommandHandler(IStringLocalizer<Sharedresources> stringLocalizer,
            ICourseService courseService,
            IValidator<CourseBasicDataDTO> BasicCoursevalidation,
            IValidator<CoursePrerequisiteDTO> CoursePrerequisiteDTOValidator

            ) : base(stringLocalizer)
        {
            _CourseService = courseService;
            _BasicCoursevalidation = BasicCoursevalidation;
            _CoursePrerequisiteDTOValidator = CoursePrerequisiteDTOValidator;
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

        public async Task<ResponseModel<bool>> Handle(CreateCourseRequirmentModelCommand request, CancellationToken cancellationToken)
        {
            var Response = await _CoursePrerequisiteDTOValidator.ValidateAsync(request.CoursePrerequisiteDTO);
            if (!Response.IsValid)
            {
                return BadRequest<bool>(string.Join(',', Response.Errors.Select(c => c.ErrorMessage)));
            }

            await _CourseService.CreateRequimentCourse(request.CoursePrerequisiteDTO);

            return Success(true);
        }
    }
}