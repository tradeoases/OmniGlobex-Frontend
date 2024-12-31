const BuyersFooter = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center space-x-4 w-full">
        <a href="/terms-condition" className="hover:underline">
          Terms of Use
        </a>
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>

        <a href="/faq" className="hover:underline">
          FAQ
        </a>
        <a href="/cookie-policy" className="hover:underline">
          Cookie Policy
        </a>
      </div>
      <div className="mt-2">
        Copyright © 2024 OmniGlobex. All rights reserved.
      </div>
    </footer>
  );
};

export default BuyersFooter;
