import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/staticpages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-us/about-page";
import LoginPage from "./pages/Authentication/login-page";
import TrackOrderPage from "./pages/cartandcheckout/track-order-page";
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
import IntegratedSignup from "./pages/Authentication/IntegratedSignup";
import { TermsPage } from "./pages/privacy-policy/terms-page";
import { CookiesPolicyPage } from "./pages/privacy-policy/cookies-page";
import BlogDetails from "./pages/Blogs/components/blog-details";
import DashboardLayout from "./pages/user/DashboardLayout";
import { Overview } from "./components/profile-dashboard/overview";
import BuyersShowRoom from "./pages/user/buyer-profile/BuyersShowRoom";
import OrderTracking from "./pages/user/buyer-profile/OrderTracking";
import Ratings from "./pages/user/buyer-profile/Ratings";
import BuyerAccount from "./pages/user/buyer-profile/BuyerAccount";
import MyFavorites from "./pages/user/buyer-profile/MyFavorite";
import SourcingPreferences from "./pages/user/buyer-profile/SourcingPreferences";
import SecuritySettings from "./pages/BuyersAuthentication/SecuritySettings";
// import BuyerSettings from "./pages/user/buyer-profile/BuyerSettings";
import ChangePassword from "./pages/supplier-authentication/change-password";
import Notifications from "./pages/user/buyer-profile/Notifications";
import QuickMessage from "./pages/user/buyer-profile/QuickMessage";
import BuyersProfile from "./pages/user/buyer-profile/BuyersProfile";
import StripeSuccessPage from "./pages/BusinessInformation/StripeSuccessPage";
import AllProductsPage from "./pages/products/all-products-page";
import { ProductManagement } from "./pages/user/pages/product-management";
import SupplierProfile from "./pages/user/supplier-profile/SupplierProfile";
import { BuyerOrder } from "./components/buyer-order";
import AnalyticsAndReporting from "./pages/user/supplier-profile/Analytics";
import { ReviewsDashboard } from "./components/reviews-dashbaord";
import Subscriptions from "./pages/user/pages/Subscriptions";
import App from "./App";
import SuppliersDashboard from "./pages/user/profile-page";
import BuyerDashboard from "./pages/user/buyer-profile/BuyerDashboard";
import ResetPassword from "./pages/Authentication/reset-page";
import RFQManagement from "./pages/user/buyer-profile/RFQManagement";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IUser, userStore } from "./store/user-store";
import SupplierRFQ from "./pages/user/supplier-profile/SupplierRFQ";
import CountryShowroom from "./pages/show-room/CountryShowroom";
import MessagePage from "./components/messageing/MessagePage";
import ConversationMessageDisplay from "./components/messageing/ConversationMessageDisplay";

import { UnderConstruction } from "./components/under-construction";
import { ProductManagementProductTab } from "./pages/user/components/product-management-product-tab";
import ProductEntry from "./pages/user/components/ProductEntry";
import UpdateProfileForm from "./pages/user/supplier-profile/UpdateProfile";

import StoreFrontPreview from "./pages/user/supplier-profile/StoreFrontPreview";
import SupplierRatings from "./pages/user/supplier-profile/SupplierRatings";
import SupplierNotifications from "./pages/user/supplier-profile/SupplierNotifications";
import SalesPerformance from "./pages/user/supplier-profile/SalesPerformance";
import ManageUsers from "./pages/user/supplier-profile/ManageUsers";
// import { UnderConstruction } from "./components/under-construction";
// import { ProductManagementProductTab } from "./pages/user/components/product-management-product-tab";
// import ProductEntry from "./pages/user/components/ProductEntry";
// import ProductDetails from "./pages/user/components/ProductDetails";
// import UpdateProfileForm from "./pages/user/supplier-profile/UpdateProfile";

import RFQForm from "./pages/user/buyer-profile/RfqsForm";
import SinglePreviewProduct from "./pages/user/supplier-profile/SingleProductPreview";
import Users from "./pages/user/supplier-profile/Users";
import ChangeBuyerPassword from "./pages/BuyersAuthentication/ChangeBuyerPassword";

