import { useEffect, useState } from "react";

const AnimatedTitle = ({ text, nextTitle, setTitle }: {text: string, nextTitle: string, setTitle: (title: string) => void }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let currentIndex = isDeleting ? text.length : 0;
        let interval: number;

        const updateTitle = () => {
            if (isDeleting) {
                if (currentIndex > 0) {
                    setDisplayText(text.substring(0, currentIndex - 1));
                    currentIndex--;
                } else {
                    setIsDeleting(false);
                    setTitle(nextTitle);
                }
            } else {
                if (currentIndex < text.length) {
                    setDisplayText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }
        };

        interval = window.setInterval(updateTitle, 100);

        return () => clearInterval(interval);
    }, [text, isDeleting]);

    useEffect(() => {
        if (nextTitle && text !== nextTitle) {
            setIsDeleting(true);
        }
    }, [nextTitle]);

    return <span>{displayText}</span>;
};


export default AnimatedTitle;
