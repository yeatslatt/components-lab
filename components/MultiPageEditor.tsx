import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Type,
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

const MultiPageEditor = () => {
  const [pages, setPages] = useState([{ id: 1, content: "", title: "Page 1" }]);
  const [activePage, setActivePage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const addPage = () => {
    const newId = Math.max(...pages.map((p) => p.id)) + 1;
    const newPage = {
      id: newId,
      content: "",
      title: `Page ${newId}`,
    };
    setPages([...pages, newPage]);
    setActivePage(newId);

    // Scroll to the new page
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft =
          scrollContainerRef.current.scrollWidth;
      }
    }, 100);
  };

  const removePage = (pageId: number) => {
    if (pages.length <= 1) return; // Keep at least one page

    const updatedPages = pages.filter((p) => p.id !== pageId);
    setPages(updatedPages);

    if (activePage === pageId) {
      setActivePage(updatedPages[0].id);
    }
  };

  const updatePageContent = (pageId: number, content: string) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, content } : p)));
  };

  const updatePageTitle = (pageId: number, title: string) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, title } : p)));
  };

  const formatText = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || undefined);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    pageId: number,
  ) => {
    // Save content on any change
    const content = (e.target as HTMLDivElement).innerHTML;
    updatePageContent(pageId, content);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Multi-Page Editor
        </h1>
        <button
          onClick={addPage}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Page
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-2">
        <button
          onClick={() => formatText("bold")}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => formatText("italic")}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button
          onClick={() => formatText("justifyLeft")}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => formatText("justifyCenter")}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => formatText("insertUnorderedList")}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <select
          onChange={(e) => formatText("fontSize", e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded text-sm"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">X-Large</option>
        </select>
      </div>

      {/* Pages Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-100 p-6"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex gap-6 h-full min-w-max">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`bg-white rounded-lg shadow-lg border-2 transition-all duration-200 ${
                activePage === page.id
                  ? "border-blue-500 shadow-xl"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ width: "400px", minHeight: "600px" }}
            >
              {/* Page Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => updatePageTitle(page.id, e.target.value)}
                  className="font-semibold text-gray-800 bg-transparent border-none outline-none flex-1"
                  onFocus={() => setActivePage(page.id)}
                />
                {pages.length > 1 && (
                  <button
                    onClick={() => removePage(page.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Page Content */}
              <div
                contentEditable
                className="p-6 h-full min-h-96 outline-none text-gray-700 leading-relaxed"
                style={{
                  minHeight: "500px",
                  lineHeight: "1.6",
                }}
                onFocus={() => setActivePage(page.id)}
                onInput={(e) =>
                  updatePageContent(
                    page.id,
                    (e.target as HTMLDivElement).innerHTML,
                  )
                }
                onKeyDown={(e) => handleKeyDown(e, page.id)}
                dangerouslySetInnerHTML={{ __html: page.content }}
                data-placeholder="Start writing..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center justify-center gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => {
              setActivePage(page.id);
              // Scroll to the selected page
              const pageElement = document.querySelector(
                `[data-page-id="${page.id}"]`,
              );
              if (pageElement && scrollContainerRef.current) {
                const containerRect =
                  scrollContainerRef.current.getBoundingClientRect();
                const pageRect = pageElement.getBoundingClientRect();
                const scrollLeft =
                  pageRect.left -
                  containerRect.left +
                  scrollContainerRef.current.scrollLeft -
                  24;
                scrollContainerRef.current.scrollTo({
                  left: scrollLeft,
                  behavior: "smooth",
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              activePage === page.id
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            title={page.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiPageEditor;
