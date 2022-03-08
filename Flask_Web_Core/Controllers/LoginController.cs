using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Security.Claims;
using Flask_Web_Core.Models;
using System.Web;
//using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.AspNet.Identity;
using System.Net;
//using Microsoft.IdentityModel.Claims;

namespace Flask_Web_Core.Controllers
{
    public class LoginController : Controller
    {
        //var userData = HttpContext.User.Identity.Name.Split('.');
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            if(HttpContext.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> LoginAfter(UserDetails userDetails)
        {
            var claim = new Claim(userDetails.UserName, userDetails.Password);
            var identity = new ClaimsIdentity(new[] { claim }, "BasicAuthentication");
            var principal = new ClaimsPrincipal(identity);
            var props = new AuthenticationProperties();
            props.IsPersistent = userDetails.RememberMe;
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, props);
            return RedirectToAction("Index", "Dashboard");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SignOff()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction(nameof(Index));
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }

        public JsonResult sendPassword(string emailID)
        {
            return Json(new string[] { });
        }

        public string CallAPI(string callMethod, string Body, Method method)
        {
            var client = new RestClient("http://192.168.0.1");
            var request = new RestRequest("api/item/", method);
            request.RequestFormat = DataFormat.Json;
            //request.AddBody(new  { ItemName = someName, Price = 19.99 });
            var response = client.ExecuteAsync(request);
            return string.Empty;
        }
    }
}
