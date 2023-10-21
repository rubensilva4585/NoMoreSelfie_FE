import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowDown, FaArrowUp, FaCheck } from "react-icons/fa";

export default function PageSupplierService({ service }) {
    const [isOpen, setIsOpen] = useState(false);
    //console.log(service);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div>
                <div className="flex items-center gap-4 font-semibold cursor-pointer text-md" onClick={toggleDropdown}>
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        {service.category_name}
                        <span className="text-gray-600 text-xs">(50€ - 300€)</span>
                    </div>
                    <div className="text-gray-400" >
                        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                </div>
                {isOpen && (
                    <div className="flex flex-col gap-1 ml-7 text-sm">
                        <hr />
                        {service.subcategories.map((subcategory) => (
                            <div className="flex items-center gap-2">
                                {subcategory.name} <span className="text-gray-600">({subcategory.startPrice}€ - {subcategory.endPrice}€)</span>
                            </div>
                        ))
                        }
                        {/* <div className="flex items-center gap-2">
                            Pedido de Casamento <span className="text-gray-600">(100€ - 300€)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            Pré Casamento <span className="text-gray-600">(50€ - 300€)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            Pós Casamento  <span className="text-gray-600">(100€ - 500€)</span>
                        </div> */}
                    </div>
                )}
            </div>
        </>
    )
}