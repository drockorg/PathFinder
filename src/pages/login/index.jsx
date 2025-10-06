import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';
import TrustIndicators from './components/TrustIndicators';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Pathfinders | AI-Powered Learning for Ghanaian Youth</title>
        <meta name="description" content="Sign in to Pathfinders and continue your AI-powered learning journey. Connect with job opportunities and build your career in Ghana." />
        <meta name="keywords" content="login, Ghana education, AI learning, job opportunities, career development" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Welcome & Features */}
            <div className="order-2 lg:order-1">
              <WelcomeMessage />
            </div>

            {/* Right Column - Login Form & Trust Indicators */}
            <div className="order-1 lg:order-2 space-y-8">
              <LoginForm />
              
              {/* Trust Indicators - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block">
                <TrustIndicators />
              </div>
            </div>
          </div>

          {/* Mobile Trust Indicators */}
          <div className="lg:hidden mt-12">
            <TrustIndicators />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Pathfinders</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering Ghanaian youth through AI-powered learning and job connections.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: hello@pathfinders.gh</li>
                  <li>Phone: +233 20 123 4567</li>
                  <li>Address: Accra, Ghana</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} Pathfinders Ghana. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;