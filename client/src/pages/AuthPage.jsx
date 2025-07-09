import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run this effect once Clerk's authentication state is loaded
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading authentication...
        </div>
      </div>
    );
  }

  // If the user is signed in, and the redirect has been triggered,
  if (isSignedIn) {
    return null;
  }

  // If the user is NOT signed in, render the SignIn and SignUp components
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white rounded-md",
              footerActionLink: "text-blue-600 hover:text-blue-700",
            },
          }}
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-green-600 hover:bg-green-700 text-white rounded-md",
              footerActionLink: "text-green-600 hover:text-green-700",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;
