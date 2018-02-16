using System.ComponentModel.DataAnnotations;

namespace Assignment1.ViewModels {

    public class VideoEditViewModel {
        public int Id {get; set;}
        [Required, MinLength(3), MaxLength(80)]
        public string Title {get; set;}
        public Models.Genres Genre {get; set;}
    }

}