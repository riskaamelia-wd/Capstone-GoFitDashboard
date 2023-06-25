import ButtonComponent from "../../elements/Buttons/ButtonComponent"

const PaginationInvoices = ({page, totalItem, item, disabledPreInvoices, handlePrevInvoices, disabledNextInvoices, handleNextInvoices}) => {
    return(
        <div className='d-flex justify-content-between'>
        <p>Showing {page} to {item} of {totalItem} entries</p>
        <div className="d-flex flex-row">
            <button
                id="prevInvoices"
                disabled={disabledPreInvoices}
                onClick={handlePrevInvoices}
                className={` border border-1 p-2 ps-3 pe-3 rounded-3 ${disabledPreInvoices ? 'btn-dis-invoices' : 'btn-invoices'}`}
            >
                Previous
            </button>
            <ButtonComponent
                buttonName={page}
                className={'btn-off p-2 ps-3 pe-3 ms-3 me-3 border border-1'}
            />
            <button
                disabled={disabledNextInvoices}
                onClick={handleNextInvoices}
                className={` border border-1 p-2 ps-3 pe-3 rounded-3  ${disabledNextInvoices ? 'btn-dis-invoices' : 'btn-invoices'}`}
            >
                    Next
            </button>
        </div>
    </div>
    )
}

export default PaginationInvoices