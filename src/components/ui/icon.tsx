const Icon = ({
  name,
  width,
  height,
  className,
}: {
  name: string;
  width: string;
  height: string;
  className?: string;
}) => {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={`/icons-sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
