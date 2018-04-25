using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace VideoOnDemand.TagHelpers
{

    [HtmlTargetElement("button-container")]
    public class ButtonContainerTagHelper : TagHelper
    {

        public string Controller { get; set; }
        public string Actions { get; set; }
        public string Descriptions { get; set; }
        public bool UseGlyphs {get; set;}
        private Dictionary<string, string> ButtonGlyphs = new Dictionary<string, string>{
            {"edit", "pencil"},
            {"create", "th-list"},
            {"delete", "remove"},
            {"details", "info-sign"},
            {"index", "list-alt"}
        };
        private Dictionary<string, string> ButtonTypes = new Dictionary<string, string> {
            {"edit", "success"},
            {"create", "primary"},
            {"delete", "danger"},
            {"details", "primary"},
            {"index", "primary"}
        };
        public override void Process(TagHelperContext context,
        TagHelperOutput output)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            if (output == null)
                throw new ArgumentNullException(nameof(output));
            base.Process(context, output);
            output.TagName = "span";
            output.Content.SetHtmlContent(
            "<span style='min-width:100px; display:inline-block;'>");
            var href = "";
            var actions = Actions.Split(',');
            var descriptions = Descriptions != null ? Descriptions.Split(',') : new string[0];
            var ids = context.AllAttributes.Where(x => x.Name.StartsWith("id")).ToList();

            foreach (var action in actions)
            {
                if (Controller != null && Controller.Length > 0)
                {
                    if (action != null && action.Length > 0)
                        href = $@"href='/admin/{Controller}/{action}'";
                    else href = $@"href='/admin/{Controller}/Index'";
                }
                var description = action;
                if (descriptions.Length >= actions.Length)
                    description = descriptions[Array.IndexOf(
                    actions, action)];
                if (description.Length.Equals(0)) description = action;

                var param = "";
                foreach (var id in ids) {
                    var splitId = id.Name.Split('-');
                    if (splitId.Length == 1) param = $"Id={id.Value}";
                    if (splitId.Length == 2) param += $"&{splitId[1]}={id.Value}";
                    if (param.StartsWith("&")) param = param.Substring(1);
                    if (param.Length > 0) href = href.Insert(href.Length - 1, $"?{param}");
                }

                var classAttr = "";
                if (UseGlyphs) {
                    var glyph = "";
                    ButtonGlyphs.TryGetValue(action.ToLower(), out glyph);
                    if (!string.IsNullOrEmpty(glyph)) {
                        classAttr = $"class='glyphicon glyphicon-{glyph}'";
                        description = string.Empty;
                    }
                }

                var button = "";
                ButtonTypes.TryGetValue(action.ToLower(), out button);
                var buttonClass = "";
                if (!string.IsNullOrEmpty(button)) buttonClass = $"class='btn-sm btn-{button}'";

                output.Content.AppendHtml($@"<a {buttonClass} {href}><span {classAttr}></span>{description}</a>");
            }
            output.Content.AppendHtml("</span>");            
        }
    }

}