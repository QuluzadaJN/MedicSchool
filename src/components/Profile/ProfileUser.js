import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ClientCoursesContainer from "./ClientCoursesContainer";

import { authAPI } from '../../api/api';

import "./ProfileUser.css"
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../../api/usersApiSlice";
import {logOut} from "../../store/authSlice";

export default function ProfileUser() {
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState({});
    let { userInfo1 } = useSelector((state) => state.auth)
    const [logOutToApi] = useLogoutMutation();
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        console.log(userInfo1)
        try {
            const resp = await logOutToApi(userInfo1.body.email).unwrap();
            if (resp.status === 'OK') {
                dispatch(logOut());
                toast.success(resp.body)
                window.location.reload();
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err.data.message || err.error)
        }
    }
    const getUserInfo = async () => {
        try {
            const resp = await authAPI.getUserShortInfo();
            debugger
            if(resp.status === 'OK') {
                debugger
                setUserInfo(resp.body)
            }
            else if(resp.status ==='FORBIDDEN') {
                logoutHandler()
                toast.error(t('actions.dublicateSession'))
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])
    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    return (
        <>
            <Helmet>
                <title>{t('profil')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
                <meta name='description' content={userInfo?.biography} />
            </Helmet>

            <div className="bg-gray">
                <div className="user-header">
                    <Container>
                        <Row className="align-items-center">
                            <Col sm={12} md={2}>
                                <Image src={userInfo.profilePhotoContent} roundedCircle className="user-profile-img" />
                            </Col>
                            <Col sm={12} md={10}>
                                <h1 className="user-name">{userInfo?.fullName}</h1>
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
                        <ClientCoursesContainer />
                    </div>
                </Container>
                {/* <InterestedCourses /> */}
            </div>
        </>
    )
}