import { Outlet } from "react-router-dom";

export default function Games() {
  return (
    <div className="flex flex-col gap-y-10">
      <Outlet />
    </div>
  );
}
