import { Link } from "react-router-dom";

export default function HomeSectionCategoriesCategory({ imageUrl, category_id, title }) {
    return (
        <Link to={`/search?category_id=${category_id}`} style={{ textDecoration: 'none' }}>
            <div style={{ cursor: 'pointer' }}>
                <div class="mb-4 text-center opacity-90">
                        <img 
                            alt="category" 
                            src={ imageUrl } 
                            class="mx-auto object-cover rounded-full h-40 w-40 "/>
                </div>
                <div class="text-center">
                    <p class="text-xl text-gray-80">
                        { title }
                    </p>
                </div>
            </div>
        </Link>
    )
}
