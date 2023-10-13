// export default function RegionModal(props) {

//     return (
//         <div
//             className={`flex-col flex mt-2 w-100 h-96 rounded-lg bg-white border-[1px] border-gray-200 shadow-md modal`}>
//             <div className="mt-4 pl-6 pb-4 w-full border-b-[1px] border-gray-200 font-semibold ">
//                 Região
//             </div>

//             <ul className="columns-1 overflow-y-auto   lg:overflow-hidden" style={{ columnRule: "1px solid #d9d9d9" }}>
//                 {props.Regions.map((region, index) => (
//                     <li key={index} className="hover:text-orange-500 cursor-pointer py-2 px-4" onClick={() => props.RegionClick(region.name)}>
//                         {region.name}
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     );
// }

import React, { forwardRef } from 'react';

const RegionModal = forwardRef((props, ref) => {
    <div
        ref={ref}
        className={`flex-col flex mt-2 w-100 h-96 rounded-lg bg-white border-[1px] border-gray-200 shadow-md modal`}>
        <div className="mt-4 pl-6 pb-4 w-full border-b-[1px] border-gray-200 font-semibold ">
            Região
        </div>

        <ul className="columns-1 overflow-y-auto   lg:overflow-hidden" style={{ columnRule: "1px solid #d9d9d9" }}>
            {props.Regions.map((region, index) => (
                <li key={index} className="hover:text-orange-500 cursor-pointer py-2 px-4" onClick={() => props.RegionClick(region.name)}>
                    {region.name}
                </li>
            ))}
        </ul>

    </div>
});

export default RegionModal;