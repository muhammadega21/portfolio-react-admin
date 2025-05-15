import CircularProgress from "@mui/material/CircularProgress";

function CircleLoading({ size }) {
  return (
    <div>
      <CircularProgress color="white" size={size} />
    </div>
  );
}

export default CircleLoading;
