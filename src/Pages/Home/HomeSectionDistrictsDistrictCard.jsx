export default function HomeSectionDistrictsDistrictCard({ imageUrl, district_id, title }) {
    return (
        <div className="cursor-pointer">
            <div className="w-52 h-72 overflow-hidden shadow-md hover:shadow-lg rounded-2xl">
                <img alt={title} src={imageUrl} className="w-full h-full object-cover object-center rounded-t-lg" />
            </div>
            <p className="font-bold mt-2">{title}</p>
        </div>
    )
}
