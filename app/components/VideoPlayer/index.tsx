import type { FC } from "react";
import ReactPlayer from "react-player";

type Props = {
  url: string;
};

const VideoPlayer: FC<Props> = ({ url }) => {
  return <ReactPlayer controls url={url} width="100%" height="100%" />;
};

export default VideoPlayer;
