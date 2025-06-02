export const Hamburger = ({
  open,
  close,
  status,
}: {
  open: () => void;
  close: () => void;
  status: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status) {
      close();
    } else {
      open();
    }
  };

  return (
    <div className="md:hidden flex">
      <button
        onClick={handleClick}
        className="relative group focus:outline-none"
        onBlur={close}
      >
        <div className="relative flex overflow-hidden items-center justify-center w-[30px] h-[20px] transform transition-all duration-200">
          <div className="flex flex-col justify-between w-[15px] h-[13px] transform transition-all duration-300 origin-center overflow-hidden">
            <div
              className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                status ? "translate-x-10" : ""
              }`}
            ></div>
            <div
              className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${
                status ? "translate-x-10" : ""
              }`}
            ></div>
            <div
              className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 ${
                status ? "translate-x-10" : ""
              }`}
            ></div>

            <div
              className={`absolute items-center justify-between transform transition-all duration-500 top-1.5 ${
                status ? "translate-x-0 w-12" : "-translate-x-10 w-0"
              } flex`}
            >
              <div
                className={`absolute bg-white h-[2px] w-4 transform transition-all duration-500 delay-300 ${
                  status ? "rotate-45" : "rotate-0"
                }`}
              ></div>
              <div
                className={`absolute bg-white h-[2px] w-4 transform transition-all duration-500 delay-300 ${
                  status ? "-rotate-45" : "rotate-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
