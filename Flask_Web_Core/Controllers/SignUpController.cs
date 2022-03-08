using Flask_Web_Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Flask_Web_Core.Controllers
{
    public class SignUpController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(UserDetails usrDetails)
        {
            return View(usrDetails);
        }

        public JsonResult userExists(string emailID)
        {
            return Json(new string[] { });
        }
    }
}
