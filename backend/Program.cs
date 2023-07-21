var builder = WebApplication.CreateBuilder 
    (
        new WebApplicationOptions 
        {
            // ContentRootPath = "/Users/Zorli/Desktop/Code/portfolio/backend",
            WebRootPath = "../frontend/public"
        }
    );

// Console.WriteLine ($"WebRootPath: {builder.Environment.WebRootPath}");


// Add services to the container.
// builder.Services.AddRazorPages ();
builder.Services.AddControllersWithViews (); // TODO: What do this do

var app = builder.Build ();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment ())
{
    app.UseExceptionHandler ("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts ();
}

app.UseHttpsRedirection ();
// app.UseDefaultFiles ();
// app.UseRouting ();


app.UseStaticFiles ();

// app.UseAuthorization ();

// app.Use ((context, next) => { return next (context); }); // Middleware definition

// app.MapRazorPages ();

// app.MapGet("/", () => Server);
// app.MapGet("/", (HttpContext context) => 
// { 
//     Console.WriteLine ($"\n\nEndpoint: {context.GetEndpoint ()}\n\n");
//     return "/frontend/public/index.html";
// }).WithDisplayName ("Home");

app.MapControllerRoute
(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

app.MapControllerRoute
(
    name: "default",
    pattern: "/{route?}",
    defaults: new { controller = "Home", action = "Index" }
);

app.MapFallbackToFile ("fallback.html");

app.Run (); 