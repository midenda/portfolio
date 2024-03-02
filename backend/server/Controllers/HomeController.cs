using Microsoft.AspNetCore.Mvc;

namespace sense.Controllers;

// [ApiController]
// [Route("[controller]")]

public class HomeController : Controller
{
    [HttpGet]
    public ContentResult Index (int id) 
    {
        return new ContentResult 
        {
            StatusCode = 200,
            ContentType = "text/html",
            Content = System.IO.File.ReadAllText ("../../frontend/public/index.html")
        };
    }
};