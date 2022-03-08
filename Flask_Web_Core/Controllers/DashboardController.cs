using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flask_Web_Core.Controllers
{
    public class DashboardController : Controller
    {
        //[Authorize(Roles = "Admin, User, SomeRoleName")]
        public IActionResult Index()
        {
            if(User.Identity.IsAuthenticated || HttpContext.User.Identity.IsAuthenticated)
            {
                TempData["Success"] = "Login is sucessful";

               return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}
