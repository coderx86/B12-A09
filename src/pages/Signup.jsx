import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaEye, FaEyeSlash, FaLeaf, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signup = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password validation
  const passwordChecks = {
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasMinLength: formData.password.length >= 6
  };

  const isPasswordValid = passwordChecks.hasUppercase && passwordChecks.hasLowercase && passwordChecks.hasMinLength;

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
    
    if (!isPasswordValid) {
      setError('Please meet all password requirements.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user
      await createUser(formData.email, formData.password);
      
      // Update profile with name and photo
      await updateUserProfile(formData.name, formData.photoURL || null);
      
      toast.success('🌿 Welcome to GreenNest! Account created successfully.');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(getErrorMessage(err.code));
      toast.error('Registration failed. Please try again.');
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
      navigate('/');
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. Please try again.');
      toast.error('Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login instead.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  const PasswordRequirement = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-success' : 'text-base-content/50'}`}>
      {met ? <FaCheck className="text-success" /> : <FaTimes className="text-error" />}
      <span>{text}</span>
    </div>
  );

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
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-base-content/60 mt-2">Join the GreenNest community</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full pl-12"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

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
                  className="input input-bordered w-full pl-12"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL (Optional)</span>
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Enter photo URL"
                  className="input input-bordered w-full pl-12"
                  value={formData.photoURL}
                  onChange={handleInputChange}
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
                  placeholder="Create a password"
                  className="input input-bordered w-full pl-12 pr-12"
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
              
              {/* Password Requirements */}
              <div className="mt-3 p-3 bg-base-200 rounded-lg space-y-1">
                <p className="text-sm font-medium mb-2">Password Requirements:</p>
                <PasswordRequirement met={passwordChecks.hasUppercase} text="At least one uppercase letter" />
                <PasswordRequirement met={passwordChecks.hasLowercase} text="At least one lowercase letter" />
                <PasswordRequirement met={passwordChecks.hasMinLength} text="Minimum 6 characters" />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-success w-full text-white"
              disabled={loading || !isPasswordValid}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Register'}
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

          {/* Login Link */}
          <p className="text-center mt-6 text-base-content/70">
            Already have an account?{' '}
            <Link to="/login" className="link link-hover text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
