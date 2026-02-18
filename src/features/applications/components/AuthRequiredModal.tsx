import { Link } from "react-router-dom";
import { ModalPortal } from "../../../shared/ui/ModalPortal/ModalPortal";

export function AuthRequiredModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-10 w-[90%] max-w-md text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-(--grey-text) hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-3">Authorization required</h2>

          <p className="text-(--grey-text) mb-6">
            To invest in property you need to log in or create an account.
          </p>

          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              className="button px-5 text-(--beige) hover:bg-(--beige) hover:text-(--light-text)"
            >
              Log In
            </Link>

            <Link
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
