import { useState } from "react"
import { MdKeyboardArrowUp } from "react-icons/md"

export function SearchCategories(props) {
    const [isCategoryChecked, setIsCategoryChecked] = useState(false);
    const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(false);
    const [subCategories, setSubCategories] = useState(props.subCategories);
    const [subCategoriesCount, setSubCategoriesCount] = useState(0);

    function handleCategoryCheck() {
        !isSubCategoriesOpen && handleSubCategoriesOpen();
        !isCategoryChecked ? checkAllSubCategories() : unCheckAllSubCategories();
        setIsCategoryChecked(!isCategoryChecked);
    }

    function handleSubCategoriesOpen() {
        setIsSubCategoriesOpen(!isSubCategoriesOpen);
    }

    const updateSubCategory = (index, check) => {
        { subCategoriesCount + 1 === subCategories.length && check ? setIsCategoryChecked(true) : setIsCategoryChecked(false) }
        setSubCategoriesCount(subCategoriesCount + (check ? 1 : -1))
        const newCategories = [...subCategories];
        newCategories[index].checked = check;
        setSubCategories(newCategories);
    };

    function checkAllSubCategories() {
        const newCategories = [...subCategories];
        newCategories.filter((category) => category.checked === false).map((category) => category.checked = true);
        setSubCategoriesCount(subCategories.length)
        setSubCategories(newCategories);
    }

    function unCheckAllSubCategories() {
        const newCategories = [...subCategories];
        newCategories.filter((category) => category.checked === true).map((category) => category.checked = false);
        setSubCategoriesCount(0)
        setSubCategories(newCategories);
    }


    return (
        <>
            <div className="flex flex-col" >
                <div className="inline-flex my-1 items-center select-none">
                    <input
                        type="checkbox"
                        className="w-5 h-5 text-orange-500 hover:text-orange-600 bg-gray-white border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                        checked={isCategoryChecked}
                        onChange={handleCategoryCheck} />
                    <div className="flex justify-between w-full " onClick={handleSubCategoriesOpen}>
                        <span className="ml-2 text-gray-800">{props.Category}</span>
                        <MdKeyboardArrowUp className={`text-2xl text-gray-500 transition duration-200 ${isSubCategoriesOpen ? '-rotate-180' : 'rotate-0'}`} />
                    </div>
                </div>

                <div className={`${isSubCategoriesOpen ? 'block' : 'hidden'} flex flex-col mt-1 border-t`} >
                    {subCategories.map((subCategory, index) => (
                        <div key={index} className="inline-flex my-1 mx-8 pt-1 items-center select-none">
                            <input
                                value={index}
                                type="checkbox"
                                className="w-5 h-5 text-orange-500 hover:text-orange-600 bg-gray-white border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                                onChange={() => {
                                    updateSubCategory(index, !subCategory.checked)
                                }}
                                checked={subCategory.checked}
                            />
                            <span className="ml-2 text-gray-800">{subCategory.name}</span>
                        </div>
                    ))}
                    <div className="mx-8 "></div>
                </div>
            </div>
        </>
    );
}