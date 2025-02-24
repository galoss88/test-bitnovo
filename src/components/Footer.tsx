const Footer = () => {
  return (
    <footer className="flex justify-center items-center border-none text-sm py-4  bg-white">
      <div className="flex items-center gap-2">
        <span>Powered by</span>
        <span className="font-bold flex items-center">
          <img src="/asd.png" alt="Bitnovo" className="h-14 w-auto " />
        </span>
        <svg width="2" height="33" viewBox="0 0 2 40" className="text-gray-400 opacity-50">
          <rect width="1.6" height="40" fill="currentColor" />
        </svg>

        <span className="text-gray-400">
          &copy; 2022 Bitnovo. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
