import { forwardRef } from "react";

const CategoryModal = forwardRef((props, ref) => {
    return (
        <>
            <div
                ref={ref}
                className={`absolute z-[25] flex-col ${props.open ? 'flex' : 'hidden'} mt-2 w-100 lg:w-[620px]  rounded-lg bg-white border-[1px] border-gray-200 shadow-md`}
            >
                <div className="mt-4 pl-6 pb-4 w-full border-b-[1px] border-gray-200 font-semibold ">
                    Categorias
                </div>

                <ul className="columns-1 overflow-y-auto lg:columns-3 lg:overflow-hidden" style={{ columnRule: "1px solid #d9d9d9" }}>
                    {props.Categories.map((category, index) => (
                        <li key={index} className="hover:text-orange-500 cursor-pointer py-2 px-4" onClick={() => props.CategoryClick(category.name)}>
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});

export default CategoryModal;






