const Footer = () => {
  return (
    <footer className="flex justify-center items-center border-none text-sm py-4  bg-white">
      <div className="flex items-center gap-2">
        <span>Powered by</span>
        <span className="font-bold flex items-center">
          <img src="/asd.png" alt="Bitnovo" className="h-14 w-auto " />
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-400">
          &copy; 2022 Bitnovo. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
