using ForumAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ForumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        [HttpPost]
        [Authorize]
        [Route("CreatePost")]
        // Tar emot en modell av PostModel, söker i databasen där username == Account.Username
        // om posten hittas läggs den till i databasen med en title och message som kommer från modellen samt ett accountId
        // sparar posten och returnerar en 200 ok i annat fall returnerar en badrequest.
        public IActionResult CreatePost(PostModel post)
        {
            using (var db = new ForumContext())
            {
                var user = db.Accounts.Where(x => x.Username == post.Account.Username).FirstOrDefault();
                if (user != null)
                {
                    db.Posts.Add(new PostModel
                    {
                        Title = post.Title,
                        Message = post.Message,
                        Account = user
                    });
                    db.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        // Hämtar alla användarens posts med auth
        [HttpPost]
        [Authorize]
        [Route("GetUserPosts")]
        public IActionResult GetUserPosts([FromBody] string username)
        {
            using (var db = new ForumContext())
            {
                var posts = db.Posts.Where(x => x.Account.Username == username).ToList();
                return Ok(posts);
            }
        }

        // Hämtar samtliga posts i db utan auth
        [HttpGet]
        [Route("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            using (var db = new ForumContext())
            {
                var posts = db.Posts.ToList();
                return Ok(posts);
            }
        }

        // Tar bort en användares post med auth
        [HttpDelete]
        [Authorize]
        [Route("DeleteUserPost")]
        public IActionResult DeleteUserPost([FromBody]PostModel model)
        {
            using (var db = new ForumContext())
            {
                var deletePost = db.Posts.FirstOrDefault(x => x.Id == model.Id);
                if (deletePost != null)
                {
                    db.Posts.Remove(deletePost);
                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
                return Ok();
            }
        }
        // uppdaterar meddelandet i en användares post med auth
        [HttpPut]
        [Authorize]
        [Route("UpdatePost")]
        public IActionResult UpdateUserPost([FromBody] PostModel model)
        {
            using (var db = new ForumContext())
            {
                var updatePost = db.Posts.FirstOrDefault(x => x.Id == model.Id);

                if (updatePost != null)
                {
                    updatePost.Message = model.Message;
                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
                return Ok();
            }
        }
    }
}