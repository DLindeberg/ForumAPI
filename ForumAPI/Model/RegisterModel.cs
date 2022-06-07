using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ForumAPI.Model
{
    public class RegisterModel
    {
        [Required]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        public string Password { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
