'use client';

import React, { useState } from 'react';

export default function WidgetsAndComponents() {
  const [widgets, setWidgets] = useState({
    calendar: true,
    charts: true,
    notifications: true,
    activity: true,
  });

  const toggleWidget = (widget) => {
    setWidgets((prevState) => ({
      ...prevState,
      [widget]: !prevState[widget],
    }));
  };

  return (
    <div className="space-y-6 px-6 py-4 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">Widgets and Components</h2>
      <p className="text-gray-600 text-sm">Manage which widgets and components should be visible on your dashboard.</p>

      {/* Widget Visibility Toggles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Widget Visibility</h3>
        <div className="space-y-3">
          {Object.keys(widgets).map((widget) => (
            <div key={widget} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={widgets[widget]}
                onChange={() => toggleWidget(widget)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm text-gray-700">{widget.charAt(0).toUpperCase() + widget.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Rearranging Widgets */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Rearrange Widgets</h3>
        <p className="text-gray-600 text-sm">Drag and drop widgets to rearrange their order on the dashboard.</p>
        <div className="space-y-3">
          <div className="p-4 bg-white border rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">Calendar</h4>
            <p className="text-gray-600 text-sm">Display your upcoming events and tasks.</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">Charts</h4>
            <p className="text-gray-600 text-sm">Visualize data trends and insights.</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">Notifications</h4>
            <p className="text-gray-600 text-sm">Get alerts for important updates.</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">Activity</h4>
            <p className="text-gray-600 text-sm">Track your recent activities and actions.</p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview</h3>
        <div className="space-y-4">
          {widgets.calendar && (
            <div className="p-4 bg-white border rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800">Calendar</h4>
              <p className="text-gray-600 text-sm">Your events and tasks will appear here.</p>
            </div>
          )}
          {widgets.charts && (
            <div className="p-4 bg-white border rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800">Charts</h4>
              <p className="text-gray-600 text-sm">Your data visualizations will appear here.</p>
            </div>
          )}
          {widgets.notifications && (
            <div className="p-4 bg-white border rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800">Notifications</h4>
              <p className="text-gray-600 text-sm">Recent notifications will appear here.</p>
            </div>
          )}
          {widgets.activity && (
            <div className="p-4 bg-white border rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800">Activity</h4>
              <p className="text-gray-600 text-sm">Recent activities will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
