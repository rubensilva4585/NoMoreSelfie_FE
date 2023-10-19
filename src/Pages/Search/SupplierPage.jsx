import { FaMapPin, FaCoins } from 'react-icons/fa'

export default function SupplierPage() {

    return (
        <div className="bg-white">

            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="col-span-2">
                    <div className="h-[510px] overflow-hidden rounded-lg lg:block">
                        <img src="https://www.tailwind-kit.com/images/blog/1.jpg" className="h-full w-full object-contain object-center" />
                    </div>

                </div>
                <div className="col-span-1">
                    <div className='border rounded-md p-4'>
                        <div className='flex justify-start items-center gap-4'>
                            <img className='object-cover rounded-full w-20 h-20' src="https://www.tailwind-kit.com/images/person/6.jpg" />
                            <p className="text-3xl font-bold text-gray-900">Zeca Afonso</p>
                        </div>

                        <div className="mt-4 text-gray-600">
                            <div className="flex items-center underline">
                                <FaMapPin className='text-xl mr-2' />
                                Porto
                            </div>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <div className="flex items-center underline">
                                <FaCoins className='text-xl mr-2' />
                                Desde 1000€
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                        <div className="mt-4">
                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>
                                <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>
                                <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
                                <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">Details</h2>

                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}