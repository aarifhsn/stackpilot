import { useEffect, useRef, useState } from 'react';

export function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const check = () => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                setVisible(true);
                return true;
            }
            return false;
        };

        // Delay to let Inertia/browser finish rendering + scrolling to hash
        const timer = setTimeout(() => {
            if (!check()) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) setVisible(true);
                    },
                    {
                        threshold: 0,
                        rootMargin: '0px 0px -50px 0px',
                    },
                );
                observer.observe(el);
                // store cleanup
                el._fadeObserver = observer;
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            el._fadeObserver?.disconnect();
        };
    }, []);

    return [ref, visible];
}
