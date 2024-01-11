using UdemyProject.Contracts.DTOs.Course;
using UdemyProject.Contracts.DTOs.CourseDTOs;

namespace UdemyProject.Contracts.ServicesContracts
{
    public interface ICourseService
    {
        Task<int> CreateBasicCourse(CourseBasicDataDTO courseBasic);

        Task CreateRequimentCourse(CoursePrerequisiteDTO prerequisiteDTO);

        Task<CourseForReturnDto> GetCourse(int Id);

        Task<bool> SaveCourseLanding(CourseLandingDTO courseLanding);

        Task<CourseLandingPageForReturnDTO> GetCourseLandingPage(int Id);

        Task<string> GetVideoPromotionCourse(int Id);

        Task<List<InstructorMinimalCourses>> GetInstructorCourse(string InstructorId);
    }
}