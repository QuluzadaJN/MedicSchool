import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card } from "react-bootstrap";

function Blogs({ id, coverPhoto, topic, content }) {
    const { t } = useTranslation();
    
    return (
        <div className="mb-3" key="">
            <NavLink style={{ textDecoration: 'none' }}
                to={`/blog/${id}`}
            >
                <Card className="courses-card">
                    <Card.Img variant="top" src={coverPhoto} style={{ minHeight: "270px" }} />
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
