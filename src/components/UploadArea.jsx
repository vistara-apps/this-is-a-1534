import React, { useState, useRef } from 'react';
import { Upload, Image, X } from 'lucide-react';

export function UploadArea({ onFileSelect, selectedFile }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="relative bg-surface rounded-lg p-4 shadow-card">
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-bg rounded-lg flex items-center justify-center">
              <Image className="w-8 h-8 text-textSecondary" />
            </div>
            <div>
              <p className="font-medium text-textPrimary">{selectedFile.name}</p>
              <p className="text-sm text-textSecondary">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-textSecondary/30 hover:border-primary hover:bg-primary/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-textSecondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-textPrimary mb-2">
            Upload Product Image
          </h3>
          <p className="text-textSecondary mb-4">
            Drag and drop your product image here, or click to browse
          </p>
          <p className="text-sm text-textSecondary">
            Supports: JPG, PNG, GIF (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}