import { useEffect } from "react";

function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    // runs when a click happens anywhere on the page
    const handleOutesideClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.closest(`#${exeptionId}`)
      ) {
        cb();
      }
    };

    // Attach listener on document to capture clicks
    document.addEventListener("mousedown", handleOutesideClick);

    // remove listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutesideClick);
    };
  }, [ref, cb, exeptionId]);
}

export default useOutsideClick;
