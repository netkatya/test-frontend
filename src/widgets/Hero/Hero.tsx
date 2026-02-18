export function Hero() {
  return (
    <section
      className="relative bg-[url('/images/hero-mob.jpg')]
    md:bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-(--foreground)/60 z-0" />
      <div className="relative z-10 pt-50 xl:pt-74.25 pb-50 xl:pb-94.25 px-12 xl:px-44.5">
        <h1 className="font-second font-bold text-[32px] md:text-[64px] leading-tight text-center text-(--light-text) mb-2.5 max-w-275 m-auto">
          The chemical negatively charged
        </h1>
        <p className="font-normal text-[18px] md:text-[24px] leading-[1.33] tracking-[-0.02em] text-center text-(--light-text) mb-7.5 max-w-205 m-auto">
          Numerous calculations predict, and experiments confirm, that the force
          field reflects the beam, while the mass defect is not formed. The
          chemical compound is negatively charged. Twhile the mass defect
          is{" "}
        </p>
        <a
          href="/#properties"
          className="flex justify-center items-center border border-(--light-text) rounded-lg py-2.5 w-40 h-13.5 font-second font-bold text-[20px] leading-[1.7] text-(--light-text) m-auto hover:bg-(--beige) transition-colors duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
