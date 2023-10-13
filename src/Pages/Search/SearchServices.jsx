import { useState, useRef, useEffect } from "react";
import RegionModal from "./RegionModal.jsx";
import CategoryModal from "./CategoryModal.jsx";

export default function SearchServices(props) {
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
    const regionModalRef = useRef(null);

    function handleRegionClick(region) {
        setRegion(region);
    }

    function handleCategoryClick(category) {
        setCategory(category);
    }

    function handleRegionInputChange(e) {
        setRegion(e.target.value);
    }

    function handleCategoryInputChange(e) {
        setCategory(e.target.value);
    }

    const handleRegionModalOpen = () => {
        setIsRegionModalOpen(!isRegionModalOpen);
    }

    useEffect(() => {
        function handleRegionClickOutside(event) {
            if (regionModalRef.current && !regionModalRef.current.contains(event.target)) {
                console.log(regionModalRef.current);
                console.log(regionModalRef.current.contains(event.target));
                console.log("cenas2");
                setIsRegionModalOpen(false);
            }
            console.log("cenas");
        }
        document.addEventListener('click', handleRegionClickOutside);

        return () => {
            document.removeEventListener('click', handleRegionClickOutside);
        };
    }, []);

    return (
        <form className="flex justify-start w-4/4 z-[25]">

            <div className="relative w-56 h-14">
                <input
                    value={category}
                    onChange={handleCategoryInputChange}
                    type="text"
                    id="category"
                    className=" rounded-s-lg flex-1 border border-gray-300 w-56 h-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="O que procura?"
                />
                <CategoryModal
                    className="absolute top-[100%+5px] left-0"
                    Categories={props.Categories}
                    CategoryClick={handleCategoryClick}
                />
            </div>
            <div className="relative w-56 h-14">
                <input
                    value={region}
                    onChange={handleRegionInputChange}
                    onClick={handleRegionModalOpen}
                    type="text"
                    id="location"
                    className="flex-1 border border-gray-300 w-56 h-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Onde?" />
                {isRegionModalOpen &&
                    <RegionModal
                        ref={regionModalRef}
                        className="absolute top-[100%+5px] left-0"
                        Regions={props.Regions}
                        RegionClick={handleRegionClick}
                        handleRegionModalOpen={handleRegionModalOpen} />
                }
            </div>
            <div className="relative h-14">
                <button className="flex-shrink-0 h-full px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-e-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none" type="submit">
                    Pesquisar
                </button>
            </div>

        </form>
    );
}