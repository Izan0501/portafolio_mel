import { useState, useEffect, useCallback } from "react";

type AppView = "home" | "about";

function getViewFromHash(): AppView {
  return window.location.hash === "#about" ? "about" : "home";
}

export function useAppView() {
  const [view, setViewState] = useState<AppView>(getViewFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setViewState(getViewFromHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigateTo = useCallback((target: AppView) => {
    window.location.hash = target === "about" ? "#about" : "";
    // hashchange fires automatically; also force scroll-to-top for same-hash edge case
    if (getViewFromHash() === target) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setViewState(target);
    }
  }, []);

  return { view, navigateTo };
}
