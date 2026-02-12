import { useTransitionRouter } from "next-view-transitions";

const AnimationLink = ({ path, link, children, className }) => {
  const router = useTransitionRouter();

  console.log(link, "link");

  if (!path && link && !link.url && !link.email && !link.internalLink) return <>{children}</>;

  let isInternal;
  let isExternal;
  let href = path;

  if (link) {
    isInternal = link.type === "internal";
    isExternal = link.type === "external";

    href =
      link.type === "internal"
        ? `/${link.internalLink.slug.current}`
        : link.type === "external"
          ? link.url
          : link.type === "email"
            ? `mailto:${link.email}`
            : "#";
  }

  if (!href) return <>{children}</>;

  const pageAnimation = () => {
    document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 500,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    });

    document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 500,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    });
  };

  const handleClick = (e) => {
    // if (!isInternal) return;

    e.preventDefault();
    router.push(href, {
      onTransitionReady: pageAnimation,
    });
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

export default AnimationLink;
