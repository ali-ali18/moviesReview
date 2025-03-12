import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function scrollTop () {
    const {pathname} = useLocation()

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        window.scrollTo(0, 0)
        return () => window.scrollTo(0, 0)
    }, [pathname, ])
}