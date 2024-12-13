import Calculadora from "../_organism/Drawer/Calculadora";

export default function DrawenerContent() {

    return (
        <>
            <div className="drawer-content absolute right-0 z-20 bottom-10 flex flex-col">
                {/* Page content here */}
                <label htmlFor="drawer-calc" className="px-5 py-3 cursor-pointer bg-white hover:bg-slate-300 rounded-l-lg">Calculadora</label>
            </div>

            <input id="drawer-calc" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side z-30">
                <label htmlFor="drawer-calc" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-[50%] p-4">
                    Calculadora
                </div>
            </div>

        </>
    )
}
