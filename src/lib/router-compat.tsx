import React, { useState, useEffect } from "react";

const NAV_EVENT = "tavbook_navigation";

export function getCurrentRoute(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

export function navigateTo(to: string) {
  if (typeof window === "undefined") return;
  if (to === window.location.pathname) return;
  window.history.pushState(null, "", to);
  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: to }));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function useCurrentRoute() {
  const [route, setRoute] = useState<string>(getCurrentRoute());

  useEffect(() => {
    const handleNav = () => {
      setRoute(getCurrentRoute());
    };
    window.addEventListener("popstate", handleNav);
    window.addEventListener(NAV_EVENT, handleNav);
    return () => {
      window.removeEventListener("popstate", handleNav);
      window.removeEventListener(NAV_EVENT, handleNav);
    };
  }, []);

  return route;
}

export function Link({
  to,
  href,
  children,
  className,
  onClick,
  style,
  target,
  rel,
  replace,
  ...props
}: any) {
  const targetHref = to || href || "#";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    // Check if it's external or has target="_blank"
    if (
      target === "_blank" ||
      typeof targetHref !== "string" ||
      targetHref.startsWith("http") ||
      targetHref.startsWith("//")
    ) {
      return;
    }

    e.preventDefault();
    if (targetHref.startsWith("#")) {
      const el = document.querySelector(targetHref);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (replace) {
      window.history.replaceState(null, "", targetHref);
      window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: targetHref }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateTo(targetHref);
    }
  };

  return (
    <a
      href={targetHref}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

export function useNavigate() {
  return ({ to, replace }: { to: string; replace?: boolean }) => {
    if (replace) {
      window.history.replaceState(null, "", to);
      window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: to }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateTo(to);
    }
  };
}

export function createFileRoute(_path: string) {
  return (config: any) => config;
}
