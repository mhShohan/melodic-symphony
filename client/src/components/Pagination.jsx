const Pagination = ({ currPage, totalPages, setCurrPage }) => {
  return (
    <div className='join'>
      <button
        disabled={currPage === 0}
        onClick={() => setCurrPage((p) => p - 1)}
        className='join-item btn text-3xl bg-slate-700 border-none outline-none'
      >
        «
      </button>
      <button className='join-item btn bg-slate-600 border-none outline-none'>
        Page {currPage + 1} of {totalPages}
      </button>
      <button
        disabled={totalPages === currPage + 1}
        onClick={() => setCurrPage((p) => p + 1)}
        className='join-item btn text-3xl bg-slate-700 border-none outline-none'
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
