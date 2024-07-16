import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CoursesContainer from "../Courses/CoursesContainer";

import { authAPI } from '../../api/api';

import "./ProfileUser.css"

export default function ProfileUser() {
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
            </Helmet>
            <div className="bg-gray">
                <div className="user-header">
                    <Container>
                        <Row className="align-items-center">
                            <Col sm={12} md={2}>
                                <Image src={userInfo.profilePhotoContent} roundedCircle className="user-profile-img" />
                            </Col>
                            <Col sm={12} md={10}>
                                <h1 className="user-name">{userInfo.fullName}</h1>
                                <Button className="edit-user" href='/settings'><FontAwesomeIcon className="me-3" icon={faPen} />Düzəliş et</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="bg-white px-4">
                    <div className="user-content pt-5 px-4 pb-4">
                        <div className="user-content-header">
                            <h1 className="user-name user-content-name">{userInfo.fullName}</h1>
                            <p className="user-content-text">{userInfo.biography}</p>
                            <Button className="edit-user" href='/settings'><FontAwesomeIcon className="me-3" icon={faPen} />Düzəliş et</Button>
                        </div>
                    </div>
                    <div className="user-courses">
                        <CoursesContainer />
                    </div>
                </Container>
                {/* <InterestedCourses /> */}
            </div>
        </>
    )
}