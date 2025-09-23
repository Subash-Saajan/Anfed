import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminBubble() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not signed in
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // hide bubble while loading or when no user is signed in
  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      nav("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          aria-label="Admin menu"
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 rounded-full bg-[#448800] text-white flex items-center justify-center shadow-lg hover:scale-105 transform-gpu transition"
        >
          {/* simple icon / initials */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V5a4 4 0 10-8 0v6M5 11h14l-1 9H6l-1-9z" />
          </svg>
        </button>

        {open && (
          <div className="mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-3">
              <div className="text-sm text-slate-600">
                <div className="font-medium text-slate-900">{user.email}</div>
                <div className="text-xs">Admin</div>
              </div>

              <div className="mt-3 space-y-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    nav("/admin/login");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
                >
                  Admin login
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    nav("/admin");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
                >
                  Add Events
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-red-600"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}