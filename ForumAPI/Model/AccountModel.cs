using System.ComponentModel.DataAnnotations;

namespace ForumAPI.Model
{
    public class AccountModel
    {
        //Vi valde att göra modeller och entiteter som samma filer då vi inte riktigt kunde greppa varför vi skulle använda automapper.
        //Id = primary-key
        [Key]
        [Required]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
