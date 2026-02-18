import { Outlet } from "react-router-dom";
import { Header } from "../widgets/Header/Header";

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
