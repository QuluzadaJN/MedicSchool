import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button, Container, Row, Col, Image } from "react-bootstrap";

import phoneIcon from "../../images/phone.svg";
import youtubeIcon from "../../images/youtube.svg";
import tiktokIcon from "../../images/tiktok.png";
import facebookIcon from "../../images/facebook.svg";
import instagramIcon from "../../images/instagram.svg";
import whatsappIcon from "../../images/whatsapp-mini.svg";
import InterestedCourses from '../InterestedPart/InterestedCourses';
import { isEmail, isNotEmpty, hasMinLength } from '../../utils/validation';

import { authAPI } from '../../api/api';

import "./Contact.css";

export default function Contact() {
    const { t } = useTranslation();

    const [enteredContactValues, setEnteredContactValues] = useState({
        contactEmail: '',
        contactName: '',
        contactNote: '',
    });

    const [didContactEdit, setDidContactEdit] = useState({
        contactEmail: false,
        contactName: false,
        contactNote: false,
    })

    const contactEmailIsInvalid = didContactEdit.contactEmail && !isEmail(enteredContactValues.contactEmail) && isNotEmpty(enteredContactValues.contactEmail);
    const contactNameIsInvalid = didContactEdit.contactName && !hasMinLength(enteredContactValues.contactName, 6);
    const contactNoteIsInvalid = didContactEdit.contactNote && !hasMinLength(enteredContactValues.contactNote, 6);

    function handleContactInputChange(identifier, value) {
        setEnteredContactValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));

        setDidContactEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false,
        }))
    }

    function handleInputBlur(identifier) {
        setDidContactEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = enteredContactValues.contactEmail;
        const fullName = enteredContactValues.contactName;
        const note = enteredContactValues.contactNote

        if (!contactEmailIsInvalid && !contactNameIsInvalid && !contactNoteIsInvalid) {
            try {
                const res = await authAPI.postSubmitContactForm({ email, fullName, note }).unwrap();
                if (res.status === 'OK') {
                    toast.success(res.body);
                } else {
                    toast.error(res.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        }

        // if (isNotEmpty(email)) {
        //     if (isNotEmpty(fullName)) {

        //     } else {
        //         setDidContactEdit(prevEdit => ({
        //             ...prevEdit,
        //             ['contactName']: false,
        //         }))
        //     }
        // } else {
        //     setDidContactEdit(prevEdit => ({
        //         ...prevEdit,
        //         ['contactEmail']: false,
        //     }))
        // }
    }

    return (
        <>
            <Helmet>
                <title>{t('menu.contact')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div className="bg-gray">
                <Container>
                    <div className="contact-form">
                        <Row>
                            <Col sm={12} md={3}>
                                <h1 className="contact-header">{t('menu.contact')}</h1>
                                <p className="contact-desc">{t('contactText')}</p>
                            </Col>
                            <Col sm={12} md={9}>
                                <div className="contact-form-right">
                                    <form>
                                        <div>
                                            <div className='mb-3'>
                                                <input className='contact-input'
                                                    onBlur={() => handleInputBlur('contactName')}
                                                    value={enteredContactValues.contactName}
                                                    onChange={(event) => handleContactInputChange('contactName', event.target.value)}
                                                    type='text' name='fullName' placeholder='AD, SOYAD' />
                                                <div className='control-error'>{contactNameIsInvalid && <p className='mb=0'>{t('error.nameError')}</p>}</div>
                                            </div>
                                            <div className='mb-3'>
                                                <input className='contact-input'
                                                    onBlur={() => handleInputBlur('contactEmail')}
                                                    value={enteredContactValues.contactEmail}
                                                    onChange={(event) => handleContactInputChange('contactEmail', event.target.value)}
                                                    type='email' name='email' placeholder='EMAİL' />
                                                <div className='control-error'>{contactEmailIsInvalid && <p className='mb-0'>{t('error.emailError')}</p>}</div>
                                            </div>
                                            <div className='mb-3'>
                                                <textarea className='contact-input'
                                                    onBlur={() => handleInputBlur('contactNote')}
                                                    value={enteredContactValues.contactNote}
                                                    onChange={(event) => handleContactInputChange('contactNote', event.target.value)}
                                                    type='text' name='note' placeholder='Qeyd:' rows={8}></textarea>
                                                <div className='control-error'>{contactNoteIsInvalid && <p className='mb-0'>{t('error.noteError')}</p>}</div>
                                            </div>
                                        </div>
                                        <p className='mt-4 contact-div d-flex justify-content-between align-items-center'>
                                            <span>{t('footerMenu.forContact')}</span>
                                            <div>
                                                <a className="socialMediaLinks" href="tel:+123456789">
                                                    <Image className="contact-div-icon" src={phoneIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href="https://api.whatsapp.com/send?text=Salam MedicSchooldan müraciət edirəm&phone=994507551135" target="_blank" rel="noreferrer">
                                                    <Image className="contact-div-icon" src={whatsappIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href="https://www.facebook.com/medicschool/" target="_blank" rel="noreferrer">
                                                    <Image className="contact-div-icon" src={facebookIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href="https://instagram.com/medicschool.az" target="_blank" rel="noreferrer">
                                                    <Image className="contact-div-icon" src={instagramIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href="https://www.tiktok.com/@medicschool?_t=8bJvqOVQpIw&_r=1" target="_blank" rel="noreferrer">
                                                    <Image className="contact-div-icon" src={tiktokIcon} />
                                                </a>
                                                <a className="socialMediaLinks" href="https://www.youtube.com/c/medicschool" target="_blank" rel="noreferrer">
                                                    <Image className="contact-div-icon" src={youtubeIcon} />
                                                </a>
                                            </div>
                                        </p>
                                        <Button className="contact-form-submit-btn" type="submit" onClick={handleSubmit}>
                                            <span className="me-5">+</span> {t('actions.followUs')}
                                        </Button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <InterestedCourses />
            </div>
        </>
    )
}
