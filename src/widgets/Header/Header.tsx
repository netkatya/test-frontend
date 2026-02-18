import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";

import { useAppSelector, useAppDispatch } from "../../shared/hooks/redux";
import { logout } from "../../features/auth/authSlice";

export function Header() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const isAuth = !!user;
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-20 py-4.5 bg-(--foreground) shadow-[0_10px_40px_0_rgba(0,0,0,0.06),0_2px_10px_0_rgba(0,0,0,0.1)] z-50">
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-second text-[28px] leading-[1.21] text-(--light-text)"
        >
          My Logo
        </Link>

        {/* desktop */}
        <nav className="hidden lg:flex items-center gap-2.5">
          {!isAuth ? (
            <>
              <Link
                to="/login?mode=login"
                className="button w-40 text-(--beige) hover:bg-(--beige) hover:text-(--light-text)"
              >
                Log In
              </Link>
              <Link
                to="/login?mode=register"
                className="button w-40 bg-(--beige) text-(--light-text) hover:bg-(--foreground) hover:text-(--beige)"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center">
                <div className="border border-(--beige) rounded-[5px] p-2.75">
                  <User width={20} height={20} color="#fff" />
                </div>
                <span className="text-(--light-text) text-[16px] ">
                  {user?.email}
                </span>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="button w-40 bg-(--beige) text-(--light-text) hover:bg-(--light-text) hover:text-(--beige)"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-(--light-text) p-2 rounded-lg hover:bg-white/10 active:scale-95 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 md:w-110 bg-(--foreground) p-8 flex flex-col gap-6 transform transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={closeMenu}
            className="text-(--light-text) p-2 hover:bg-white/10 rounded-lg"
            aria-label="close menu"
          >
            <X size={28} />
          </button>
        </div>

        {!isAuth ? (
          <>
            <Link
              to="/login?mode=login"
              onClick={closeMenu}
              className="button text-(--beige) font-second"
            >
              Log In
            </Link>
            <Link
              to="/login?mode=register"
              onClick={closeMenu}
              className="button bg-(--beige) text-(--light-text) font-second"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center justify-center">
              <div className="border border-(--beige) rounded-[5px] p-2.75">
                <User width={20} height={20} color="#fff" />
              </div>
              <span className="text-(--light-text) text-[16px]">
                {user?.email}
              </span>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="button bg-(--beige) hover:bg-(--light-text) hover:text-(--beige)"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
