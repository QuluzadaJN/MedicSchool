import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Image, Container } from "react-bootstrap";

import Instructors from "./Intructors";
import Partnors from "./Partnors";
import InterestedCourses from '../InterestedPart/InterestedCourses';

import './About.css';
import SeoHead from "../../utils/SEOHead/SEOHead";

function AboutPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage('az');
    }, []);
    const seoUrl = 'https://www.medicschool.az/about'
    return (
        <>
            <SeoHead
                title={t('about.title')}
                description={t('about.content')}
                url={seoUrl}
            />
            <div className="bg-gray">
                <Container className="bg-white px-sm-4 px-md-5">
                    <div className="py-sm-0 py-md-5">
                        <h1 className="about-header pt-sm-0 pt-md-5">{t('about.title')}</h1>
                        <p className="about-content">{t('about.content')}</p>
                    </div>
                    <div>
                        <Row className="pb-5">
                            <Col xs={12} md={2}>
                                <Image className="about-img" />
                            </Col>
                            <Col xs={12} md={10}>
                                <div className="position-relative about-section-header-wrapper">
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
                                <div className="position-relative about-section-header-wrapper">
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
                                <div className="position-relative about-section-header-wrapper">
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
