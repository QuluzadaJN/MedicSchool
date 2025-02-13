import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Col, Image, Row, Button, ProgressBar } from 'react-bootstrap';

import './CoursesList.css';

export default function Course({ id, img, topic, instructorName, progress }) {
    const { t } = useTranslation();
   
    return (
        <div className='mb-3'>
            <NavLink style={{ textDecoration: 'none' }} to={`/content/byCourse/${id}`}>
                <Row>
                    <Col sm={12} md={3}>
                        <Image src={img} className='course-img' />
                    </Col>
                    <Col sm={12} md={5}>
                        <div>
                            {/* <Badge bg="warning" text="dark">ƏN ÇOX SATILAN</Badge> */}
                            <h2 className='course-title mt-3 mb-0'>{topic}</h2>
                            <p className='course-author'>{instructorName}</p>
                            <ProgressBar className='course-progress-bar' now={progress} />
                            {progress === 0 ?
                                <><p className='course-status mb-0'>{t('course.notStarted')}</p>
                                <Button className='course-btn'>{t('actions.startCourse')}</Button></>
                                : <Button className="course-btn mt-3">{t('actions.continueCourse')}</Button>}
                        </div>
                    </Col>
                </Row>
            </NavLink>
        </div>
    )
}