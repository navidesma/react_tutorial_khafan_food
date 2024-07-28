import { useState } from "react";

export default function usePagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    return {currentPage, setCurrentPage, count, setCount};
}