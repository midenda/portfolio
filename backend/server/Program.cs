using Microsoft.AspNetCore;

var builder = WebApplication.CreateBuilder 
    (
        new WebApplicationOptions 
        {
            WebRootPath = "../../frontend/public"
        }
    );

WebHost.CreateDefaultBuilder (args).UseKestrel (options => 
    {

    });

// Add services to the container.
builder.Services.AddControllersWithViews ();

var app = builder.Build ();

// app.Use (async (context, next) => 
//     {
//         await next ();

//         if (context.Response.StatusCode == 404) 
//         {
//             if (!context.Response.HasStarted)
//             {
//                 context.Request.Path = "/";
//             };

//             await next ();
//         };
//     });

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment ())
{
    app.UseExceptionHandler ("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts ();
}

// app.UseHttpsRedirection ();
// app.UseDefaultFiles ();
// app.UseRouting ();


app.UseStaticFiles ();

// app.UseAuthorization ();

app.MapControllerRoute
(
    name: "project",
    pattern: "/projects/{project}", 
    defaults: new { controller = "Projects", action = "Render" }
);

//? Should these be different actions on the same controller?

app.MapControllerRoute
(
    name: "index",
    pattern: "/", 
    defaults: new { controller = "Home", action = "Index" }
);

app.MapFallbackToFile ("not-found.html");

app.Run (); 