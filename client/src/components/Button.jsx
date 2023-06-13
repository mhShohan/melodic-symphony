const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className='dark:bg-cyan-500 dark:text-slate-900 text-slate-100 bg-cyan-900 font-semibold py-2 px-10 rounded'
    >
      {children}
    </button>
  );
};

Button.defaultProps = { type: 'button' };

export default Button;
