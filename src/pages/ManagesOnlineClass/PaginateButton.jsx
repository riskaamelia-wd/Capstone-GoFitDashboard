

const PaginateButton = ({handleNextPage, handlePrevPage, disabledNext, disabledPrevious}) => {
    return(
        <div className="d-flex justify-content-end mb-4">
        <button
            // disabled={currentPage == 1}
            disabled={disabledPrevious}
            onClick={handlePrevPage}
            className="btn-page border border-0 p-2 rounded-3 ">
                Previous
        </button>
        <button
            // disabled={data?.length < 10}
            disabled={disabledNext}
            onClick={handleNextPage}
            className="btn-page border border-0 p-2 ms-3 rounded-3">
                Next
        </button>
    </div>
    )
}

export default PaginateButton 