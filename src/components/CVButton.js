"use client";

import { useState } from "react";

export default function CVButton({ cvUrl }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cvUrl) return alert("File CV tidak ditemukan.");
    
    try {
      setIsDownloading(true);
      
      const response = await fetch(cvUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = "CV_Joshua_Calvin.pdf"; 
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal mengunduh file:", error.message);
      window.open(cvUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-bright hover:text-primary border border-primary rounded-xl hover:bg-card/20 transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      {isDownloading ? "Downloading..." : "My CV"}
    </button>
  );
}