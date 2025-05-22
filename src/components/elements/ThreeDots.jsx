import "./index.css";

function ThreeDots({ size = 10 }) {
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="threeDots">
      <div className="dots" style={dotStyle} />
      <div className="dots" style={dotStyle} />
      <div className="dots" style={dotStyle} />
    </div>
  );
}

export default ThreeDots;
