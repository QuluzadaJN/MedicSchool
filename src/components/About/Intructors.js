import { useTranslation } from 'react-i18next';
import { Col, Image, Row } from 'react-bootstrap';

import instructorImage from '../../images/instructor.png';

import './Instructor.css';

export default function Instructors({users}) {
    const { t } = useTranslation();

    return (
        <div>
            <h2 className='instructor-header my-4'>{t('about.trainers')}</h2>
            <Row>
                {users?.map((element, idx) => (
                    <Col key={idx} sm={12} md={6}>
                        <Row>
                            <Col sm={12} md={4}>
                                <Image
                                    className="about-instructor-img"
                                    src={element.profilePhotoPath}
                                    alt={element.fullName}
                                />
                            </Col>
                            <Col sm={12} md={8}>
                                <h3 className="instructor-name">
                                    {element.fullName}
                                </h3>
                                <div>
                                <span className="instructor-badge instructor-badge-danger me-2">
                                    {element.role}
                                </span>
                                </div>
                                <span className="mt-2 instructor-badge instructor-badge-info">
                                  {element.userPosition}
                                </span>
                                <p className="mt-2 instructor-text">
                                    {element.biography}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                ))}

            </Row>
        </div>
    )
}