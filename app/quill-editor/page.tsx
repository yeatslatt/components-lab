"use client";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const MultiPageEditor = dynamic(() => import("@/components/MultiPageEditor"), {
  ssr: false,
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => any; // Changed from JSON to any
};


// Helper function to highlight clausula attributes in the delta
const highlightClausulaAttributes = (delta: any) => {
  if (!delta || !delta.ops) return delta;

  return {
    ...delta,
    ops: delta.ops.map((op: any) => {
      if (op.attributes && op.attributes.clausula !== undefined) {
        return {
          ...op,
          highlighted: true, // Add a flag for UI rendering
        };
      }
      return op;
    }),
  };
};

export default function Home() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [deltaContent, setDeltaContent] = useState<any>(); // Changed from JSON to any

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const delta = editorRef.current.getDelta();
      console.log("Editor content:", content);
      console.log("Delta content:", JSON.stringify(delta));

      // Look for 'clausula' attributes in the delta
      const clausulaTexts = [];
      if (delta && delta.ops) {
        delta.ops.forEach((op: any) => {
          if (op.attributes && op.attributes.clausula !== undefined) {
            clausulaTexts.push({
              text: op.insert,
              clausula: op.attributes.clausula,
            });
            console.log(
              "Found clausula:",
              op.attributes.clausula,
              "for text:",
              op.insert,
            );
          }
        });
      }

      setEditorContent(content);
      setDeltaContent(highlightClausulaAttributes(delta));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold my-5 text-xl">Rich Text Editor</h1>
      <div>
        <RichTextEditor ref={editorRef} />
      </div>
      <button
        onClick={handleGetContent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show Content
      </button>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor Content (HTML):</h2>
        <div
          className="border p-4 rounded bg-gray-50 text-black"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor content (Delta):</h2>
        <pre className="border p-4 rounded bg-gray-50 whitespace-pre-wrap text-black">
          {deltaContent ? JSON.stringify(deltaContent, null, 2) : ""}
        </pre>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Texts with Clausula Attribute:</h2>
        <div className="border p-4 rounded bg-gray-50 text-black">
          {deltaContent && deltaContent.ops ? (
            <ul className="list-disc list-inside">
              {deltaContent.ops
                .filter(
                  (op: any) =>
                    op.attributes && op.attributes.clausula !== undefined,
                )
                .map((op: any, i: number) => (
                  <li key={i} className="text-red-600">
                    <span className="font-bold">Text:</span> "{op.insert}" -
                    <span className="font-bold"> Clausula Index:</span>{" "}
                    {op.attributes.clausula}
                  </li>
                ))}
            </ul>
          ) : (
            <p>No texts with clausula attribute found</p>
          )}
        </div>
      </div>

      {/* Multi-Page Editor Section */}
      <div className="mt-8 border-t pt-8">
        <h1 className="text-center font-bold my-5 text-xl">Multi-Page Editor</h1>
        <div className="h-screen">
          <MultiPageEditor />
        </div>
      </div>
    </div>
  );
}