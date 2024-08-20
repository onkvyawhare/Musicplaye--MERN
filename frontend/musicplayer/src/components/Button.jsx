import React from 'react';



const Button = ({
  type = 'button',
  color = '',
  fullWidth = false,
  isLoading = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`py-3 px-8 flex text-xl font-bold text-black
       bg-[#1db954] border-none rounded-full cursor-pointer hover:bg-[#1aa74c]`}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <img src={btnLoading} alt="loading snipper" /> : children}
    </button>
  );
};

export default Button;