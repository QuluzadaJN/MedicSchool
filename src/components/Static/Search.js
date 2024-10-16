import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Col, Row, Container } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";

import Courses from "../Courses/Courses";
import Loader from "../component/Loader";
import CoursePagination from "../component/CoursePagination";

import { authAPI } from '../../api/api';

export default function Search({ ...props }) {
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    const handleSearchByFilter = async () => {
        try {
            const resp = await authAPI.getSearchByName(props.searchParam);
            if (resp.status === 'OK') {
                setData({ courses: resp?.body?.items, totalPage: resp?.body.totalPages })
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        handleSearchByFilter();
    }, [props.searchParam])

    const handleChangePage = useCallback((page) => {
        setPage(page)
    }, [])

    return (
        <>
            {data.courses && data.courses.length > 0 ?
                <Container className="my-5">
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
                </Container>
                :
                <p style={{ textAlign: "center", fontSize: "52px", margin: "64px 0" }}>{t('notFound.notFoundCourse')}</p>
            }
        </>
    )
}