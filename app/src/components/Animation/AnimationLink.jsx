import { useAnimatedNavigation } from "./hooks/useAnimatedNavigation";

const AnimationLink = ({ path, link, children, className, onMouseEnter, onMouseLeave }) => {
  const navigate = useAnimatedNavigation();

  let href;
  if (link) {
    href =
      link.type === "internal"
        ? `/${link.internalLink.slug.current}`
        : link.type === "external"
          ? link.url
          : link.type === "email"
            ? `mailto:${link.email}`
            : "#";
  } else {
    href = path;
  }

  if (!href) return <>{children}</>;

  const handleClick = (e) => {
    e.preventDefault();
    navigate(href);
  };

  const isExternal = link?.type === "external";

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={onMouseEnter} // <--- add
      onMouseLeave={onMouseLeave} // <--- add
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

export default AnimationLink;
