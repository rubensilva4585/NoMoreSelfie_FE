import { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import SearchResultCard from "./SearchResultCard";
import SearchFilterSidebar from "./SearchFilterSidebar";
import SearchServices from "./SearchServices.jsx";
import {
  getCategories,
  getDistricts,
  getValidSuppliersList,
} from "../../API/General";
import { Link } from "react-router-dom";
import Select from "react-select";
import "../../styles/ReactSelect.css";
import { FaTimes } from "react-icons/fa";

export default function PageSearch() {
  const [supData, setSupData] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    district: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const filterSuppliers = (supplier) => {
    // console.log(filters);
    let isValid = true;

    if (isValid && filters.category) {
      isValid = supplier.services.some(
        (service) => service.category_id === filters.category
      );
    }
    // if (isValid && filters.sub_category) {
    //   isValid = supplier.services.some((service) =>
    //     service.subcategories.some(
    //       (subcategory) => subcategory.id === filters.sub_category
    //     )
    //   );
    // }
    if (isValid && filters.district) {
      isValid = supplier.districts.some(
        (district) => district.id === filters.district
      );
    }
    if (isValid && filters.minPrice && filters.maxPrice) {
      const lowestStartPrice = supplier.services.reduce((lowest, service) => {
        return Math.min(
          lowest,
          ...service.subcategories.map((subcategory) =>
            parseFloat(subcategory.startPrice)
          )
        );
      }, Infinity);

      const highestEndPrice = supplier.services.reduce((highest, service) => {
        return Math.max(
          highest,
          ...service.subcategories.map((subcategory) =>
            parseFloat(subcategory.endPrice)
          )
        );
      }, -Infinity);

      if (lowestStartPrice < filters.minPrice) {
        return false;
      }
      if (highestEndPrice > filters.maxPrice) {
        return false;
      }
    }
    return isValid;
  };

  function handleFilterSidebar() {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  }

  const handleFilterPrice = (range) => {
    setFilters({ ...filters, minPrice: range[0], maxPrice: range[1] });
    setIsFilterSidebarOpen(false);
  };

  useEffect(() => {
    getValidSuppliersList()
      .then((res) => {
        console.log(res);
        setSupData(res);
      })
      .catch((err) => {
        console.log(err);
      });

    getDistricts()
      .then((res) => {
        setDistricts(
          res.map((district) => ({
            value: district.id,
            label: district.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getCategories()
      .then((res) => {
        console.log(res);
        setCategories(
          res.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section class="relative bg-gray-100/50 overflow-hidden" id="sobre">
        <div class="absolute top-[-796px] right-0 mt-[100px] ml-[-50%] h-[1000px] w-[50%] rounded-l-[50%] overflow-hidden">
          <img
            src="../../../images/wallsearch.jpg"
            alt=""
            className="xl:bottom-[-130px] lg:bottom-[-20px] lg:block hidden absolute"
          />
        </div>
        <div className="container mx-auto px-3 md:px-12 py-16">
          <div className="w-full">
            <div className="flex items-end justify-between header">
              <div className="flex flex-col justify-between gap-8 header">
                <div className="title">
                  <p className="mb-4 text-4xl font-bold text-gray-800">
                    Profissionais
                  </p>
                  <p className="text-2xl font-light text-gray-400">
                    Tudo o que precisa na nossa lista de profissionais
                  </p>
                </div>

                <div className="flex justify-start w-4/4 ">
                  <div className="relative w-56 h-14">
                    {categories && (
                      <Select
                        options={categories}
                        onChange={(e) =>
                          e
                            ? setFilters({ ...filters, category: e.value })
                            : setFilters({ ...filters, category: "" })
                        }
                        placeholder="O que procura?"
                        isSearchable={true}
                        isClearable={true}
                        className="search-category"
                        classNamePrefix="select"
                      />
                    )}
                  </div>
                  <div className="relative w-56 h-14">
                    {districts && (
                      <Select
                        options={districts}
                        onChange={(e) =>
                          e
                            ? setFilters({ ...filters, district: e.value })
                            : setFilters({ ...filters, district: "" })
                        }
                        placeholder="Onde?"
                        isSearchable={true}
                        isClearable={true}
                        className="search-districts"
                        classNamePrefix="select"
                      />
                    )}
                  </div>
                  {/* <div className="relative h-14">
                    <button
                      className="flex-shrink-0 h-full px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-e-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none"
                      type="submit"
                    >
                      Pesquisar
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-3 md:px-12 pb-16">
          <div className="w-full border-t border-gray-200" />

          <div className="flex items-center justify-end my-6">
            {filters.minPrice && filters.minPrice && (
              <div
                onClick={() =>
                  setFilters({
                    ...filters,
                    minPrice: "",
                    maxPrice: "",
                  })
                }
                className="p-2 mr-4 border rounded-full bg-gray-200 border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 cursor-pointer text-md font-semibold flex items-center gap-2"
              >
                <span>
                  De {filters.minPrice}€ até {filters.maxPrice}€
                </span>
                <FaTimes />
              </div>
            )}
            <button
              className="flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none transition duration-200 ease-in"
              type="button"
              onClick={handleFilterSidebar}
            >
              <BsFilterLeft className="mr-2 text-xl" /> Filtros
            </button>
          </div>

          {supData ? (
            <>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                {supData.filter(filterSuppliers).map((sup, index) => {
                  return <SearchResultCard supplier={sup} />;
                })}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-2xl font-light text-gray-400">A carregar...</p>
            </div>
          )}
        </div>
        {isFilterSidebarOpen && (
          <SearchFilterSidebar
            closeSidebar={handleFilterSidebar}
            handleFilterPrice={handleFilterPrice}
          />
        )}
      </section>
    </>
  );
}
