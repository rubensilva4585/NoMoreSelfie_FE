import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SearchPriceRange.css';

export function SearchPriceRange() {
    const [range, setRange] = useState([500, 2000]);

    const handleRangeChange = (newRange) => {
        setRange(newRange);
    };

    return (
        <>
            <div className='px-2'>

                <Slider
                    range
                    min={1}
                    max={5000}
                    allowCross={false}
                    value={range}
                    onChange={handleRangeChange}
                    className='my-2'
                />
            </div>
            <div className='flex justify-between'>
                {/* <input type="number" value={range[0]} onChange={(e) => handleRangeInput(e.target.value, range[1])}/>
                <input type="number" value={range[1]} onChange={(e) => handleRangeInput(range[0], e.target.value)}/> */}
                <div>{range[0]} €</div>
                <div>{range[1]} €</div>
            </div>
        </>
    );
}