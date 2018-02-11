using Microsoft.AspNetCore.Mvc;
using Assignment1.Services;

namespace Assignment1.ViewComponents {

    public class Message : ViewComponent {
        private IMessageService message;

        public Message(IMessageService message) {
            this.message = message;
        }

        public IViewComponentResult Invoke() => View("Default", this.message.GetMessage());

    }

}