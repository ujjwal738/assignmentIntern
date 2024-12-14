import React, { useState, useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';
import './ImageMask.css'

const ImageMask = () => {
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 600, height: 400 });
  const canvasRef = useRef(null);
  const [brushRadius, setBrushRadius] = useState(5);
  const [showMask, setShowMask] = useState(false);
  const [maskDataURL, setMaskDataURL] = useState("");

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImageURL(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        // Ensure the image fits inside the canvas without resizing the canvas
        const aspectRatio = img.width / img.height;
        const canvasAspectRatio = canvasDimensions.width / canvasDimensions.height;

        if (aspectRatio > canvasAspectRatio) {
          setCanvasDimensions({ width: canvasDimensions.width, height: canvasDimensions.width / aspectRatio });
        } else {
          setCanvasDimensions({ width: canvasDimensions.height * aspectRatio, height: canvasDimensions.height });
        }
      };
    }
  };

  // Create mask logic
  const createMask = () => {
    const canvas = canvasRef.current.canvasContainer.children[1];
    const context = canvas.getContext('2d');

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const isDrawn = data[i + 3] > 0; // Alpha channel check
      if (isDrawn) {
        data[i] = 255;   // Set red channel to white
        data[i + 1] = 255; // Set green channel to white
        data[i + 2] = 255; // Set blue channel to white
        data[i + 3] = 255; // Fully opaque
      } else {
        data[i] = 0;     // Set red channel to black
        data[i + 1] = 0;   // Set green channel to black
        data[i + 2] = 0;   // Set blue channel to black
        data[i + 3] = 255; // Fully opaque
      }
    }

    context.putImageData(imageData, 0, 0);
    setShowMask(true);
    setMaskDataURL(canvas.toDataURL('image/png'));
  };

  // Export mask as image
  const exportMask = () => {
    const canvas = canvasRef.current.canvasContainer.children[1];
    const link = document.createElement('a');
    link.download = 'mask.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Clear canvas
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setShowMask(false);
      setMaskDataURL("");
    }
  };

  return (
    <div style={{ padding: "90px"}}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Image Upload and Mask Tool</h1>

      {/* File Upload */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <label htmlFor="fileUpload" className="btn-blue">
        Choose File
    </label>
    <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
    />
</div>

{/* Canvas */}
<div className="canvas-container">
  <CanvasDraw
    ref={canvasRef}
    imgSrc={uploadedImageURL} // Set uploaded image as background
    canvasWidth={canvasDimensions.width}
    canvasHeight={canvasDimensions.height}
    hideGrid
    brushRadius={brushRadius}
    className="canvas-draw" // Apply the canvas draw styles
  />
</div>


      {/* Brush Size Control */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
    <label htmlFor="brushSize" className="brush-label">Brush Size:</label>
    <input
        id="brushSize"
        type="range"
        min="1"
        max="50"
        value={brushRadius}
        onChange={(e) => setBrushRadius(Number(e.target.value))}
    />
    </div>


      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
    <button onClick={createMask} className="btn-blue">Save</button>
    <button onClick={exportMask} className="btn-blue">Export Mask</button>
    <button onClick={clearCanvas} className="btn-blue">Clear Canvas</button>
</div>


{/* Display Original and Mask Images */}
{showMask && maskDataURL && (
  <div className="image-container">
    <div className="image-box">
      <h2 className="image-title">Original Image</h2>
      <div className="image-wrapper">
        <img src={uploadedImageURL} alt="Original" className="image-style" />
      </div>
    </div>
    <div className="image-box">
      <h2 className="image-title">Generated Mask</h2>
      <div className="image-wrapper">
        <img src={maskDataURL} alt="Mask" className="image-style" />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ImageMask;
