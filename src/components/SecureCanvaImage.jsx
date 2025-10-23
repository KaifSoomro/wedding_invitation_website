import React, { useRef, useEffect } from "react";

const SecureCanvasImage = ({ src }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (src && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      onContextMenu={(e) => e.preventDefault()}
      className="w-[400px] h-auto absolute ms-40 shadow-xl"
    />
  );
};

export default SecureCanvasImage