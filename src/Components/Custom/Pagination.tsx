export const Pagination = ({ currentPage, numberOfPages, changeCurrentPage }:{
    currentPage: number;
    numberOfPages: number;
    changeCurrentPage: (page: number) => void;
}) => {
    const pages = [];

    // Always show the first page
    pages.push(1);

    // Add pages close to the current one (but not too many)
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(numberOfPages - 1, currentPage + 2);

    if (start > 2) pages.push("..."); // Left Ellipsis
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < numberOfPages - 1) pages.push("..."); // Right Ellipsis

    // Always show the last page
    if (numberOfPages > 1) pages.push(numberOfPages);

    return (
        <div className="flex justify-center items-center mt-8 mb-4" dir="ltr">
            {/* Previous Button */}
            <button
                onClick={() => changeCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-[#BBC3CF] text-black hover:bg-gray-100 rounded-s-lg disabled:opacity-50"
                aria-label="الصفحة السابقة"
            >
                &lt;
            </button>

            {/* Page Numbers */}
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && changeCurrentPage(page)}
                    disabled={typeof page !== "number"}
                    className={`px-3 py-1 flex items-center justify-center border 
                        ${currentPage === page
                            ? "bg-[#BBC3CF] text-black font-bold"
                            : "text-black bg-[#F7F8F9] border-slate-300"
                        } ${page === "..." ? "cursor-default text-gray-500" : ""}`}
                    aria-label={typeof page === "number" ? `الصفحة ${page}` : "إخفاء"}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => changeCurrentPage(Math.min(numberOfPages, currentPage + 1))}
                disabled={currentPage === numberOfPages}
                className="px-3 py-1 bg-[#BBC3CF] text-black hover:bg-gray-100 rounded-e-lg disabled:opacity-50"
                aria-label="الصفحة التالية"
            >
                &gt;
            </button>
        </div>
    );
};
