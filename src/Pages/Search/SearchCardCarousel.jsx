import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SearchCardCarousel.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IMAGE_STORAGE_PATH } from "../../constants/General";
import { addUserFavorites, removeUserFavorites, getUserFavorites } from "../../API/User";

export default function SearchCardCarousel({ images, supplier_id }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();

    if (isLiked) {
      console.log(supplier_id)
      removeUserFavorites(supplier_id)
        .then((response) => {
          alert("Removido dos favoritos!")
          setIsLiked(!isLiked);
        })
        .catch((error) => {
          alert("Erro ao remover dos favoritos!")
        })
    } else {
      console.log(supplier_id)
      addUserFavorites(supplier_id)
        .then((response) => {
          alert("Adicionado aos favoritos!")
          setIsLiked(!isLiked);
        })
        .catch((error) => {
          alert("Erro ao adicionar aos favoritos!")
        })
    }
    console.log("like")
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

  useEffect(() => {
    getUserFavorites()
      .then((response) => {
        const favorites = response;
        const isLiked = favorites.some((favorite) => favorite.id === supplier_id);
        console.log(isLiked)
        setIsLiked(isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          className={`text-gray-100 hover:text-white drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out  ${isLiked && "opacity-0 z-0"
            }`}
          onClick={handleLike}
        />
        <AiFillHeart
          className={`text-orange-400 hover:text-orange-500 drop-shadow-md text-2xl z-20 absolute right-2 top-2 transition duration-200 ease-in-out ${!isLiked && "opacity-0 z-0"
            }`}
          onClick={handleLike}
        />
      </div>
    </div>
  );
}
