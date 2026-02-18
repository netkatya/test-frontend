import { useState } from "react";
import { useAppSelector } from "../../../shared/hooks/redux";
import { InvestModal } from "./InvestModal";
import { AuthRequiredModal } from "./AuthRequiredModal";

export function InvestButton({
  propertyId,
  title,
  ticket,
}: {
  propertyId: number;
  title: string;
  ticket: number;
}) {
  const { user } = useAppSelector((s) => s.auth);

  const [investOpen, setInvestOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const handleClick = () => {
    if (user) setInvestOpen(true);
    else setAuthOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="button bg-(--beige) text-(--light-text) px-10 hover:bg-(--light-text) hover:text-(--beige)"
      >
        Invest
      </button>

      {investOpen && (
        <InvestModal
          propertyId={propertyId}
          title={title}
          ticket={ticket}
          onClose={() => setInvestOpen(false)}
        />
      )}

      {authOpen && <AuthRequiredModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
