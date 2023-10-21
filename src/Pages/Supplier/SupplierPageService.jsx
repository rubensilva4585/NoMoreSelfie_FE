import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowDown, FaArrowUp, FaCheck } from "react-icons/fa";

export default function SupplierPageService() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div>

                <div className="flex items-center gap-4 font-semibold cursor-pointer text-lg" onClick={toggleDropdown}>
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        Casamentos
                        <span className="text-gray-600 text-xs">(50€ - 300€)</span>
                    </div>
                    <div className="text-gray-400" >
                        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                </div>
                {isOpen && (
                    <div className="flex flex-col gap-1 ml-7 text-sm">
                        <hr />
                        <div className="flex items-center gap-2">
                            Pedido de Casamento <span className="text-gray-600">(100€ - 300€)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            Pré Casamento <span className="text-gray-600">(50€ - 300€)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            Pós Casamento  <span className="text-gray-600">(100€ - 500€)</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}