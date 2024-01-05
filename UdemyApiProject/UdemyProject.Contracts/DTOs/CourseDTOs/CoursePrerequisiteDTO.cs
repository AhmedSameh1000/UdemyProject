using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Contracts.DTOs.Course;

namespace UdemyProject.Contracts.DTOs.CourseDTOs
{
    public class CoursePrerequisiteDTO
    {
        public int Id { get; set; }
        public List<RequimentDTO> Requiments { get; set; }
        public List<WhateYouLearnFromCourseDTO> WhateYouLearnFromCourse { get; set; }

        public List<WhoIsCourseForDTO> WhoIsCourseFor { get; set; }
    }
}