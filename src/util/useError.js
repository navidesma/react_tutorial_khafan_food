import { useEffect, useState } from "react";

export default function useError() {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            const errorTimeout = setTimeout(() => {
                setError(false);
            }, 3000);

            return () => clearTimeout(errorTimeout);
        }
    }, [error]);

    return [error, setError];
}
