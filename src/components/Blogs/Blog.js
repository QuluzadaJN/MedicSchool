import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card } from "react-bootstrap";
import SeoHead from "../../utils/SEOHead/SEOHead";

function Blogs({ id, coverPhoto, topic, content ,seoDescription}) {
    debugger
    console.log(seoDescription?seoDescription:'is null seo desc')
    const { t } = useTranslation();
    // const seoDesc="Medic School Training Center 2021-ci ildən etibarən tibbi təhsil və korporativ idarəetmə sahələrində fəaliyyət göstərən Amerika Ürək Assosiasiyası (American Heart Association) tərəfindən akkreditasiya olunmuş və təsdiqlənmiş Beynəlxalq Təlim Mərkəzi (AHA - International Training Center) statusunu əldə etmiş təlim mərkəzidir."

    return (
        <div className="mb-3" key="">

            <NavLink style={{ textDecoration: 'none' }}
                to={`/blog/${id}`}
            >
                <Card className="courses-card">
                    <Card.Img variant="top" src={coverPhoto} style={{ height: "300px" }} />
                    <Card.Body>
                        <Card.Title className="courses-header px-4">{topic}</Card.Title>
                        <Card.Text className="courses-text px-4 text-truncate">
                            {content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </NavLink>

        </div>
    )
}

export default Blogs;
