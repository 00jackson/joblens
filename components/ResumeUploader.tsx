"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

type Props = {
  onExtracted: (text: string) => void;
};

export default function ResumeUploader({ onExtracted }: Props) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      let text = "";

      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          text += strings.join(" ") + "\n";
        }
      } else {
        setError("Only .txt or .pdf files are supported.");
        return;
      }

      onExtracted(text.trim());
    } catch (err) {
      console.error("Error parsing file:", err);
      setError("Failed to extract text from the file.");
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="resumeFile">Upload Resume (.txt or .pdf)</Label>
      <input
        type="file"
        accept=".txt,.pdf"
        id="resumeFile"
        onChange={handleFile}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:bg-muted file:text-sm"
      />

      {fileName && <p className="text-muted-foreground text-sm">📎 Uploaded: {fileName}</p>}
      {error && <p className="text-red-500 text-sm">⚠️ {error}</p>}
    </div>
  );
}