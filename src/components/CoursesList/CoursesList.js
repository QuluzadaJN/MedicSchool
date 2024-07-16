import { toast } from 'react-toastify';
import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from "react";

import Course from "./Course";
import Filter from "../Filter/Filter";
import Loader from "../component/Loader";
import CoursePagination from "../component/CoursePagination";
import InterestedCourses from '../InterestedPart/InterestedCourses';

import { authAPI } from '../../api/api';

import './CoursesList.css';

export default function CoursesList() {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [page, setPage] = useState(1)

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
                setData({ courses: res?.body?.items, totalPage: Math.ceil((res?.body?.items.length) / 6) })
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
            <Helmet>
                <title>{t('menu.myCourses')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            {data.courses && data.courses.length > 0 ?
                <div>
                    <Container>
                        <div className="d-flex align-items-center mb-3 mt-5">
                            <h1 className="course-header me-3" style={{ textTransform: 'uppercase'}}>{t('menu.myCourses')}</h1>
                            <Filter handleFilter={handleFilter} />
                        </div>
                        <div className="mb-5">
                            {data.courses && data.courses.length > 0 ?
                                data.courses.map((course, index) => (
                                    <Course
                                        key={index}
                                        id={course.id}
                                        img={course.coverPhotoPath}
                                        topic={course.topic}
                                        instructorName={course.instructorName}
                                        progress={course.progress}
                                    />
                                ))
                                : <Loader />
                            }
                        </div>
                        {data.totalPage > 1 && (
                            <CoursePagination
                                total={data.totalPage}
                                current={page}
                                onChangePage={handleChangePage}
                            />
                        )}
                    </Container>
                    <InterestedCourses />
                </div>
                :
                <p style={{ textAlign: "center", fontSize: "52px", margin: "64px 0" }}>{t('notFound.course')}</p>
            }
        </>

    )
}
