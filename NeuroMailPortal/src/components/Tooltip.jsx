import React, { useState } from 'react';

const Tooltip = ({ children, message, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  const tooltipStyle = {
    position: 'absolute',
    backgroundColor: '#3b3b3b',
    color: '#fff',
    padding: '3px 10px',
    borderRadius: '4px',
    visibility: visible ? 'visible' : 'hidden',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s',
    whiteSpace: 'nowrap',
    zIndex: 1000,
  };

  // Position adjustment based on the "top", "bottom", "left", or "right" values
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { top: '50%', right: '100%', transform: 'translateY(-50%)' };
      case 'right':
        return { top: '50%', left: '100%', transform: 'translateY(-50%)' };
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      <div style={{ ...tooltipStyle, ...getPositionStyle() }} className='font-sans text-[12px]'>
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
