import React from "react";

const PaginationButtons = ({ currentPage, onPreviousClick, onNextClick }) => {
  return (
    <div className="flex justify-center gap-4 py-8">
      <button
        onClick={onPreviousClick}
        disabled={currentPage === 1}
        className="bg-black hover:bg-yellow-400 text-white hover:text-black px-6 py-2 disabled:opacity-50"
      >
        ←
      </button>
      <button
        onClick={onNextClick}
        className="bg-black hover:bg-yellow-400 text-white hover:text-black px-6 py-2"
      >
        →
      </button>
    </div>
  );
};

export default PaginationButtons;
