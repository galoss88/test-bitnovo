const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center border-none text-sm py-6 bg-white fixed bottom-0 left-0">
      <div className="w-full max-w-screen-xl px-4 flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-bold flex items-center">
            <img src="/asd.png" alt="Bitnovo" className="h-10 md:h-14 w-auto" />
          </span>
        </div>

        <svg width="2" height="33" viewBox="0 0 2 40" className="text-gray-400 opacity-50">
          <rect width="1.6" height="40" fill="currentColor" />
        </svg>

        <span className="text-gray-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} Bitnovo. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
