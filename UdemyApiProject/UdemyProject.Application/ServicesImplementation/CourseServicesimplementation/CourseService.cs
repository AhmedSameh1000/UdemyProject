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
            var Course = await _CourseRepository.GetFirstOrDefault(c => c.Id == prerequisiteDTO.Id, new[] { "Requirments", "whoIsthisCoursefors", "whatYouLearnFromCourse" });

            if (Course is null)
            {
                return;
            }

            Course.Requirments.AddRange(prerequisiteDTO.Requiments.Select(c => new CourseRequirment
            {
                Text = c
            }));
            Course.whoIsthisCoursefors.AddRange(prerequisiteDTO.WhoIsCourseFor.Select(c => new WhoIsthisCoursefor
            {
                Text = c
            }));
            Course.whatYouLearnFromCourse.AddRange(prerequisiteDTO.WhateYouLearnFromCourse.Select(c => new WhatYouLearnFromCourse
            {
                Text = c
            }));
            _CourseRepository.Update(Course);
            await _CourseRepository.SaveChanges();
        }

        public async Task<CourseForReturnDto> GetCourse(int Id)
        {
            var Course = await _CourseRepository.GetFirstOrDefault(c => c.Id == Id, new[] { "Requirments", "whoIsthisCoursefors", "whatYouLearnFromCourse" });
            if (Course is null)
                return null;

            var CourseForReturn = new CourseForReturnDto()
            {
                CourseId = Id,
                Requirments = Course.Requirments.Select(c => new GenralModelCourseDetailsDTo()
                {
                    Id = c.Id,
                    Name = c.Text
                }).ToList(),

                WhateWillYouLearnFromCourse = Course.whatYouLearnFromCourse.Select(c => new GenralModelCourseDetailsDTo()
                {
                    Id = c.Id,
                    Name = c.Text
                }).ToList(),

                WhoIsThisCourseFor = Course.whoIsthisCoursefors.Select(c => new GenralModelCourseDetailsDTo()
                {
                    Id = c.Id,
                    Name = c.Text
                }).ToList(),
            };

            return CourseForReturn;
        }
    }
}