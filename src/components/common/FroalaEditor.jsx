import "./index.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useEffect, useState } from "react";

function FroalaEditor({ tag, model, onModelChange, error }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {mounted && (
        <FroalaEditorComponent
          config={{
            imageUploadURL: `${
              import.meta.env.VITE_API_URL
            }/upload-froala-image`,
            imageUploadMethod: "POST",
            imageUploadParam: "file",
            requestHeaders: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            placeholderText: "Write your article here",
            heightMin: 300,
            heightMax: 500,
            toolbarSticky: true,
            toolbarStickyOffset: 50,
            toolbarVisibleWithoutSelection: true,
            undo: true,
            showOnMobile: true,
            listAdvancedTypes: true,
            wordPaste: true,

            events: {
              contentChanged: function () {
                this.toolbar.show();
              },
              "image.removed": function (img) {
                const src = img[0].src;
                if (src && !src.startsWith("blob:")) {
                  // Notify backend to mark image for potential cleanup
                  fetch(`${import.meta.env.VITE_API_URL}/mark-image-unused`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ imageUrl: src }),
                  }).catch(console.error);
                }
              },
            },

            imageEditButtons: [
              "imageReplace",
              "imageAlign",
              "imageRemove",
              "|",
              "imageLink",
              "linkOpen",
              "linkEdit",
              "linkRemove",
              "-",
              "imageDisplay",
              "imageStyle",
              "imageSize",
              "imageMargin",
            ],
            imageResize: true,
            imageAdvancedButton: true,
            imageMultipleStyles: false,
            imageDefaultWidth: "100%",
            imageDefaultAlign: "center",
            imageDefaultDisplay: "block",
            imageMove: true,
            imageOutputSize: true,
            imageTextNear: true,
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
              "fullscreen",
            ],
          }}
          tag={tag}
          model={model}
          onModelChange={onModelChange}
        />
      )}
      {error && (
        <span className="text-red-500 text-start block text-sm mt-1">
          {error}
        </span>
      )}
    </>
  );
}

export default FroalaEditor;
