const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-gray-400 text-sm py-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <span>Powered by</span>
        <span className="font-bold flex items-center">
          <img src="/bitnovo-logo.png" alt="Bitnovo" className="h-5 w-auto" />
          <span className="text-gray-400">Bitnovo.</span>
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
