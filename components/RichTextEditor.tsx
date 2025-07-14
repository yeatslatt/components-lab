"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import AutoFormat from "./AutoFormat";
import ClausulaRule from "./ClausulaRule";
import { registerClausulaBlot } from "./ClausulaBlot";

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => any; // Use any since Quill returns its own Delta type
};

// Register the AutoFormat module with Quill
if (typeof window !== "undefined") {
  Quill.register("modules/autoFormat", AutoFormat);
}

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && typeof window !== "undefined") {
      try {
        // Register custom blot before creating Quill instance
        registerClausulaBlot();

        // Register the clausula format
        Quill.register("formats/clausula", true);

        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
            autoFormat: {},
          },
          placeholder: "Write something...",
        });

        // Initialize AutoFormat module
        const autoFormat = quillRef.current.getModule(
          "autoFormat",
        ) as AutoFormat;

        // Register the clausula rule if the module is available
        if (autoFormat && typeof autoFormat.registerRule === "function") {
          autoFormat.registerRule(ClausulaRule);
          console.log("ClausulaRule registered with AutoFormat module");
        } else {
          console.warn("AutoFormat module not properly initialized");
        }

        // Log that custom format is registered
        console.log("Custom clausula format registered");
      } catch (error) {
        console.error("Error initializing Quill editor:", error);
      }
    }

    return () => {
      quillRef.current = null; // Cleanup to avoid memory leaks
    };
  }, []);

  // Expose the getContent and getDelta functions to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
    getDelta: () => {
      if (quillRef.current) {
        return quillRef.current.getContents(); // Return the Delta content
      }
      return { ops: [] }; // Return empty delta if no content
    },
  }));

  return <div ref={editorRef} style={{ height: "300px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
