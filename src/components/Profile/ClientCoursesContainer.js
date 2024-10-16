
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

    const getClientCourses = async () => {
        try {
            const res = await authAPI.getClientCourses(page)
            if (res.status === 'OK') {
                setData({ courses: res?.body?.items, totalPage: Math.ceil((res?.body?.items.length) / 6) })
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
        getClientCourses();
    }, [page])

    const handleChangePage = useCallback((page) => {
        setPage(page)
    }, [])

    return (
        <>
            {data.courses && data.courses.length > 0 ?
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
                        <h1 className="course-header me-3" style={{ textTransform: 'uppercase' }}>{t('menu.myCourses')}</h1>
                        <Filter handleFilter={handleFilter} />
                    </div>
                    <div>
                        <Row>
                            {data.courses && data.courses.length > 0 ?
                                data.courses.map((course, index) => (
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
