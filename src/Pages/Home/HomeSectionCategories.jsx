import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSectionCategoriesCategory from "./HomeSectionCategoriesCategory";

export default function HomeSectionCategories() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <section class=" bg-beige">
        <div className="container mx-auto px-3 md:px-12 py-20">
            <div className="title mb-14">
              <p className="mb-2 text-4xl font-bold text-orange-400">
                Categorias
              </p>
              <p className="text-2xl font-light text-black">
                Procure por categoria
              </p>
            </div>

            <Slider {...settings}>
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/1.jpg" title="Casamento" category_id={1} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/2.jpg" title="Drone" category_id={2} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/3.jpg" title="Festa e Aniversario" category_id={3} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/4.jpg" title="Empresariais" category_id={4} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/5.jpg" title="Bebé" category_id={5} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/6.jpg" title="Restauração" category_id={6} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/2.jpg" title="Turismo" category_id={7} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/3.jpg" title="Moda" category_id={8} />
              <HomeSectionCategoriesCategory imageUrl="https://www.tailwind-kit.com/images/blog/4.jpg" title="Lazer" category_id={9} />
            </Slider>
        </div>
      </section>
    </>
  )
}
