namespace UdemyProject.Domain.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? SubTitle { get; set; }
        public string? Description { get; set; }

        public string? CourseLanguge { get; set; }

        public int CategoryId { get; set; }
        public string? Image { get; set; }

        public bool isPublished { get; set; }
        public CourseCategory category { get; set; }

        public List<CourseRequirment> Requirments { get; set; }
        public List<WhoIsthisCoursefor> whoIsthisCoursefors { get; set; }

        public List<WhatYouLearnFromCourse> whatYouLearnFromCourse { get; set; }

        public List<ApplicationUser> Students { get; set; }

        public string InstructorId { get; set; }
        public ApplicationUser Instructor { get; set; }
    }
}