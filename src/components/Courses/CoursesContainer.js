
import { toast } from 'react-toastify';
import { Col, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from "react";

import Filter from "../Filter/Filter";

import Courses from "../Courses/Courses";
import Loader from "../component/Loader";
import CoursePagination from "../component/CoursePagination";

import { authAPI } from '../../api/api';

export default function CoursesContainer() {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    const getCourses = async () => {
        try {
            const res = await authAPI.getCoursesPagination(page)
            if (res.status === 'OK') {
                setData({ courses: res?.body?.items, totalPage: res?.body.totalPages })
            } else {
                toast.error(res.body)
            }
        } catch (error) {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    const handleFilter = async (val) => {
        try {
            const filter = val;
            const res = await authAPI.getAllByFilter({ page, filter })
            if (res.status === 'OK') {
                setData({ courses: res?.body?.items, totalPage: res?.body.totalPages })
            } else {
                toast.error(res.body)
            }
        } catch (error) {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getCourses();
    }, [page])

    const handleChangePage = useCallback((page) => {
        setPage(page)
    }, [])

    return (
        <>
            {data.courses && data.courses.length > 0 ?
                <>
                    <Row className='align-items-center my-4'>
                        <Col sm={12} md={10}>
                            <h2 className='coursesDetail-header'>{t('footerMenu.ourCourses')}</h2>
                            <p className='coursesDetail-text'>{t('course.containerText')}</p>
                        </Col>
                        <Col sm={12} md={2}>
                            <Filter handleFilter={handleFilter} />
                        </Col>
                    </Row>
                    <div>
                        <Row>
                            {data.courses && data.courses.length > 0 ?
                                data.courses.filter(el=>el.active === true).map((course, index) => (
                                    <Col sm={12} md={4} key={index}>
                                        <Courses
                                            id={course.id}
                                            img={course.coverPhotoPath}
                                            topic={course.topic}
                                            instructorName={course.instructorName}
                                            body={course.body}
                                            soldCount={course.soldCount}
                                            rating={course.rating}
                                            price={course.price}
                                            purchased={course.purchased}
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
        </>
    )
}
