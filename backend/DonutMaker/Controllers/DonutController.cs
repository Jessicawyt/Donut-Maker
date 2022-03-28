using DonutMaker.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace DonutMaker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DonutController : ControllerBase
    {
        private ApplicationDbContext _context;
        public DonutController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Donut> Get()
        {
            return _context.Donuts.ToList();
        }
    }
}
