import { useEffect, useRef } from "react";

export default function useLazyLoading() {
  const target = useRef(null);
  useEffect(() => {
    if (!target.current) {
      return;
    }
    let observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImg = entry.target;
          lazyImg.src = lazyImg.dataset.src;
        }
      });
    });
    observer.observe(target.current);
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [target]);

  return { target };
}
