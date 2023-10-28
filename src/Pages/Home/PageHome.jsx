import HomeSectionCategories from "./HomeSectionCategories";
import HomeSectionDistricts from "./HomeSectionDistricts";
import HomeSectionSearchBar from "./HomeSectionSearchBar";

export default function PageHome() {
	return (
		<>
			<HomeSectionSearchBar />
			<HomeSectionDistricts />
			<HomeSectionCategories />
		</>
	);
}
