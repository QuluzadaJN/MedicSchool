
import { toast } from 'react-toastify';
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Blogs from "./Blog";
import Loader from "../component/Loader";
import CoursePagination from "../component/CoursePagination";

import { authAPI } from '../../api/api';
import SeoHead from "../../utils/SEOHead/SEOHead";

export default function CoursesContainer() {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    const getBlogs = async () => {
        try {
            const res = await authAPI.getBlogs(page)
            if (res.status === 'OK') {
                setData({ courses: res?.body?.items, totalPage: res?.body?.totalPages })
            } else {
                toast.error(res.body)
            }
        } catch (error) {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getBlogs();
    }, [page])

    const handleChangePage = useCallback((page) => {
        setPage(page)
    }, [])
    const seoUrl= 'https://www.medicschool.az/blogs'

    return (
        <>
            <SeoHead
                title={t('about.title')}
                description={data.courses && data.courses.length > 0 && data.courses.map(course => course.content)}
                url={seoUrl}
            />
            <Container>
                {data.courses && data.courses.length > 0 ?
                    <>
                        <Row className='align-items-center my-4'>
                            <Col sm={12}>
                                <h2 className='coursesDetail-header'>{t('blog.header')}</h2>
                                <p className='coursesDetail-text'>{t('blog.text')}</p>
                            </Col>
                        </Row>
                        <div>
                            <Row>
                                {data.courses && data.courses.length > 0 ?
                                    data.courses.map((course, index) => (
                                        <Col sm={12} md={4} key={index}>
                                            <Blogs
                                                id={course.id}
                                                coverPhoto={course.coverPhoto}
                                                topic={course.topic && (course.topic.length > 25 ? course.topic.substr(0,25)+('...') : course.topic)}
                                                content={course.description }
                                                seoDescription={course.seoDescription}
                                            />
                                        </Col>
                                    ))
                                    : <Loader />
                                }
                            </Row>
                            {data.totalPage > 1 && (
                                <CoursePagination
                                    total={data.totalPage}
                                    current={page}
                                    onChangePage={handleChangePage}
                                />
                            )}
                        </div>
                    </>
                    :
                    <p style={{ textAlign: "center", fontSize: "52px", margin: "64px 0" }}>{t('notFound.course')}</p>
                }
            </Container>
        </>
    )
}
