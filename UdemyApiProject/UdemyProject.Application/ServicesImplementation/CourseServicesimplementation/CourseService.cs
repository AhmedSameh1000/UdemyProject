using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        private readonly ICourseRequimentRepository _CourseRequimentRepository;
        private readonly IWhatYouLearnFromCourseRepository _WhatYouLearnFromCourseRepository;
        private readonly IWhoIsThisCourseForRepository _WhoIsThisCourseForRepository;
        private readonly IWebHostEnvironment _Host;
        private readonly IHttpContextAccessor _HttpContextAccessor;

        public CourseService(ICourseRepository courseRepository, ICourseRequimentRepository courseRequimentRepository,
            IWhatYouLearnFromCourseRepository whatYouLearnFromCourseRepository,
            IWhoIsThisCourseForRepository whoIsThisCourseForRepository,
            IWebHostEnvironment host, IHttpContextAccessor httpContextAccessor)
        {
            _CourseRepository = courseRepository;
            _CourseRequimentRepository = courseRequimentRepository;
            _WhatYouLearnFromCourseRepository = whatYouLearnFromCourseRepository;
            _WhoIsThisCourseForRepository = whoIsThisCourseForRepository;
            _Host = host;
            _HttpContextAccessor = httpContextAccessor;
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

            var Req = await _CourseRequimentRepository.GetAllAsNoTracking(c => c.CourseId == Course.Id);
            _CourseRequimentRepository.RemoveRange(Req);

            var what = await _WhatYouLearnFromCourseRepository.GetAllAsNoTracking(c => c.CourseId == Course.Id);
            _WhatYouLearnFromCourseRepository.RemoveRange(what);

            var who = await _WhoIsThisCourseForRepository.GetAllAsNoTracking(c => c.CourseId == Course.Id);
            _WhoIsThisCourseForRepository.RemoveRange(who);
            await _WhoIsThisCourseForRepository.SaveChanges();

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

        public async Task<bool> SaveCourseLanding(CourseLandingDTO courseLanding)
        {
            var Course = await _CourseRepository.GetFirstOrDefault(c => c.Id == courseLanding.CourseId);
            if (Course is null) return false;
            var imageUrl = "";
            var VideoUrl = "";
            if (courseLanding.Image is not null)
            {
                imageUrl = SaveFile(courseLanding.Image, "CourseImages");
            }
            if (courseLanding.PromotionVideo is not null)
            {
                VideoUrl = SaveFile(courseLanding.PromotionVideo, "PromotionalVideo");
            }

            Course.Title = courseLanding.Title;

            Course.SubTitle = courseLanding.SubTitle;
            Course.Description = courseLanding.Description;
            Course.langugeId = courseLanding.LangugeId;
            Course.CategoryId = courseLanding.CategoryId;
            Course.Image = imageUrl;
            Course.CoursePromotionalVideo = VideoUrl;
            _CourseRepository.Update(Course);
            return await _CourseRepository.SaveChanges();
        }

        private string SaveFile(IFormFile file, string wwwrootFilePath)
        {
            string RootPath = _Host.WebRootPath;
            var ImageUrl = "";
            string fileName = Guid.NewGuid().ToString();
            string imageFolderPath = Path.Combine(RootPath, wwwrootFilePath);
            string extension = Path.GetExtension(file.FileName);
            using (FileStream fileStreams = new(Path.Combine(imageFolderPath,
                            fileName + extension), FileMode.Create))
            {
                file.CopyTo(fileStreams);
            }
            ImageUrl = @$"{_HttpContextAccessor.HttpContext.Request.Scheme}://{_HttpContextAccessor.HttpContext.Request.Host}/{wwwrootFilePath}/" + fileName + extension;

            return ImageUrl;
        }
    }
}