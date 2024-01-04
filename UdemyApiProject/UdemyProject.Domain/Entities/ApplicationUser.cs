using Microsoft.AspNetCore.Identity;

namespace UdemyProject.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public List<UserRefreshToken>? RefreshTokens { get; set; }
    }
}