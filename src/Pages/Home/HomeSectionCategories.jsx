import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSectionCategoriesCategory from "./HomeSectionCategoriesCategory";

export default function HomeSectionCategories() {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 5,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1536,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<section className=" bg-beige overflow-hidden">
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
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1481066717861-4775e000c88a?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Casamento"
							category_id={1}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1627666433456-5d09003892d1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Bebés"
							category_id={2}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1627244714766-94dab62ed964?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Edição"
							category_id={3}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Drone"
							category_id={4}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://plus.unsplash.com/premium_photo-1677221924410-0d27f4940396?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Festas"
							category_id={5}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1532635260-3db6e1ba8589?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Restauração"
							category_id={7}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1609861517208-e5b7b4cd4b87?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Turismo"
							category_id={8}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Moda"
							category_id={9}
						/>
						<HomeSectionCategoriesCategory
							imageUrl="https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80&w=2023&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							title="Desporto"
							category_id={12}
						/>
					</Slider>
				</div>
			</section>
		</>
	);
}
