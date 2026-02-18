import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { loadProperties } from "../../features/properties/propertiesSlice";
import Loading from "../../shared/ui/Loader/Loader";
import { InvestButton } from "../../features/applications/components/InvestButton";

export function PropertyList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.properties);

  useEffect(() => {
    dispatch(loadProperties());
  }, []);

  return (
    <section className="py-12.5" id="properties">
      <div className="container px-20">
        <h2 className="font-second font-bold text-[24px] md:text-[28px] leading-[121%] text-(--beige) mb-5">
          Open Deals
        </h2>
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 gap-5">
            {items.map((p) => (
              <li
                key={p.id}
                className="relative aspect-630/400 rounded-[5px] shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] overflow-hidden"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute z-10 top-4 right-4">
                  <InvestButton
                    propertyId={p.id}
                    title={p.title}
                    ticket={p.tiket}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full px-3.5 py-5 bg-(--foreground)/20">
                  <h3 className="font-second font-bold text-[16px] md:text-[20px] leading-[170%] text-(--light-text) mb-1.25">
                    {p.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-x-4 xl:gap-x-11 gap-y-2.5">
                    <p className="card-text">{p.price} Dhs</p>
                    <p className="card-text">Yield {p.yield}%</p>
                    <p className="card-text">Sold {p.soldPercent}%</p>
                    <p className="card-text">Tiket - {p.tiket} Dhs</p>
                    <p className="card-text">Days left {p.daysLeft}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
