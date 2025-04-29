import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Container, Row, Col, Form, Image, Button, Nav} from "react-bootstrap";

import phoneIcon from "../../images/phone.svg";
import youtubeIcon from "../../images/youtube.svg";
import facebookIcon from "../../images/facebook.svg";
import tiktokIcon from "../../images/tiktok.png";
import instagramIcon from "../../images/instagram.svg";
import whatsappIcon from "../../images/whatsapp-mini.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { authAPI } from '../../api/api';
import Loader from '../component/Loader';

import "./Footer.css";
// import {Navigate} from "react-router";

export default function Footer() {
    // const navigate = useNavigate();
    const navigateToLink=()=>{window.location.href = '/contact'}
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);

    const filterArray = [
        { name: "Popular", text: "Populyar kurslar" },
        { name: "CheapFirst", text: "Endirimli Kurslar" },
        { name: "NewDateFirst", text: "Yeni kurslar" },
        { name: "Free", text: "Pulsuz kurslar" },
    ];

    const getCategories = async () => {
        try {
            const resp = await authAPI.getAllCategories();
            setCategories(resp)
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const changeLanguageForWeb = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <div className="footer">
            <div className="footer-start">
                <Container>
                    <h1 className="footer-header mb-4">{t('footerMenu.ourCourses')}</h1>
                    <Row>
                        <Col sm={12} md={4}>
                            <h3 className="footer-title mb-3">{t('footerMenu.allCourses')} <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} /></h3>
                            {categories? categories?.body?.items?.map((cat) => {
                                return (
                                    <a href={`/courses/category/${cat.id}`} className="footer-listItem" key={cat.id}>{cat.name}</a>
                                )
                            }) : <Loader />}
                        </Col>
                        <Col sm={12} md={4}>
                            <h3 className="footer-title mb-3">{t('footerMenu.myCourses')} <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} /></h3>
                            <a href='/myCourses' className='footer-listItem'>Mənim kurslarım</a>
                            {filterArray.map((filter, index) => (
                                <a href={`/courses/${filter.name}`} className='footer-listItem' key={index} value={filter.name}>{filter.text}</a>
                            ))}
                            {/* <p className="footer-listItem">Sertifikatlı kurslar</p> */}
                        </Col>
                        <Col sm={12} md={4}>
                            {/*<p className="footer-listItem mb-3">{t('language.title')}</p>*/}
                            {/*<Form.Select className='tab-input mb-2' onChange={(e) => changeLanguageForWeb(e)}>*/}
                            {/*    <option value="az">{t('language.az')}</option>*/}
                            {/*    <option value="en">{t('language.en')}</option>*/}
                            {/*</Form.Select>*/}
                            <p className='tab-input d-flex justify-content-between align-items-center'>
                                <span>{t('footerMenu.forContact')}</span>
                                <div>
                                    <a className="socialMediaLinks" href="tel:+123456789">
                                        <Image className="footer-icon" src={phoneIcon} />
                                    </a>
                                    <a className="socialMediaLinks" href="https://api.whatsapp.com/send?text=Salam MedicSchooldan müraciət edirəm&phone=994507551135" target="_blank" rel="noreferrer">
                                        <Image className="footer-icon" src={whatsappIcon} />
                                    </a>
                                    <a className="socialMediaLinks" href="https://www.facebook.com/medicschool/" target="_blank" rel="noreferrer">
                                        <Image className="footer-icon" src={facebookIcon} />
                                    </a>
                                    <a className="socialMediaLinks" href="https://instagram.com/medicschool.az" target="_blank" rel="noreferrer">
                                        <Image className="footer-icon" src={instagramIcon} />
                                    </a>
                                    <a className="socialMediaLinks" href="https://www.tiktok.com/@medicschool?_t=8bJvqOVQpIw&_r=1" target="_blank" rel="noreferrer">
                                        <Image className="footer-icon" src={tiktokIcon} />
                                    </a>
                                    <a className="socialMediaLinks" href="https://www.youtube.com/c/medicschool" target="_blank" rel="noreferrer">
                                        <Image className="footer-icon" src={youtubeIcon} />
                                    </a>
                                </div>
                            </p>
                            <Button
                                // as={NavLink}
                                //      to="/contact"
                                    onClick={navigateToLink}
                                     className="footer-form-submit-btn"
                                     type="submit">
                                <span className="me-5">+</span> {t('actions.followUs')}
                            </Button>
                            {/*<Nav.Link as={Link}*/}
                            {/*          activeClassName="active"*/}
                            {/*          className="footer-form-submit-btn"*/}
                            {/*          to={'/contact'}>*/}
                            {/*    <span className="me-5">+</span> {t('actions.followUs')}*/}
                            {/*</Nav.Link>*/}
                            {/*<Nav.Link as={Link} activeClassName="active" to={'/blogs'}>{t('menu.blogs')}</Nav.Link>*/}

                            {/*<NavLink to="/contact" className="btn footer-form-submit-btn d-inline-flex align-items-center">*/}
                            {/*    <span className="me-2">+</span> {t('actions.followUs')}*/}
                            {/*</NavLink>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
