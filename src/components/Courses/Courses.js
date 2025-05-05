import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faUser } from "@fortawesome/free-solid-svg-icons";

import './Courses.css';
import SeoHead from "../../utils/SEOHead/SEOHead";
import React from "react";

function Courses({ id, img, topic, instructorName, body, soldCount, rating, price,discountedPrice, purchased }) {
    const { t } = useTranslation();
    const seoUrl = 'https://www.medicschool.az/courses'

    return (
        <div className="mb-3" key="">
            <SeoHead
                title={t('about.title')}
                description={t('about.content')}
                url={seoUrl}
            />
            <NavLink style={{ textDecoration: 'none' }}
                to={purchased ? `/content/byCourse/${id}` : `/course/id/${id}`}
            >
                <Card className="courses-card">
                    <Card.Img variant="top" src={img} style={{ height: "300px" }} />
                    {/* <span className="courses-status">POPULYAR</span> */}
                    <Card.Body>
                        <Card.Title className="courses-header px-4">{topic}</Card.Title>
                        <h6 className="courses-author px-4">{instructorName}</h6>
                        <Card.Text className="courses-text px-4 text-truncate">
                            {body}
                        </Card.Text>
                        <div className="courses-rating d-flex align-items-center px-4">
                            {soldCount != null && <p className="me-3"><FontAwesomeIcon icon={faUser} /> <span>{soldCount}</span></p>}
                            <p><FontAwesomeIcon icon={faStar} /> <span>{rating}</span></p>
                        </div>
                        {purchased ?
                            <div className="courses-btn courses-btn-taken text-center">
                                <Button>{t('actions.goToCourse')}</Button>
                            </div>
                            :
                            <div className="courses-btn courses-btn-notTaken d-flex justify-content-between align-items-center">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <Button>{t('actions.buy')}</Button>
                                <span>
                             {discountedPrice && discountedPrice < price ? (
                              <>
                                  <span className='detail-old-price text-muted'><s>{price} ₼</s></span>
                                  <span className="mx-1" style={{ color: "white" }}>↓</span>
                                  <span className='text-light fw-bold'>{discountedPrice} ₼</span>
                              </>
                          ) : (
                              <span className='text-light'>{price} ₼</span>
                          )}
                            </span>
                            </div>
                        }
                    </Card.Body>
                </Card>
            </NavLink>

        </div>
    )
}

export default Courses;
