'use client';

import React, { useState } from 'react';

export default function ThemePreset() {
  const [themePreset, setThemePreset] = useState<string>('default');

  const themePresets = {
    default: {
      primaryColor: '#6366F1', // Default purple
      secondaryColor: '#F43F5E', // Default pink
      backgroundColor: '#f3f4f6', // Light gray
      textColor: '#333', // Dark text
    },
    darkMode: {
      primaryColor: '#10B981', // Green
      secondaryColor: '#FF6161', // Red
      backgroundColor: '#1F2937', // Dark background
      textColor: '#E5E7EB', // Light text
    },
    lightMode: {
      primaryColor: '#3B82F6', // Blue
      secondaryColor: '#F59E0B', // Amber
      backgroundColor: '#ffffff', // White background
      textColor: '#1F2937', // Dark text
    },
    vibrant: {
      primaryColor: '#F43F5E', // Pink
      secondaryColor: '#F59E0B', // Amber
      backgroundColor: '#D1D5DB', // Light gray
      textColor: '#333', // Dark text
    },
  };

  const handlePresetChange = (preset) => {
    setThemePreset(preset);
    const { primaryColor, secondaryColor, backgroundColor, textColor } = themePresets[preset];
    
    // Apply theme styles dynamically (you can also use CSS variables here)
    document.body.style.setProperty('--primary-color', primaryColor);
    document.body.style.setProperty('--secondary-color', secondaryColor);
    document.body.style.setProperty('--background-color', backgroundColor);
    document.body.style.setProperty('--text-color', textColor);
  };

  return (
    <div className="space-y-6 px-6 py-4 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">Theme Preset Settings</h2>
      <p className="text-gray-600 text-sm">Choose a preset theme for your dashboard.</p>

      {/* Theme Preset Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Select Theme Preset</h3>
        <div className="flex space-x-4">
          {Object.keys(themePresets).map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetChange(preset)}
              className={`px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition-all border focus:outline-none focus:ring-2 focus:ring-offset-2
                ${themePreset === preset ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview</h3>
        <div
          className="w-full h-32 rounded-lg shadow-md flex items-center justify-center text-sm font-medium"
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
            borderColor: `var(--primary-color)`,
          }}
        >
          <div
            className="w-20 h-20 rounded-full"
            style={{
              backgroundColor: `var(--primary-color)`,
            }}
          />
          <span className="ml-4">Theme Preview</span>
        </div>
      </div>
    </div>
  );
}
