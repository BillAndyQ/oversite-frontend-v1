import AppNavbar from "@/app/user/admin/ordenes-trabajo/equipos/AppNavbar";

export default function Page() {
  return (
    <div className="">
      <AppNavbar/>
      <div className="px-3 py-3 flex gap-3">
        {/* Card */}
        <div className="rounded-sm shadow-xs border bg-white">
            <div className="text-sm font-bold border-b px-3 py-2">Equipos</div>
            <div className="text-sm text-muted-foreground px-3 py-2">Lista de ordenes de trabajo</div>
        </div>
      </div>
    </div>
  );
}