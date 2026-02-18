import { Link } from "react-router-dom";
import { ModalPortal } from "../../../shared/ui/ModalPortal/ModalPortal";
import { X } from "lucide-react";
import { useEffect } from "react";

export function AuthRequiredModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <ModalPortal>
      <div
        onClick={onClose}
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-(--light-text) rounded-2xl p-10 w-[90%] max-w-md text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-(--foreground) p-2 hover:bg-(--beige)/20 rounded-lg transition-all duration-300"
            aria-label="close menu"
          >
            <X size={14} />
          </button>

          <h2 className="text-xl font-bold mb-3">Authorization required</h2>

          <p className="text-(--grey-text) mb-6">
            To invest in property you need to log in or create an account.
          </p>

          <div className="flex gap-3 justify-center">
            <Link
              onClick={onClose}
              to="/login"
              className="button px-5 text-(--beige) hover:bg-(--beige) hover:text-(--light-text)"
            >
              Log In
            </Link>

            <Link
              onClick={onClose}
              to="/login?mode=register"
              className="button px-5 bg-(--beige) text-(--light-text) hover:bg-(--light-text) hover:text-(--beige)"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
