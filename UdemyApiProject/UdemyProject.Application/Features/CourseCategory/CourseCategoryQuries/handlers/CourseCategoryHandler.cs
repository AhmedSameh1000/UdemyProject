using MediatR;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Application.Features.CourseCategory.CourseCategoryQuries.Models;
using UdemyProject.Application.ResponseHandler;
using UdemyProject.Application.Shared;
using UdemyProject.Contracts.DTOs.CourseCategoryDTOs;
using UdemyProject.Contracts.ServicesContracts;

namespace UdemyProject.Application.Features.CourseCategory.CourseCategoryQuries.handlers
{
    internal class CourseCategoryHandler : ResponseHandlerModel, IRequestHandler<GetCourseCategoriesModelQuery, ResponseModel<List<CourseCategoryDTO>>>
    {
        private readonly ICourseCategoryService _CourseCategoryService;

        public CourseCategoryHandler(IStringLocalizer<Sharedresources> stringLocalizer, ICourseCategoryService courseCategoryService) : base(stringLocalizer)
        {
            _CourseCategoryService = courseCategoryService;
        }

        public async Task<ResponseModel<List<CourseCategoryDTO>>> Handle(GetCourseCategoriesModelQuery request, CancellationToken cancellationToken)
        {
            var Categories = await _CourseCategoryService.GetCourseCategories();

            return Success(Categories);
        }
    }
}