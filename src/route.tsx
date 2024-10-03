import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/staticpages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-us/about-page";
import LoginPage from "./pages/Authentication/login-page";
import TrackOrderPage from "./pages/cartandcheckout/track-order-page";
import ProfilePage from "./pages/user/profile-page";
import SingleProduct from "./pages/products/single-product-page";
import { PrivacyPolicyPage } from "./pages/privacy-policy/privacy-policy-page";
import VerifyEmailPage from "./pages/Authentication/verify-email-page";
import ForgotPasswordPage from "./pages/Authentication/forgot-password";
import WishListPage from "./pages/cartandcheckout/wish-list-page";
import ShoppingCartPage from "./pages/cartandcheckout/shopping-cart-page";
import CheckoutPage from "./pages/cartandcheckout/checkout-page";
import BlogPage from "./pages/Blogs/blog-page";
import ContactPage from "./pages/staticpages/contact-page";
import FaqPage from "./pages/staticpages/faq-page";
import ShowRoomPage from "./pages/products/show-room-page";
import IntegratedSignup from "./pages/Authentication/IntegratedSignup";
import CreateBusiness from "./pages/BusinessInformation/CreateBusiness";
import { TermsPage } from "./pages/privacy-policy/terms-page";
import { CookiesPolicyPage } from "./pages/privacy-policy/cookies-page";
import BlogDetails from "./pages/Blogs/components/blog-details";
import BusinessDetailPage from "./pages/user/pages/BusinessDetailPage";
import AddBusinessUserPage from "./pages/BusinessInformation/add-business-user";
import AddBusinessLocation from "./pages/BusinessInformation/add-business-location";
import DashboardLayout from "./pages/user/DashboardLayout";
import { Overview } from "./components/profile-dashboard/overview";
import Messages from "./pages/user/buyer-profile/Messages";
import BuyerDashboard from "./pages/user/buyer-profile/BuyerDashboard";
import BuyersShowRoom from "./pages/user/buyer-profile/BuyersShowRoom";
import RFQManagement from "./pages/user/buyer-profile/RFQManagement";
import OrderTracking from "./pages/user/buyer-profile/OrderTracking";
import Ratings from "./pages/user/buyer-profile/Ratings";
import BuyerAccount from "./pages/user/buyer-profile/BuyerAccount";
import MyFavorites from "./pages/user/buyer-profile/MyFavorite";
import SourcingPreferences from "./pages/user/buyer-profile/SourcingPreferences";
import SecuritySettings from "./pages/user/buyer-profile/SecuritySettings";
import BuyerSettings from "./pages/user/buyer-profile/BuyerSettings";
import ChangePassword from "./pages/user/buyer-profile/ChangePassword";
import Notifications from "./pages/user/buyer-profile/Notifications";
import QuickMessage from "./pages/user/buyer-profile/QuickMessage";
import BuyersProfile from "./pages/user/buyer-profile/BuyersProfile";
import StripeSuccessPage from "./pages/BusinessInformation/StripeSuccessPage";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetails />} />

      {/* Buyer Dashboard Route */}
      <Route path="buyer-dashboard" element={<BuyerDashboard />}>
        <Route path="home" element={<Messages />} />
        <Route path="messages" element={<Messages />} />
        <Route path="showRoom" element={<BuyersShowRoom />} />
        <Route path="rfq" element={<RFQManagement />} />
        <Route path="orders" element={<OrderTracking />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="settings" element={<BuyerSettings />}>
          <Route path="security" element={<SecuritySettings />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="quick-messages" element={<QuickMessage />} />
        </Route>
        <Route path="myAccount" element={<BuyerAccount />}>
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="profile" element={<BuyersProfile />} />
          <Route path="preferences" element={<SourcingPreferences />} />
        </Route>
      </Route>
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="terms-condition" element={<TermsPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="signup" element={<IntegratedSignup />} />
      <Route path="/create-business" element={<CreateBusiness />} />
      <Route path="/business/:businessId" element={<BusinessDetailPage />} />
      <Route
        path="/business/:businessId/add-user"
        element={<AddBusinessUserPage />}
      />
      <Route
        path="/business/:businessId/add-location"
        element={<AddBusinessLocation />}
      />
      <Route path="/supplier-dashboard" element={<ProfilePage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
      </Route>
      <Route path="/subscription/success" element={<StripeSuccessPage />} />
      <Route path="/single-product" element={<SingleProduct />} />
      <Route path="/show-room" element={<ShowRoomPage />} />
      <Route path="cookie-policy" element={<CookiesPolicyPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
