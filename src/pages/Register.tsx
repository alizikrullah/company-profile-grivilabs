import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-montserrat font-black uppercase tracking-tight text-white text-3xl">
            Grivi<span className="text-[#2ad882]">Labs.</span>
          </h1>
          <p className="font-inter text-[#9ca3af] text-sm mt-2">
            Buat akun baru
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
          {error && (
            <p className="font-inter text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs text-[#9ca3af] tracking-wider uppercase">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2ad882] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs text-[#9ca3af] tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@email.com"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2ad882] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs text-[#9ca3af] tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2ad882] transition-colors"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-2 bg-[#2ad882] hover:bg-[#22c46e] disabled:opacity-50 disabled:cursor-not-allowed text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg py-3 transition-colors"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <p className="font-inter text-sm text-[#9ca3af] text-center">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-[#2ad882] hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}