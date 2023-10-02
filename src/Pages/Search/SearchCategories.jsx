import { useState } from "react"

export function SearchCategories(props) {
    const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(false);

    function handleSubCategories() {
        setIsSubCategoriesOpen(!isSubCategoriesOpen);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="inline-flex my-1 items-center ">
                    <input
                        type="checkbox"
                        className="w-5 h-5 text-orange-500 bg-gray-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        checked={isSubCategoriesOpen}
                        onChange={handleSubCategories} />
                    <span className="ml-2 text-gray-800">{props.CategoryName}</span>
                </div>

                <div className={`${isSubCategoriesOpen ? 'block' : 'hidden'} flex flex-col mt-1 border-t`}>
                    {props.SubCategories.map((subCategory, index) => (
                        <div key={index} className="inline-flex my-1 mx-8 pt-1 items-center ">
                            <input
                                value={index}
                                type="checkbox"
                                className="w-5 h-5 text-orange-500 bg-gray-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2" />
                            <span className="ml-2 text-gray-800">{subCategory}</span>
                        </div>
                    ))}
                    <div className="mx-8 "></div>
                </div>
            </div>
        </>
    );
}



