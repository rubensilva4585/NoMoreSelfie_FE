import { FaLongArrowAltRight } from "react-icons/fa";
import HomeSectionDistrictsDistrictCard from "./HomeSectionDistrictsDistrictCard";

export default function HomeSectionDistricts() {
    return (
        <>
            <section className=" bg-black">
                <div className="container mx-auto px-3 md:px-12 py-20">
                    <div className="title mb-12">
                        <p className="text-4xl font-bold text-beige">
                            Procure profissionais perto de si
                        </p>
                    </div>

                    <div className="flex gap-5 overflow-x-auto">
                        <HomeSectionDistrictsDistrictCard imageUrl="../../../images/districts/districtPorto.jpg" title="Porto" district_id={1} />
                        <HomeSectionDistrictsDistrictCard imageUrl="../../../images/districts/districtLisboa.jpg" title="Lisboa" district_id={2} />
                        <HomeSectionDistrictsDistrictCard imageUrl="../../../images/districts/districtCoimbra.jpg" title="Coimbra" district_id={3} />
                        <HomeSectionDistrictsDistrictCard imageUrl="../../../images/districts/districtAveiro.jpg" title="Aveiro" district_id={4} />
                        <HomeSectionDistrictsDistrictCard imageUrl="../../../images/districts/districtAlgarve.jpg" title="Algarve" district_id={5} />
                    </div>
                    <div className="flex justify-start items-center mt-4 text-gray-400 hover:text-white">
                      <button className="block text-xs font-bold  uppercase rounded-lg scroll-button">
                          Ver todos os distritos 
                      </button>
                      <FaLongArrowAltRight className="inline-block ml-2" />
                    </div>
                </div>
            </section>
        </>
    )
}
