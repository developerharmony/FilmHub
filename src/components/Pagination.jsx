import React from "react";
import Button from "./ui/Button";

const Pagination = ({ currentPage, totalPages, onPageChange, theme }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "" : `${theme.colors.primary} text-white hover:opacity-90`}
      >
        <i className="fas fa-chevron-left mr-2"></i>
        Önceki
      </Button>
      <div className="flex space-x-1">
        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={
                currentPage === pageNum
                  ? `${theme.colors.primary} text-white`
                  : `${theme.colors.cardBg} ${theme.colors.text} hover:opacity-80`
              }
            >
              {pageNum}
            </Button>
          );
        })}
      </div>
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "" : `${theme.colors.primary} text-white hover:opacity-90`}
      >
        Sonraki
        <i className="fas fa-chevron-right ml-2"></i>
      </Button>
    </div>
  );
};

export default Pagination;