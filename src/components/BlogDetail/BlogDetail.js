import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Col, Row, Container } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

import { authAPI } from '../../api/api';
import Loader from '../component/Loader';

import './BlogDetail.css';

export default function BlogDetail() {
    const { t } = useTranslation();

    const { id: blogId } = useParams();

    const [blog, setBlog] = useState({});

    const getBlogById = async () => {
        try {
            const resp = await authAPI.getBlogById(blogId);
            if (resp.status === 'OK') {
                setBlog(resp);
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getBlogById();
    }, [])

    return (
        <>
            <Helmet>
                <title>{t('menu.blogs')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
                <meta name='description' content={blog && blog.data && blog.body.seoDescription} />
            </Helmet>
            <Container className='my-5'>
                {blog && blog.body ?
                    <Row>
                        <Col sm={12} md={9}>
                            <div>
                                <h1 className='detail-header'>{blog.body.topic}</h1>
                                <div className='blogDetail-wrapper'>
                                    {ReactHtmlParser(blog.body.content)}
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
