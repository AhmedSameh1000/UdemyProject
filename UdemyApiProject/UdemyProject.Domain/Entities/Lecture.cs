namespace UdemyProject.Domain.Entities
{
    public class Lecture
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public Section Section { get; set; }
        public string? Title { get; set; }
        public string? VideoSectionUrl { get; set; }
    }
}