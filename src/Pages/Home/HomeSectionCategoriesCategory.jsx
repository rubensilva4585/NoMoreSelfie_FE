import { Link } from "react-router-dom";

export default function HomeSectionCategoriesCategory({ imageUrl, category_id, title }) {
    return (
        <Link to={`/search?category_id=${category_id}`} style={{ textDecoration: 'none' }}>
            <div style={{ cursor: 'pointer' }}>
                <div className="mb-4 text-center opacity-90">
                        <img 
                            alt="category" 
                            src={ imageUrl } 
                            className="mx-auto object-cover rounded-full h-40 w-40 "/>
                </div>
                <div className="text-center">
                    <p className="text-xl text-gray-80">
                        { title }
                    </p>
                </div>
            </div>
        </Link>
    )
}
