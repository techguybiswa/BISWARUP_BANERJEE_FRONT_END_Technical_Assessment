import { Box, Skeleton } from "@mui/material";
interface LoadingSkeletonProps {
  height?: string;
  width?: string;
}
export default function LoadingSkeleton(props: LoadingSkeletonProps) {
  const { height, width } = props;
  return (
    <Box sx={{ width: height ?? "100%", height: width ?? "400px" }}>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
