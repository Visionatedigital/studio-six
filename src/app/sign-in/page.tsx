"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <div className="logo-group">
          <svg width="64" height="71" viewBox="0 0 64 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.2392 0H45.311L15.8458 36.2457C15.8458 36.2457 -2.09404 32.5845 9.25563 14.2786L20.2392 0Z" fill="#76B3F8"/>
            <path d="M35.6205 39.5399L22.0741 56.3814C22.0741 56.3814 -16.4598 50.1427 8.29709 15.918C8.29709 15.918 0.839256 32.9498 15.8501 36.2449L35.6205 39.5399Z" fill="#A0EAF6"/>
            <path d="M43.7437 70.4781H18.6719L48.1371 34.2324C48.1371 34.2324 66.0769 37.8936 54.7272 56.1995L43.7437 70.4781Z" fill="#965BF9"/>
            <path d="M28.3594 30.9391L41.9058 14.0977C41.9058 14.0977 80.4397 20.3363 55.6828 54.5611C55.6828 54.5611 63.1406 37.5292 48.1298 34.2342L28.3594 30.9391Z" fill="#DA7AD4"/>
          </svg>
        </div>
        
        <div className="content-wrapper">
          <h1>Sign In</h1>
          <p className="subtitle">Sign in to start rendering</p>
          
          <button className="google-sign-in" onClick={handleGoogleSignIn}>
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              </div>
              <span className="google-btn-text">Sign in with Google</span>
            </div>
          </button>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link href="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="bottom-text">
            <p>
              Don't have an account?
              <Link href="/sign-up" className="sign-up-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 