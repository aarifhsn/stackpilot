import { useEffect, useRef, useState } from 'react';

export function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            {
                threshold: 0, // trigger as soon as 1px is visible
                rootMargin: '0px 0px -50px 0px', // trigger 50px before it enters viewport
            },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}
