import React, { useEffect, useState } from 'react';

export default function DebugWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 bg-black/50 text-white p-2 rounded">
            Width: {width}px
        </div>
    );
}