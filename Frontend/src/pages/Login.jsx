import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      // Login request
      const res = await axios.post(
        'http://localhost:5000/auth/login',
        {
          email,
          password,
        }
      );

      console.log('Login response:', res.data);

      const { token, user } = res.data;

      // Make sure token and user exist
      if (!token || !user) {
        throw new Error('Invalid login response');
      }

      // Save authentication information
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect according to role
      if (user.role === 'advocate') {
        navigate('/advocate/dashboard');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      } else {
        setError('Invalid user role.');
      }

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your email and password.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1117]/95 via-[#161B22]/80 to-[#0D1117]/95 p-4">

      <div className="bg-[#161B22] rounded-3xl shadow-2xl p-10 w-full max-w-md relative border border-[#00C2FF]/20">

        {/* Close Button */}
        <X
          className="absolute top-4 right-4 text-gray-400 hover:text-[#00C2FF] cursor-pointer transition-colors"
          onClick={() => navigate(-1)}
        />


        {/* Header */}
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-center mb-6">
          Welcome Back
        </h3>

        <p className="text-center text-gray-400 mb-8">
          Sign in to access your JurisAssist account
        </p>


        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}


        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Email
            </label>

            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            />
          </div>


          {/* Password */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            />
          </div>


          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all transform hover:scale-105 ${
              isLoading
                ? 'bg-[#00C2FF]/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#00C2FF] to-[#00FF88] hover:opacity-90'
            }`}
          >
            {isLoading
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>


        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />

          <span className="mx-2 text-gray-500 text-sm">
            or
          </span>

          <hr className="flex-1 border-gray-700" />
        </div>


        {/* Sign Up */}
        <div className="text-center">

          <span className="text-gray-400 text-sm">
            Don't have an account?
          </span>{' '}

          <button
            type="button"
            className="text-[#00C2FF] font-medium hover:text-[#00FF88] transition-colors"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
}