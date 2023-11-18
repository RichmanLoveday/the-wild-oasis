import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = false) {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                //    console.log("Click outside");
                handler();
            }
        };
        document.addEventListener("click", handleClick, listenCapturing);

        return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, listenCapturing]);

    return ref;
}