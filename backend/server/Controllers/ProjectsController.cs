using Microsoft.AspNetCore.Mvc;

namespace sense.Controllers;
public class ProjectsController : Controller
{
    [HttpGet]
    public ContentResult Render (string project) 
    {
        string[] projects = System.IO.Directory.GetFiles ("../../frontend/public/content/", $"{project}-preview.js");

        if (projects?.Length > 0)
        {
            return new ContentResult 
            {
                StatusCode = 200,
                ContentType = "text/html",
                Content = System.IO.File.ReadAllText ($"../../frontend/public/project.html")
            };
        }; 

        // only if project is not found
        return new ContentResult 
        {
            StatusCode = 404,
            ContentType = "text/html",
            Content = System.IO.File.ReadAllText ("../../frontend/public/not-found.html")
        };
    }
};