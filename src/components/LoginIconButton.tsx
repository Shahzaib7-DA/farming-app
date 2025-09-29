import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FarmerProfile } from '@/types/farmer';

export function LoginIconButton() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);

  if (farmerProfile && farmerProfile.name) {
    const firstLetter = farmerProfile.name.charAt(0).toUpperCase();
    return (
      <div className="flex items-center gap-2 bg-white/80 border border-green-300 rounded-full px-3 py-2 shadow text-green-700 font-semibold select-none">
        <div className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full text-lg font-bold">
          {firstLetter}
        </div>
        <span className="hidden sm:inline">{farmerProfile.name.split(' ')[0]}</span>
      </div>
    );
  }

  return (
    <Link to="/login">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-green-100 border border-green-300 rounded-full shadow transition text-green-700 font-semibold"
        title="Login / Signup"
      >
        <LogIn className="w-5 h-5" />
        <span className="hidden sm:inline">Login</span>
      </button>
    </Link>
  );
}
