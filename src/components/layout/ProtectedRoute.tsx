import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { user, role, loading, roleLoading } = useAuth();

if (loading || roleLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <p className="font-inter text-[#9ca3af]">Loading...</p>
    </div>
  );
}

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
        <div className="text-center">
          <p className="font-montserrat font-black text-white text-2xl uppercase tracking-tight">
            Akses Ditolak
          </p>
          <p className="font-inter text-[#9ca3af] text-sm mt-2">
            Halaman ini hanya untuk admin.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}