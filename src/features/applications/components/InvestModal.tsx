import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { sendApplication, reset } from "../applicationsSlice";
import { ModalPortal } from "../../../shared/ui/ModalPortal/ModalPortal";
import { X } from "lucide-react";

type FormValues = {
  amount: number;
};

export function InvestModal({
  propertyId,
  title,
  ticket,
  onClose,
}: {
  propertyId: number;
  title: string;
  ticket: number;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector((s) => s.aplications);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    await dispatch(sendApplication({ propertyId, amount: data.amount }));
  };

  if (success)
    return (
      <ModalPortal>
        <div
          onClick={() => {
            dispatch(reset());
            onClose();
          }}
          className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-(--light-text) p-6 rounded-xl text-center w-[90%] max-w-sm"
          >
            <h3 className="text-xl font-bold mb-3">Application sent</h3>

            <p className="text-(--grey-text) mb-5">
              Your investment request has been successfully submitted.
            </p>

            <button
              className="button bg-(--beige) text-(--light-text) px-5 hover:bg-(--light-text) hover:text-(--beige)"
              onClick={() => {
                dispatch(reset());
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </ModalPortal>
    );

  return (
    <ModalPortal>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-(--light-text) p-6 rounded-xl w-[90%] max-w-sm flex flex-col gap-4"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-(--foreground) hover:bg-(--beige)/20 rounded-lg transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <h3 className="font-second font-bold text-[24px] text-center">
            Invest
          </h3>

          <p className="font-second font-bold text-[18px] text-center">
            {title}
          </p>

          <p className="text-sm text-(--grey-text) text-center">
            Minimum investment: <b>{ticket} Dhs</b>
          </p>

          <div>
            <input
              type="number"
              step={ticket}
              placeholder={`${ticket}`}
              className="input w-full"
              {...register("amount", {
                required: "Enter amount",
                valueAsNumber: true,
                min: {
                  value: ticket,
                  message: `Minimum investment is ${ticket}`,
                },
                validate: (value) =>
                  value % ticket === 0 ||
                  `Amount must be multiple of ${ticket}`,
              })}
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button bg-(--beige) text-(--light-text) hover:bg-(--light-text) hover:text-(--beige) disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm"}
          </button>
        </form>
      </div>
    </ModalPortal>
  );
}
