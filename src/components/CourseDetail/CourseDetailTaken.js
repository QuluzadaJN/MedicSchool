import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Tab, Nav, Col, Container, Row, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDownload } from '@fortawesome/free-solid-svg-icons';

import Loader from '../component/Loader';
import Rating from '../component/Rating/Rating';

import { authAPI } from '../../api/api';

import './CourseDetailTaken.css';

export default function CourseDetailTaken() {
    const { t } = useTranslation();
    const { id: courseId } = useParams();

    const [courses, setCourses] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [selectedContents, setSelectedContents] = useState([]);

    const ClearCommentInput =()=>{
        setCommentInput('')
    }
    const getCourseDetail = async () => {
        try {
            const resp = await authAPI.getAllByCourseId(courseId);
            if (resp.status === 'OK') {
                setCourses(resp)
                setActiveKey(resp.body.items[0].id)
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    const getCourseComments = async () => {
        try {
            const res = await authAPI.getCommentsByCourseId(courseId);
            if (res.status === 'OK') {
                setComments(res)
            } else {
                toast.error(res.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    const handleRateCourse = async (rating) => {
        try {
            const resp = await authAPI.postSubmitRating({ courseId, rating });
            if (resp.status === 'OK') {
                toast.success(resp.body);
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getCourseDetail();
        getCourseComments();
    }, [])

    const sendComment = async () => {
        if (commentInput !== "") {
            try {
                const resp = await authAPI.postComment({ comment: commentInput, courseId });
                if (resp.status === 'OK') {
                    toast.success(resp.body);
                    ClearCommentInput();
                    getCourseComments()
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        }
    }

    const saveCertificateCourse = async () => {
        try {
            const respon = await authAPI.getCourseCertificate(courseId);
            if (respon.status === 'OK') {
                const linkSource = `data:application/pdf;base64,${respon.body.content}`;
                const downloadLink = document.createElement("a");
                const fileName = respon.body.fileName;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            } else {
                toast.error(respon.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    const putProgress = async (contentId) => {
        try {
            const response = await authAPI.updateUserProgressOnCourse(contentId);
            if (response.status === 'OK') {
                setSelectedContents(s => [...s, contentId]);
            } else {
                toast.error(response.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    return (
        <>
            <Helmet>
                <title>{t('menu.courses')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
                <meta name='description' content={courses && courses.body && courses.body.items.map(item => item.description)} />
            </Helmet>
            <Container className='my-5'>
                <Tab.Container id="right-tabs-example" defaultActiveKey="event-cont1">
                    <Nav variant="pills" className="mb-3">
                        <Nav.Item>
                            <Nav.Link className="courseDetail-tab-first py-0" eventKey="event-cont1">
                                {t('course.contents')}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="courseDetail-tab-first py-0" eventKey="event-cont2">
                                {t('course.comments')}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="event-cont1">
                            {courses && courses.body ?
                                <Tab.Container id="left-tabs-example" defaultActiveKey={`event${activeKey}`}>
                                    <Row>
                                        <Col sm={12} md={9}>
                                            <Tab.Content>
                                                {courses?.body?.items?.map((course, index) => {
                                                    return (
                                                        <Tab.Pane key={index} eventKey={`event${course.id}`}>
                                                            <div>
                                                                <h1 className='detail-header'>{course.courseName}</h1>
                                                                <ReactPlayer config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                                    onContextMenu={e => e.preventDefault()}
                                                                    className="course-video" url={course.mediaPath} controls />
                                                                <div className='detail-fav-div pt-4'></div>
                                                                <div className='my-4 detail-section-header d-flex align-items-center'>
                                                                    <span>{course.id}</span>
                                                                    <h1 className='mb-0'>{course.name}</h1>
                                                                </div>
                                                                <p className='detail-text my-4'>
                                                                    {course.description}
                                                                </p>
                                                                {index === courses.body.items.length - 1 &&
                                                                    <>
                                                                        <Row className='course-certificate mt-5 mb-4'>
                                                                            <Col sm={12} md={6}>
                                                                                <p className='course-certificate-name mb-0'>{course.courseName}</p>
                                                                            </Col>
                                                                            <Col sm={12} md={6}>
                                                                                <p className='mb-0 course-certificate-download' onClick={saveCertificateCourse}>{t('actions.download')} <FontAwesomeIcon className='ms-3' icon={faDownload} /></p>
                                                                            </Col>
                                                                        </Row>
                                                                        <div>
                                                                            <Rating handleRateCourse={handleRateCourse} />
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </Tab.Pane>
                                                    )
                                                })}
                                            </Tab.Content>
                                        </Col>
                                        <Col sm={12} md={3}>
                                            <div className='taken-detail-right d-flex align-items-center'>
                                                <div className='w-100'>
                                                    <p className='taken-detail-right-header'>{t('course.courseContent')}</p>
                                                    <Nav variant="pills" className="flex-column">
                                                        {courses?.body?.items?.map((course, index) => {
                                                            return (
                                                                <Nav.Item key={index}>
                                                                    <Nav.Link className="courseDetail-tab py-0" eventKey={`event${course.id}`} onClick={() => putProgress(course.id)}>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <div className='detail-right-section d-flex align-items-center'>
                                                                                <span className={(course.completedByUser || selectedContents.includes(course.id)) && 'active-number'}>{index + 1}</span>
                                                                                <p className='mb-0'>{course.name}</p>
                                                                            </div>
                                                                            <FontAwesomeIcon icon={faCheck} className={`detail-right-checkIcon ${(course.completedByUser || selectedContents.includes(course.id)) && 'active-icon'}`} />
                                                                        </div>
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            )
                                                        })}
                                                    </Nav>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                                :
                                <Loader />
                            }
                        </Tab.Pane>
                        <Tab.Pane eventKey="event-cont2">
                            <form>
                                <textarea className="w-100 comment-input"
                                          value={commentInput}
                                          onChange={(event) => setCommentInput(event.target.value)}></textarea>
                                <div className="text-right">
                                    <Button className="sendComment" onClick={sendComment}>{t('actions.send')}</Button>
                                </div>
                            </form>
                            {comments && comments.body ?
                                comments.body.items.map((comment, index) => {
                                    return (
                                        <div className="comment-div" key={index}>
                                            <p className="comment-name">{comment.fullName}</p>
                                            <p className="comment-content mb-0">{comment.comment}</p>
                                        </div>
                                    )
                                })
                                :
                                <Loader />
                            }
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container >
        </>
    )
}
