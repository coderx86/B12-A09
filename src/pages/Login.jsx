import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash, FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const { signIn, googleSignIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
      toast.success('🌿 Welcome back to GreenNest!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err.code));
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await googleSignIn();
      toast.success('🌿 Welcome to GreenNest!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. Please try again.');
      toast.error('Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first.');
      toast.warning('Please enter your email address.');
      return;
    }

    try {
      await resetPassword(formData.email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to send reset email. Check your email address.');
      toast.error('Failed to send reset email.');
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-base-200 dark:to-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <FaLeaf className="text-3xl text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-base-content/60 mt-2">Sign in to continue to GreenNest</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="label-text-alt link link-hover text-green-600"
                >
                  Forgot Password?
                </button>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-success w-full text-white"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full gap-2"
            disabled={loading}
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-base-content/70">
            Don't have an account?{' '}
            <Link to="/register" className="link link-hover text-green-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
