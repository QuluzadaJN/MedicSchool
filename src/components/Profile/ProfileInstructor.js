import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Col, Container, Image, Row } from "react-bootstrap";

import CoursesContainer from '../Courses/CoursesContainer';
import InterestedCourses from "../InterestedPart/InterestedCourses";

import { authAPI } from '../../api/api';

import "./ProfileInstructor.css"

export default function ProfileInstructor() {
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async () => {
        try {
            const resp = await authAPI.getUserShortInfo();
            setUserInfo(resp.body)
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, userInfo)

    return (
        <>
            <Helmet>
                <title>{t('profil')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
                <meta name='description' content={userInfo && userInfo.biography} />
            </Helmet>
            <div className="bg-gray">
                <Container className="bg-white px-4">
                    <div className="user-content pb-4">
                        {userInfo &&
                            <div className="user-content-header">
                                <Row>
                                    <Col sm={12} md={2}>
                                        <Image src={userInfo.profilePhotoContent} />
                                    </Col>
                                    <Col sm={12} md={10}>
                                        <h2 className="instructor-name">{userInfo.fullName}</h2>
                                        <span className='detail-badge me-2'>TEACHER</span><span className='detail-span'>BLS İnstructor</span>
                                    </Col>
                                </Row>
                                <p className="instructor-content-text">
                                    {userInfo.biography}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="user-courses">
                        <CoursesContainer />
                    </div>
                </Container>
                <InterestedCourses />
            </div>
        </>
    )
}