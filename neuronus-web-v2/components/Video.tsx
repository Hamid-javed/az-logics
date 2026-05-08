interface VideoProps {
  src: string;
  className?: string;
}

const Video = ({ className = "", src }: VideoProps) => {
  return (
    <video autoPlay loop muted playsInline preload="none" className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default Video;
