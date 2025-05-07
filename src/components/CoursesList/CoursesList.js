import { toast } from 'react-toastify';
import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React, { useCallback, useEffect, useState } from "react";

import Course from "./Course";
import Filter from "../Filter/Filter";
import Loader from "../component/Loader";
import CoursePagination from "../component/CoursePagination";
import InterestedCourses from '../InterestedPart/InterestedCourses';

import { authAPI } from '../../api/api';

import './CoursesList.css';
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../../api/usersApiSlice";
import {logOut} from "../../store/authSlice";
import SeoHead from "../../utils/SEOHead/SEOHead";

export default function CoursesList() {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [page, setPage] = useState(1)
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
    const getClientCourses = async () => {
        debugger
        try {
            const res = await authAPI.getClientCourses(page)
            if (res.status === 'OK') {
                debugger
                console.log(res?.body?.items)
                setData(
                    { courses: res?.body?.items?.filter(el => el.active!== true),
                    totalPage: Math.ceil((res?.body?.items.length) / 6) })
            } else {
                debugger
                res.status ==='FORBIDDEN' && logoutHandler()
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
    const seoUrl = 'https://www.medicschool.az/courses'

    return (
        <>
            <SeoHead
                title={t('menu.myCourses')}
                description={data.courses && data.courses.length > 0 && data.courses.map(course => course.topic)}
                url={seoUrl}
            />

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
                    {/* <InterestedCourses /> */}
                </div>
                :
                <p style={{ textAlign: "center", fontSize: "52px", margin: "64px 0" }}>{t('notFound.course')}</p>
            }
        </>

    )
}
