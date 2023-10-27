import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SearchCardCarousel.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IMAGE_STORAGE_PATH } from "../../constants/General";

export default function SearchCardCarousel({ images }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const settings = {
    dots: true,
    infinite: true,
    accessibility: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative SearchCardCarousel">
      <Slider {...settings}>
        {images.map((image) => (
          <div>
            <img
              alt="portfolio"
              src={IMAGE_STORAGE_PATH + image}
              className="object-cover w-full max-h-40"
            />
          </div>
        ))}
      </Slider>
      <div>
        <AiOutlineHeart
          className={`text-gray-100 hover:text-white drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out  ${
            isLiked && "opacity-0 z-0"
          }`}
          onClick={handleLike}
        />
        <AiFillHeart
          className={`text-orange-400 hover:text-orange-500 drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out ${
            !isLiked && "opacity-0 z-0"
          }`}
          onClick={handleLike}
        />
      </div>
    </div>
  );
}
