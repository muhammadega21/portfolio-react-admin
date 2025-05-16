/*************  ✨ Codeium Command 🌟  *************/
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";

function FroalaEditor({ tag, model, onModelChange }) {
  return (
    <FroalaEditorComponent
      config={{
        placeholderText: "Write your article here",
        heightMin: 200,
        undo: true,
        showOnMobile: true,
        toolbarButtons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "|",
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "|",
          "insertImage",
          "insertLink",
          "insertTable",
          "undo",
          "redo",
        ],
      }}
      tag={tag}
      model={model}
      onModelChange={onModelChange}
    />
  );
}

export default FroalaEditor;

/******  98916ac7-6f31-4626-aff2-dd6f40dd576e  *******/
