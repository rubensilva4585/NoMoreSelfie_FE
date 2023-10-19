import { useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import RegionModal from "./RegionModal.jsx";
import CategoryModal from "./CategoryModal.jsx";

export default function SearchServices(props) {
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(true);
    const [regionModalOpen, setRegionModalOpen] = useState(false);
    const refCategory = useRef(null);
    const refRegion = useRef(null);

    function handleCategoryClick(category) {
        setCategory(category);
    }

    function handleRegionClick(region) {
        setRegion(region);
    }

    function handleCategoryInputChange(e) {
        setCategory(e.target.value);
    }

    function handleRegionInputChange(e) {
        setRegion(e.target.value);
    }

    return (
        <form className="flex justify-start w-4/4 ">
            <div className="relative w-56 h-14">

                <input
                    value={category}
                    onChange={handleCategoryInputChange}
                    onClick={(e) => { e.stopPropagation(); setCategoryModalOpen(!categoryModalOpen) }}
                    type="text"
                    id="category"
                    className=" rounded-s-lg flex-1 border border-gray-300 w-56 h-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="O que procura?"
                />
                <div
                    style={{
                        position: 'absolute', // Alteração para 'position: absolute'
                        top: '100%', // Ajuste de acordo com a posição desejada
                        left: '0',
                        zIndex: 9999,
                    }}
                >
                    <ClickAwayListener
                        onClickAway={(e) => {
                            if (categoryModalOpen && refCategory.current && !refCategory.current.contains(e.target)) {
                                setCategoryModalOpen(false);
                            }
                        }}>
                        <CategoryModal
                            ref={refCategory}
                            Categories={props.Regions}
                            CategoryClick={handleCategoryClick}
                            open={categoryModalOpen}
                        />

                    </ClickAwayListener>
                </div>
            </div>


            <div className="relative w-56 h-14">
                <input
                    value={region}
                    onChange={handleRegionInputChange}
                    onClick={(e) => { e.stopPropagation(); setRegionModalOpen(!regionModalOpen) }}
                    type="text"
                    id="location"
                    className="flex-1 border border-gray-300 w-56 h-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Onde?" />

                <ClickAwayListener
                    onClickAway={(e) => {
                        if (regionModalOpen && refRegion.current && !refRegion.current.contains(e.target)) {
                            setRegionModalOpen(false);
                        }
                    }}>
                    <>
                        <RegionModal
                            ref={refRegion}
                            Regions={props.Regions}
                            RegionClick={handleRegionClick}
                            open={regionModalOpen}
                        />
                    </>
                </ClickAwayListener>

            </div>
            <div className="relative h-14">
                <button className="flex-shrink-0 h-full px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-e-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none" type="submit">
                    Pesquisar
                </button>
            </div>

        </form>
    );
}