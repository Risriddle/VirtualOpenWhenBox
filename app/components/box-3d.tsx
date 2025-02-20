import React from "react";

import "./AnimatedBox.css"; 

const Box3D: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const handleAnimationEnd = () => {
    onAnimationComplete(); 
  };
  
  
  return (
    <div id="root">
            <div className="sc-bdVaJa hCqOlD" onAnimationEnd={handleAnimationEnd}>
        <div className="sc-bwzfXH biqWkE">
          <div className="sc-htpNat kGQype">
            <div className="sc-bxivhb sc-dnqmqq ZEDDw">
              <div className="sc-iwsKbI ekMwXW"></div>
              <div className="sc-gZMcBi fujrhZ"></div>
              <div className="sc-gqjmRU jRAgJu"></div>
              <div className="sc-VigVT gpuqLL"></div>
            </div>
            <div className="sc-bxivhb sc-ifAKCX kLAltZ"></div>
            <div className="sc-bxivhb sc-EHOje gvPWuP"></div>
            <div className="sc-bxivhb sc-bZQynM ldKBkL"></div>
            <div className="sc-bxivhb sc-gzVnrw fFMyeM"></div>
            <div className="sc-bxivhb sc-htoDjs crPZsS"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box3D;






