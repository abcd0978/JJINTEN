import React, { useRef, useEffect } from "react";
export default function useIntersectionObserver(callback) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("언터섹트");
            callback();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element) => {
    console.log("훅:관찰 유지");
    observer.current.observe(element);
  };

  const unobserve = (element) => {
    console.log("훅: 관찰 풀음");
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
}
