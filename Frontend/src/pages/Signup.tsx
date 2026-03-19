import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState<'advocate' | 'client'>('advocate');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password,
        designation,
      });
      console.log('Signup response:', res.data);
      navigate('/login'); // redirect to login
    } catch (err: any) {
      alert(err.response?.data?.error || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1117]/95 via-[#161B22]/80 to-[#0D1117]/95 p-36">
      <div className="bg-[#161B22] rounded-3xl shadow-2xl p-10 w-full max-w-md relative border border-[#00C2FF]/20">
        {/* Close Button */}
        <X
          className="absolute top-4 right-4 text-gray-400 hover:text-[#00C2FF] cursor-pointer transition-colors"
          onClick={() => navigate(-1)}
        />
        {/* Header */}
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-center mb-6">
          Create Account
        </h3>
        <p className="text-center text-gray-400 mb-8">
          Sign up to get started with JurisAssist
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Designation</label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value as 'advocate' | 'client')}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent shadow-inner"
            >
              <option value="advocate">Advocate</option>
              <option value="client">Client</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all transform hover:scale-105 ${
              isLoading
                ? 'bg-[#00C2FF]/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#00C2FF] to-[#00FF88] hover:opacity-90'
            }`}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Login redirect */}
        <div className="text-center">
          <span className="text-gray-400 text-sm">Already have an account?</span>{' '}
          <button
            className="text-[#00C2FF] font-medium hover:text-[#00FF88] transition-colors"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
