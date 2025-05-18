export const Hamburger = () => {
  return (
    <div className="md:hidden flex">
      <button className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center w-[30px] h-[20px] transform transition-all duration-200">
          <div className="flex flex-col justify-between w-[15px] h-[13px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
            <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>

            <div className="absolute items-center justify-between transform transition-all duration-500 top-1.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
              <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
              <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
