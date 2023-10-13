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
        slidesToScroll: 1,
    }

    return (
        <div className="relative SearchCardCarousel">
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
                    className={`text-gray-100 hover:text-white drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out  ${isLiked && 'opacity-0 z-0'}`}
                    onClick={handleLike}
                />
                <AiFillHeart
                    className={`text-orange-400 hover:text-orange-500 drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out ${!isLiked && 'opacity-0 z-0'}`}
                    onClick={handleLike}
                />
            </div>
        </div>
    );
}
