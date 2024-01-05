using SimpleEcommerce.Infrastructure.RepositoryImplementation;
using UdemyProject.Contract.RepositoryContracts;
using UdemyProject.Contracts.DTOs.Course;
using UdemyProject.Contracts.DTOs.CourseDTOs;
using UdemyProject.Contracts.ServicesContracts;
using UdemyProject.Domain.Entities;

namespace UdemyProject.Application.ServicesImplementation.CourseServicesimplementation
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _CourseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _CourseRepository = courseRepository;
        }

        public async Task<int> CreateBasicCourse(CourseBasicDataDTO courseBasic)
        {
            if (courseBasic is null)
            {
                return -1;
            }
            var Course = new Course()
            {
                Title = courseBasic.Name,
                CategoryId = courseBasic.Category,
                InstructorId = courseBasic.InstructorId,
            };
            await _CourseRepository.Add(Course);
            await _CourseRepository.SaveChanges();

            return Course.Id;
        }

        public async Task CreateRequimentCourse(CoursePrerequisiteDTO prerequisiteDTO)
        {
            var Course = await _CourseRepository.GetFirstOrDefault(c => c.Id == prerequisiteDTO.Id);

            if (Course is null)
            {
                return;
            }

            Course.Requirments.AddRange(prerequisiteDTO.Requiments.Select(c => new CourseRequirment
            {
                Text = c.Text
            }));
            Course.whoIsthisCoursefors.AddRange(prerequisiteDTO.WhoIsCourseFor.Select(c => new WhoIsthisCoursefor
            {
                Text = c.Text
            }));
            Course.whatYouLearnFromCourse.AddRange(prerequisiteDTO.WhateYouLearnFromCourse.Select(c => new WhatYouLearnFromCourse
            {
                Text = c.Text
            }));
            _CourseRepository.Update(Course);
            await _CourseRepository.SaveChanges();
        }
    }
}