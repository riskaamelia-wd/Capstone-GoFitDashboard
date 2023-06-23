

const PaginateButton = ({handleNextPage, handlePrevPage, disabledNext, disabledPrevious}) => {
    return(
        <div className="d-flex justify-content-end mb-4">
        <button
            // disabled={currentPage == 1}
            disabled={disabledPrevious}
            onClick={handlePrevPage}
            className={` border border-0 p-2 rounded-3 ${disabledPrevious ? 'btn-dnone' : 'btn-class'}`}
        >
            Previous
        </button>
        <button
            // disabled={data?.length < 10}
            disabled={disabledNext}
            onClick={handleNextPage}
            className={` border border-0 p-2 rounded-3 ms-2 ${disabledNext ? 'btn-dnone' : 'btn-class'}`}
        >
                Next
        </button>
    </div>
    )
}

export default PaginateButton 