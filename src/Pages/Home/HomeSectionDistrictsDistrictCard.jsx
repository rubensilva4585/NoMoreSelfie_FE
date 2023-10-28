import { Link } from "react-router-dom";

export default function HomeSectionDistrictsDistrictCard({
	imageUrl,
	district_id,
	title,
}) {
	return (
		<Link
			to={`/search?district_id=${district_id}`}
			style={{ textDecoration: "none" }}
		>
			<div className="cursor-pointer">
				<div className="w-52 h-72 overflow-hidden shadow-md hover:shadow-lg rounded-2xl">
					<img
						alt={title}
						src={imageUrl}
						className="w-full h-full object-cover object-center rounded-t-lg"
					/>
				</div>
				<p className="font-bold mt-2 text-gray-200">{title}</p>
			</div>
		</Link>
	);
}
