import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SearchPriceRange.css';

export function SearchPriceRange() {
    const defaultValues = [500, 2000];

    const [range, setRange] = useState(defaultValues);

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
                    defaultValue={defaultValues}
                    value={range}
                    onChange={handleRangeChange}
                    className='my-2'
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{range[0]} €</div>
                <div>{range[1]} €</div>
            </div>
        </>
    );
}