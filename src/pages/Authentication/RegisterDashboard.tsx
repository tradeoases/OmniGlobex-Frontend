import { Link } from "react-router-dom";
import img from "../../assets/omniGlobexlogo.png";
import { Logo } from "@/components/logo";

const RegisterDashboard = () => {
  return (
    <header className="bg-white border sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <img src={img} alt="Omniglobex logo" className="h-12 w-auto" />

          <Link
            to="/"
            className="text-gray-900 hover:text-blue-600 font-medium"
          >
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default RegisterDashboard;
