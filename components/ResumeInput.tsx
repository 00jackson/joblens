"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = {
  onSubmit: (resumeText: string, category: string) => void;
};

export default function ResumeInput({ onSubmit }: Props) {
  const [resume, setResume] = useState("");
  const [category, setCategory] = useState("any");
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    if (resume.trim()) {
      onSubmit(resume, category);
    }
  };

  return (
    <div className="space-y-8">
      {/* Animated resume input */}
      <div className="relative group">
        <div className='opacity-75'></div>
        <div className="relative">
          <Label htmlFor="resume" className="block mb-3 text-sm font-medium text-gray-700">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Paste Your Resume</span>
          </Label>
          <Textarea
            id="resume"
            placeholder="Drop your resume here... (Pro tip: Copy-paste from your LinkedIn profile)"
            rows={8}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-h-[220px] w-full bg-white/90 backdrop-blur-sm border-gray-200/80 focus:border-transparent focus:ring-2 focus:ring-blue-300/50 shadow-lg transition-all duration-200 rounded-xl"
          />
        </div>
      </div>

      {/* Enhanced action row */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end">
        {/* Glass-morphic category selector */}
        <div className="w-full sm:w-auto relative group">
          <div className="absolute -inset-0.5 bg-blue-100/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <Label className="block mb-3 text-sm font-medium text-gray-700">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Target Role</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white/80 backdrop-blur-sm border-gray-200/80 hover:border-gray-300 focus:ring-2 focus:ring-blue-300/50 shadow-sm transition-all duration-200 rounded-xl pl-4">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-sm border-gray-200/80 shadow-lg rounded-xl overflow-hidden">
                <SelectItem 
                  value="any" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <GlobeIcon className="w-4 h-4 text-blue-500" />
                    Any Field
                  </span>
                </SelectItem>
                <SelectItem 
                  value="frontend" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <CodeIcon className="w-4 h-4 text-blue-500" />
                    Frontend
                  </span>
                </SelectItem>
                <SelectItem 
                  value="backend" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <ServerIcon className="w-4 h-4 text-blue-500" />
                    Backend
                  </span>
                </SelectItem>
                <SelectItem 
                  value="data" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <DatabaseIcon className="w-4 h-4 text-blue-500" />
                    Data Science
                  </span>
                </SelectItem>
                <SelectItem 
                  value="design" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <PaletteIcon className="w-4 h-4 text-blue-500" />
                    Design
                  </span>
                </SelectItem>
                <SelectItem 
                  value="product" 
                  className="hover:bg-blue-50/80 focus:bg-blue-50/80 transition-colors duration-150 py-3"
                >
                  <span className="flex items-center gap-2">
                    <LayoutIcon className="w-4 h-4 text-blue-500" />
                    Product
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Glowing CTA button */}
        <Button 
          onClick={handleClick}
          disabled={!resume.trim()}
          className="relative w-full sm:w-auto py-3 overflow-hidden group rounded-xl"
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          <span className="relative flex items-center gap-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <span className="font-medium tracking-wide">Find Dream Jobs</span>
          </span>
        </Button>
      </div>
    </div>
  );
}

// Icon components (add these above the main component)
function GlobeIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10 4 10 0 0 0-10-10zm0 0v8m0 0a2 2 0 1 0 2 2" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

function ServerIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6" y2="6" />
      <line x1="6" y1="18" x2="6" y2="18" />
    </svg>
  );
}

function DatabaseIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function PaletteIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2a10 10 0 0 0-1 20 10 10 0 0 0 1-20z" />
    </svg>
  );
}

function LayoutIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}