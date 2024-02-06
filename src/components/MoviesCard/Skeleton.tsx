import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    width={250}
    height={380}
    viewBox="0 0 250 380"
    backgroundColor="#969292"
    foregroundColor="#cac4c4"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="250" height="380" />
  </ContentLoader>
);

export default Skeleton;
