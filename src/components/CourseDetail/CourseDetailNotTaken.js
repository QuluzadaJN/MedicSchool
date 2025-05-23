import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Container } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import linkedinIcon from '../../images/linkedin.svg';
import internetIcon from '../../images/internet.svg';
import instagramIcon from '../../images/instagram.svg';

import { authAPI } from '../../api/api';
import Loader from '../component/Loader';

import './CourseDetailNotTaken.css';
import {TooltipWrapper} from "../../utils/TooltipWrapper/TooltipWrapper";
import SeoHead from "../../utils/SEOHead/SEOHead";
import {useLogoutMutation} from "../../api/usersApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/authSlice";

export default function CourseDetailNotTaken({showRegParam, setShowRegParam, showLogin, setShowLogin}) {
    const { t } = useTranslation();
    const handleShowLogin =()=>{
        debugger
        setShowLogin(!showLogin)
    }
    // onClick={() => {
    //     setShowLogin(true);
    //     setShowRegParam(false)
    //     // setIsLoginOrRegister(false)
    // }}
    const navigate = useNavigate();
    const todayDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

    const { id: courseId } = useParams();

    const [course, setCourse] = useState({});

    const [discountedDate, setDiscountedDate] = useState("");
    let { userInfo } = useSelector((state) => state.auth)
    const [logOutToApi] = useLogoutMutation();
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        console.log(userInfo)
        try {
            const resp = await logOutToApi(userInfo.body.email).unwrap();
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
    const getCoursesById = async () => {
        try {
            const resp = await authAPI.getCourseById(courseId);
            if (resp.status === 'OK') {
                setCourse(resp);

                parseDate(todayDate, resp.body.discountEndDate)
            } else {
                debugger
                resp.status ==='FORBIDDEN' && logoutHandler()
                toast.error(t('actions.dublicateSession'))
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    function parseDate(first, second) {
        const firstDate = first.split('/');
        const secondDate = second.split('/');
        const year = (secondDate[2] - firstDate[2]);
        const month = (secondDate[1] - firstDate[1]);
        const day = (secondDate[0] - firstDate[0]);
        setDiscountedDate(year > 0 ? (year + " il") : "" + month > 0 ? (month + " ay") : "" + day > 0 ? (day + " gün") : "")
    }

    const urlsite = window.location.href;


    useEffect(() => {
        getCoursesById();
    }, [])

    const handlePurchaseCourse = async () => {
        if (localStorage.getItem('userInfo')) {

            const model = {
                "courseId": courseId,
                "order":{
                    "amount": course.body.discountedPrice ? course.body.discountedPrice.toString() : course.body.price.toString(),
                    "currency": "AZN",
                    "description": "string",
                    "language": "az",
                    "hppCofCapturePurposes":["Cit"],
                    "hppRedirectUrl":urlsite,
                    "typeRid":"Order_SMS"
                    }
            };

            try {
                const resp = await authAPI.postPurchaseCourse(model);
                if (resp.status === 'OK') {
                    debugger
                    const orderId = resp.body.order.id;
                    // const sessionId = resp.body.response.order.sessionId;
                    //
                    localStorage.setItem("orderId", orderId);
                    // localStorage.setItem("sessionId", sessionId);
                    debugger
                    if(orderId !==0) window.location.assign(resp.body.order.RedirectUrlFromBack);
                    else window.location.reload();

                    // window.location.assign(`https://3dsrv.kapitalbank.az/index.jsp?ORDERID=${orderId}&SESSIONID=${sessionId}`);
                } else {
                    toast.error(resp.body);
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage);
            }
        }
    }

    const handleCheckPurchase = async (orderId) => {
        try {
            const resp = await authAPI.postCheckPayment({ orderId });
            if (resp.status === 'OK') {
                navigate(`/content/byCourse/${courseId}`);
                localStorage.removeItem("orderId");
                // localStorage.removeItem("sessionId");
            } else {
                toast.error(resp.body);
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage);
        }
    }
    const isDisabled = !localStorage.getItem('userInfo');
    // console.log('isDisabled')
    // console.log(isDisabled)
    const storageOrderId = localStorage.getItem("orderId");
    // const storageSessionId = localStorage.getItem("sessionId");

    useEffect(() => {
        if (storageOrderId && !isNaN(storageOrderId)) {
            if(parseInt(storageOrderId) !== 0) handleCheckPurchase(parseInt(storageOrderId))
            else {
                navigate(`/content/byCourse/${courseId}`);
                localStorage.removeItem("orderId");
            }
        }
    }, storageOrderId);
    const tooltipText = course?.body?.price > 0 ? 'Kursu almaq üçün Qeydiyyatdan keçin və ya Giriş edin' : 'Kursu keçmək üçün Qeydiyyatdan keçin və ya Giriş edin'
    const seoUrl = `https://www.medicschool.az/course/id/${courseId}`

    return (
        <>
            <SeoHead
                title={course?.body?.topic}
                description={course && course.body && course?.body?.body}
                url={seoUrl}
            />
            <Container className='my-5'>
                {course && course.body ?
                    <Row>
                        <Col sm={12} md={9}>
                            <div>
                                <h1 className='detail-header'>{course.body.topic}</h1>
                                <ReactPlayer config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    onContextMenu={e => e.preventDefault()}
                                    className="course-video" url={course.body.demoFilePath} controls />
                                {/* <div className='detail-fav-div d-flex justify-content-end align-items-center p-2'>
                                    <span className='detail-fav'><FontAwesomeIcon className='me-3' icon={faShareNodes} />{t('actions.share')}</span>
                                    <span className='detail-fav ms-4'><FontAwesomeIcon className='me-2' icon={faPlus} />{t('actions.addtoFavorites')}</span>
                                </div> */}
                                {/* <h4 className='detail-title'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non condimentum mauris. Nam vulputate a dui at interdum. In rutrum mollis arcu nec consectetur.
                            </h4> */}
                                <p className='detail-text my-4'>
                                    {course.body.body}
                                </p>
                                <Image className='course-coverPhoto' src={course.body.coverPhotoPath} />
                                <h4 className='detail-title mt-5'>
                                    {t('course.whatToLearn')}
                                </h4>
                                <div className='my-4 ms-4'>
                                    {course?.body?.contents?.map((content, index) => {
                                        return (
                                            <div className='d-flex align-items-center' key={index}>
                                                <span className='detail-list-span'></span>
                                                <h4 className='detail-title'> {content.name}</h4>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h4 className='detail-title'>
                                    {t('course.whoResp')}
                                </h4>

                                <p className='detail-text my-4'>{course.body.courseBelongsTo}</p>

                                <h4 className='detail-title'>
                                    {t('course.requirementsAndMaterials')}
                                </h4>

                                <p className='detail-text my-4'>{course.body.requirementsAndMaterials}</p>
                                {/* <p className='detail-text my-4'>Regarding the materials, you will need a computer with the aforementioned programs installed
                                (or similar) and an iPad or graphics tablet.</p> */}

                                <div className='detail-instructor my-4 pb-5'>
                                    <Row>
                                        <Col sm={12} md={3}>
                                            <Image className='instructorProfilPhoto' src={course.body.instructor.profilePhotoPath} />
                                        </Col>
                                        <Col sm={12} md={9}>
                                            <h2 className='detail-instructor-name'>{course.body.instructor.fullName}</h2>
                                            <span className='detail-badge me-2'>{course.body.instructor.instructorPosition}</span>
                                            <div className='detail-social-media'>
                                                <a className="socialMediaLinks" href={course.body.instructor.instagramAddress} target="_blank" rel="noreferrer">
                                                    <Image src={instagramIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href={course.body.instructor.linkedinAddress} target="_blank" rel="noreferrer">
                                                    <Image className='m-3' src={linkedinIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href={course.body.instructor.instructorWorkplace} target="_blank" rel="noreferrer">
                                                    <Image src={internetIcon} />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className='detail-text my-4'>
                                        {course.body.instructor.biography}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={3}>
                            <div className='detail-right'>
                                {course.body.discountPercentage !== 0 ?
                                    <>
                                        <h1 className='course-detail-price'>₼{course.body.discountedPrice} AZN</h1>
                                        <p className='detail-sale'>{course.body.discountPercentage}% {t('course.discount')}
                                        <span className='detail-old-price'>{course.body.price}₼</span></p>
                                    </> :
                                    <h1 className='course-detail-price'>₼{course.body.price} AZN</h1>
                                }
                                <div className='p-relative'>
                                    {/*<TooltipWrapper*/}
                                    {/*    tooltipText={tooltipText}*/}
                                    {/*    disabledCondition={!localStorage.getItem('userInfo')}*/}
                                    {/*    placement="bottom"*/}
                                    {/*>*/}
                                    {/*    <button*/}
                                    {/*        disabled={!localStorage.getItem('userInfo')}*/}
                                    {/*        className="btn btn-primary detail-btn"*/}
                                    {/*        onClick={handlePurchaseCourse}*/}
                                    {/*    >*/}
                                    {/*        {course.body.price > 0 ? t('actions.purchaseCourse') : t('actions.goToCourse')}*/}
                                    {/*    </button>*/}
                                    {/*</TooltipWrapper>*/}
                                    <TooltipWrapper
                                        tooltipText={tooltipText}
                                        disabledCondition={!localStorage.getItem('userInfo')}
                                        placement="bottom"
                                        onDisabledClick={handleShowLogin}
                                    >
                                        <button
                                            className={`btn btn-primary detail-btn ${!localStorage.getItem('userInfo') ? 'disabled' : ''}`}
                                            onClick={() => {
                                                // if (!localStorage.getItem('userInfo')) {
                                                //     debugger
                                                //
                                                // } else {
                                                    handlePurchaseCourse();
                                                // }
                                            }}
                                        >
                                            {course.body.price > 0 ? t('actions.purchaseCourse') : t('actions.goToCourse')}
                                        </button>
                                    </TooltipWrapper>
                                </div>
                                {(course.body.discountEndDate && discountedDate !== "") && <p className='detail-sale-duration'>{discountedDate} {t('course.saleDuration')}</p>}
                                <p className='deatil-right-text'>{course.body.commentCount} {t('course.comment')}</p>
                                <p className='deatil-right-text'>{course.body.contents.length} {t('course.lesson')} ({course.body.courseLength})</p>
                                {/* <p className='deatil-right-text'>12 əlavə resurs</p> */}
                                <p className='deatil-right-text'>{t('language.title')}: {course.body.language}</p>
                                <p className='deatil-right-text'>{t('course.level')}: {course.body.level}</p>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <div>
                                        <p className='detail-right-instructor'>{t('course.trainer')}: <span>{course.body.instructor.fullName}</span></p>
                                        <p className='detail-right-instructor'>{course.body.instructor.instructorPosition}</p>
                                    </div>
                                    <Image className='instructor-profil-img-right' src={course.body.instructor.profilePhotoContent} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Loader />
                }
            </Container>
        </>
    )
}
