export default function RegionModal(props) {

    return (
        <>
            <div
                className={`flex-col ${props.open ? 'flex' : "hidden"} mt-2 w-100 lg:w-[620px] h-96 lg:h-auto  rounded-lg bg-white border-[1px] border-gray-200 shadow-md modal`}>
                <div className="mt-4 pl-6 pb-4 w-full border-b-[1px] border-gray-200 font-semibold ">
                    Região
                </div>

                <ul className="columns-1 overflow-y-auto lg:columns-3 lg:overflow-hidden" style={{ columnRule: "1px solid #d9d9d9" }}>
                    {props.Regions.map((region, index) => (
                        <li key={index} className="hover:text-orange-500 cursor-pointer py-2 px-4" onClick={() => props.RegionClick(region.name)}>
                            {region.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}