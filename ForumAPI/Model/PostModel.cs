using System.ComponentModel.DataAnnotations;

namespace ForumAPI.Model
{
    public class PostModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        //  använder AccountModel främst för att modellera databasen
        //  för att skapa en foreign-key i "posts" tabellen,
        //  vilken skapar ett one-to-many förhållande mellan en post och ett account
        public AccountModel? Account { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
    }
}
