using UdemyProject.Contract.RepositoryContracts;
using UdemyProject.Contracts.DTOs.CourseCategoryDTOs;
using UdemyProject.Contracts.ServicesContracts;

namespace UdemyProject.Application.ServicesImplementation.CourseCategoriesServicesimplementation
{
    internal class CourseCategoryService : ICourseCategoryService
    {
        private readonly ICourseCategoryRepository _CourseCategoryRepository;

        public CourseCategoryService(ICourseCategoryRepository courseCategoryRepository)
        {
            _CourseCategoryRepository = courseCategoryRepository;
        }

        public async Task<List<CourseCategoryDTO>> GetCourseCategories()
        {
            var Categories = await _CourseCategoryRepository.GetAllAsNoTracking();

            return Categories.Select(c => new CourseCategoryDTO()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToList();
        }
    }
}