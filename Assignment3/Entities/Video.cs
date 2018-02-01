using System.ComponentModel.DataAnnotations;
using Assignment1.Models;

namespace Assignment1.Entities {

    public class Video {

        public int Id {get; set;}
        [Required, MinLength(3), MaxLength(80)]
        public string Title {get; set;}
        [Display(Name = "Film Genre")]
        public Genres Genre {get; set;}

    }

}