const RoutesConfig = () => {
  const [, setUserData] = useRecoilState<IUser | null>(userStore);

  useEffect(() => {
    const unparsed = localStorage.getItem("profile");
    if (!unparsed) return;
    const profile = JSON.parse(unparsed);
    setUserData(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route path="/">
        <Route path="signin" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="signup" element={<IntegratedSignup />} />
      </Route>
      <Route path="RFQForm" element={<RFQForm />} />
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blogs">
          <Route index element={<BlogPage />} />
          <Route path=":id" element={<BlogDetails />} />
        </Route>

        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="terms-condition" element={<TermsPage />} />
        <Route path="track-order" element={<TrackOrderPage />} />
        <Route path="profile" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
        </Route>
        <Route path="subscription/success" element={<StripeSuccessPage />} />
        <Route path="single-product" element={<SingleProduct />} />
        <Route path="products" element={<AllProductsPage />} />
        <Route path="show-room" element={<CountryShowroom />} />
        <Route path="cookie-policy" element={<CookiesPolicyPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="wishlist" element={<WishListPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/buyer-dashboard" element={<BuyerDashboard />}>
        <Route path="messages" element={<MessagePage />}>
          <Route path=":convId" element={<ConversationMessageDisplay />} />
        </Route>
        <Route path="showRoom" element={<BuyersShowRoom />} />
        <Route path="rfq" element={<RFQManagement />} />

        {/* <Route path="rfq/RFQForm" element={<RFQForm />} /> */}

        <Route path="orders" element={<OrderTracking />} />
        <Route path="ratings" element={<Ratings />} />

        <Route path="settings" >
          <Route path="change-password" element={<ChangeBuyerPassword />} />
          <Route path="security" element={<SecuritySettings />} />

          <Route path="notifications" element={<Notifications />} />
          <Route path="quick-messages" element={<QuickMessage />} />
        </Route>
        <Route path="myAccount" element={<BuyerAccount />}>
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="profile" element={<BuyersProfile />} />
          <Route path="preferences" element={<SourcingPreferences />} />
        </Route>
      </Route>

      <Route path="/supplier-dashboard" element={<SuppliersDashboard />}>
        <Route path="update-profile" element={<UpdateProfileForm />} />
        <Route path="products" element={<ProductManagement />}>
          <Route path="">
            <Route index element={<ProductManagementProductTab />} />
            <Route path="entry" element={<ProductEntry />} />
            <Route path="details/:id" element={<SinglePreviewProduct />} />
          </Route>
          <Route path="orders" element={<UnderConstruction />} />
          <Route path="other-info" element={<UnderConstruction />} />
        </Route>
        <Route path="products" element={<ProductManagement />} />

        <Route path="store-front-preview" element={<StoreFrontPreview />} />

        <Route path="ratings" element={<SupplierRatings />} />
        <Route path="security-settings" element={<SecuritySettings />} />
        <Route path="notifications" element={<SupplierNotifications />} />
        <Route path="sales-performance" element={<SalesPerformance />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="update-profile" element={<UpdateProfileForm />} />

        <Route path="supplier-rfq" element={<SupplierRFQ />} />
        <Route path="supplier-profile" element={<SupplierProfile />} />
        <Route index element={<SupplierProfile />} />
        <Route path="order" element={<BuyerOrder />} />
        <Route path="analytics" element={<AnalyticsAndReporting />} />
        <Route path="notifications" element={<UnderConstruction />} />
        <Route path="users" element={<Users />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="reviews" element={<ReviewsDashboard />} />
        <Route path="subscription" element={<Subscriptions />} />

        <Route path="messages" element={<MessagePage />}>
          <Route path=":convId" element={<ConversationMessageDisplay />} />
        </Route>
        <Route path="logout" element={<div>Unhandled</div>} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
