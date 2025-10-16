import React, {useCallback, useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Image, Container } from "react-bootstrap";

import Instructors from "./Intructors";
import Partnors from "./Partnors";
import InterestedCourses from '../InterestedPart/InterestedCourses';

import './About.css';
import SeoHead from "../../utils/SEOHead/SEOHead";
import {universalAPI} from "../../api/api";
import {toast} from "react-toastify";

function AboutPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage('az');
    }, []);

    const [data, setData] = useState({});

    const getAboutUsPage = async () => {
        try {
            const res = await universalAPI.getAllAboutUsPage()
            if (res.status === 'OK') {
                setData({users:res?.body?.users, partners: res?.body?.partners, aboutDefinitions: res?.body?.aboutDefinitions, abouts:res?.body?.abouts })
            } else {
                toast.error(res.body)
            }
        } catch (error) {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getAboutUsPage();
    }, [])

    useEffect(() => {
        debugger
        console.log(data);
    }, [data])


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
                        {/*<p className="about-content">{t('about.content')}</p>*/}
                        {data?.abouts?.map((item, idx) => (
                            <p key={idx} className="about-content">
                                {item.content}
                            </p>
                        ))}
                    </div>
                    <div>
                        {/*<Row className="pb-5">*/}
                        {/*    <Col xs={12} md={2}>*/}
                        {/*        <Image className="about-img" />*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={12} md={10}>*/}
                        {/*        <div className="position-relative about-section-header-wrapper">*/}
                        {/*            <h3 className="about-section-header">{t('about.vision')}</h3>*/}
                        {/*            <span className="about-header--border"></span>*/}
                        {/*        </div>*/}
                        {/*        <p className="about-text">{t('about.visionText')}</p>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        {data?.aboutDefinitions?.map((element, idx) => (
                            <Row key={idx} className="pb-5">
                                <Col xs={12} md={2}>
                                    <Image className="about-img" />
                                </Col>
                                <Col xs={12} md={10}>
                                    <div className="position-relative about-section-header-wrapper">
                                        <h3 className="about-section-header">
                                            {element.name}
                                        </h3>
                                        <span className="about-header--border"></span>
                                    </div>
                                    <p className="about-text">
                                        {element.content}
                                    </p>
                                </Col>
                            </Row>
                        ))}
                    </div>
                    <Instructors users={data?.users}/>
                    <Partnors  partners={data?.partners}/>
                </Container>
                <InterestedCourses />
            </div>
        </>
    )
}

export default AboutPage;
