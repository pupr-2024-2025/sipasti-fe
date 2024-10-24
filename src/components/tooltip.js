import React, { useState, useRef, useEffect } from 'react';

// Tooltip component
const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef();
  const targetRef = useRef();

  // Show the tooltip on mouse over
  const showTooltip = () => {
    setVisible(true);
  };

  // Hide the tooltip on mouse out
  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    // Adjust tooltip position based on available space
    if (visible && tooltipRef.current && targetRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const spaceAbove = targetRect.top; // Space above the target
      const spaceBelow = window.innerHeight - targetRect.bottom; // Space below the target

      if (spaceAbove < tooltipRect.height + 8 && spaceBelow > tooltipRect.height) {
        // If not enough space above, position below with an 8px margin
        tooltipRef.current.style.top = `${targetRect.bottom + window.scrollY + 8}px`;
      } else {
        // Position above with an 8px margin
        tooltipRef.current.style.top = `${targetRect.top - tooltipRect.height + window.scrollY - 8}px`;
      }
    }
  }, [visible]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={targetRef} // Reference for the target element
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg transition-opacity duration-200"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: visible ? 1 : 0,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
