using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Flask_Web_Core.Models
{
    public class UserDetails : IdentityUser
    {
        public string UserName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string DupPassword { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        public int UserProfileID { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsEmailConfirmed { get; set; }
    }
}
