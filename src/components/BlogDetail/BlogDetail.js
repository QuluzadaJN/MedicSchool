import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Container } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

import { authAPI } from '../../api/api';
import Loader from '../component/Loader';

import './BlogDetail.css';
import SeoHead from "../../utils/SEOHead/SEOHead";

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
    const seoUrl= `https://www.medicschool.az/blog/${blogId}`
    return (
        <>
            <SeoHead
                title={blog?.body?.topic}
                description={blog?.body?.seoDescription}
                url={seoUrl}
            />
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
