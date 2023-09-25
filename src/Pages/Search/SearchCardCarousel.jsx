import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SearchCardCarousel.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function SearchCardCarousel() {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    const settings = {
        dots: true,
        infinite: true,
        accessibility: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className="relative">
            <Slider {...settings}>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg" className="object-cover w-full max-h-40" />
                </div>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/2.jpg" className="object-cover w-full max-h-40" />
                </div>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/3.jpg" className="object-cover w-full max-h-40" />
                </div>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/4.jpg" className="object-cover w-full max-h-40" />
                </div>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/5.jpg" className="object-cover w-full max-h-40" />
                </div>
                <div>
                    <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/6.jpg" className="object-cover w-full max-h-40" />
                </div>
            </Slider>
            <div>
                <AiOutlineHeart
                    className={`text-gray-100 hover:text-white text-3xl z-20 absolute right-4 top-4 transition duration-200 ease-in-out ${isLiked && 'opacity-0 z-0'}`}
                    onClick={handleLike}
                />
                <AiFillHeart
                    className={`text-rose-600 hover:text-rose-500 text-3xl z-20 absolute right-4 top-4 transition duration-200 ease-in-out ${!isLiked && 'opacity-0 z-0'}`}
                    onClick={handleLike}
                />
            </div>
        </div>
    );
}
