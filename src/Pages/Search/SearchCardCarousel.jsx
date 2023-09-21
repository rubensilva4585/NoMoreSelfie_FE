import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SearchCardCarousel.css'

export default function SearchCardCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        accessibility: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div>
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
        </div>
    );
}
