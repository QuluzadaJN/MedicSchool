import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Image, Container } from "react-bootstrap";
import { Helmet } from 'react-helmet-async';

import Instructors from "./Intructors";
import Partnors from "./Partnors";
import InterestedCourses from '../InterestedPart/InterestedCourses';

import './About.css';

function AboutPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage('az');
    }, []);

    return (
        <>
            <Helmet>
                <title>{t('about.title')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div className="bg-gray">
                <Container className="bg-white px-5">
                    <div className="py-5">
                        <h1 className="about-header pt-5">{t('about.title')}</h1>
                        <p className="about-content">{t('about.content')}</p>
                    </div>
                    <div>
                        <Row className="pb-5">
                            <Col xs={12} md={2}>
                                <Image className="about-img" />
                            </Col>
                            <Col xs={12} md={10}>
                                <div className="position-relative" style={{ height: "44px" }}>
                                    <h3 className="about-section-header">{t('about.vision')}</h3>
                                    <span className="about-header--border"></span>
                                </div>
                                <p className="about-text">{t('about.visionText')}</p>
                            </Col>
                        </Row>
                        <Row className="pb-5">
                            <Col xs={12} md={2}>
                                <Image className="about-img" />
                            </Col>
                            <Col xs={12} md={10}>
                                <div className="position-relative" style={{ height: "44px" }}>
                                    <h3 className="about-section-header">{t('about.mission')}</h3>
                                    <span className="about-header--border"></span>
                                </div>
                                <p className="about-text">{t('about.missionText')}</p>
                            </Col>
                        </Row>
                        <Row className="pb-5">
                            <Col xs={12} md={2}>
                                <Image className="about-img" />
                            </Col>
                            <Col xs={12} md={10}>
                                <div className="position-relative" style={{ height: "44px" }}>
                                    <h3 className="about-section-header">{t('about.goal')}</h3>
                                    <span className="about-header--border"></span>
                                </div>
                                <p className="about-text">{t('about.goalText')}</p>
                            </Col>
                        </Row>
                    </div>
                    <Instructors />
                    <Partnors />
                </Container>
                <InterestedCourses />
            </div>
        </>
    )
}

export default AboutPage;
