import { FaCoins, FaMapPin } from "react-icons/fa"

export default function SearchResultCard() {
    return (
        <>
        {/* h-90 w-60 md:w-80 */}
            <div class="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer w-full"> 
                <a href="#" class="block w-full h-full">
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg" class="object-cover w-full max-h-40"/>
                    <div class="w-full p-4 bg-white">
                        <div class="flex items-center">
                            <a href="#" class="relative block">
                                <img alt="profil" src="https://www.tailwind-kit.com/images/person/6.jpg" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                            </a>
                            <p class="text-gray-800 font-medium ml-4 ">
                                Zeca Afonso
                            </p>
                        </div>
                        
                        <div class="flex gap-1 mt-2">
                            <span class="px-2  text-xs rounded-full text-red-600 border border-red-600 bg-red-200 ">
                                Edição Video
                            </span>
                            <span class="px-2  text-xs rounded-full text-pink-600 border border-red-600 bg-pink-200 ">
                                Casamentos
                            </span>
                        </div>

                        {/* <p class="font-medium text-indigo-500 text-md">
                            Video
                        </p> */}
                        <div class="flex flex-col gap-1 my-4 text-gray-600">
                            <div class="flex gap-1 items-center">
                                <FaMapPin/>
                                <span class="px-2 text-sm">
                                    Porto
                                </span>
                            </div>       
                            <div class="flex gap-1 items-center">
                                <FaCoins/>
                                <span class="px-2 text-sm">
                                    Desde 500€ até 1500€
                                </span>
                            </div>
                        </div>          
                        {/* <p class="mb-2 text-xl font-medium text-gray-800">
                            Work at home
                        </p>
                        <p class="font-light text-gray-400 text-md">
                            Work at home, remote, is the new age of the job, every person can work at home....
                        </p>        */}
                        <button class=" px-6 py-2 transition ease-in duration-200 text-orange-500 uppercase rounded-md hover:bg-orange-400 hover:text-white border border-orange-400 focus:outline-none w-full">
                            Orçamento gratuito
                        </button>


                    </div>
                </a>
            </div>
        </>
    )
}
