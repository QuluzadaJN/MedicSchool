import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Container, Image, Form, Button, Row, Col } from 'react-bootstrap';

import whatsappIcon from "../../images/whatsapp.svg";
import HealthCareImg from "../../images/HealthCareImg.png";
import HealthCareImageLogo from "../../images/HealthCare-logo-big.png";

import './HealthCare.css';

export default function HealthCare() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('healtyBanner.title')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div>
                <div className='bg-white'>
                    <Container className='text-center'>
                        <Image className='my-5' src={HealthCareImageLogo} />
                        <Image className='mb-5' src={HealthCareImg} />
                        <p className='healtCare-text'>
                            {t('healtyBanner.healthText1')}<br />
                            {t('healtyBanner.healthText2')}<br />
                            {t('healtyBanner.healthText3')}</p>
                        <p className='healtCare-text'>
                            {t('healtyBanner.mission')}
                        </p>
                        <p className='healtCare-text'>
                            {t('healtyBanner.vision')}
                        </p>
                        <p className='heathCare-contact'>{t('healtyBanner.forContact')}</p>
                        <Button className='healthCarePage-wp mb-3' onClick={() => {
                            window.open(`https://api.whatsapp.com/send?text=Salam MedicSchooldan müraciət edirəm&phone=994507551135`, "_blank")
                        }}><Image src={whatsappIcon} className='me-3' /> {t('actions.joinUs')}</Button>
                        <p className='heathCare-contact mb-5'>{t('actions.orSendReq')}</p>
                    </Container>
                </div>
                <Row className='bg-gray text-center'>
                    <Col sm={12} md={4} className='mx-auto'>
                        <Form className='pt-5'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className='healthCare-input mb-3' type="email" placeholder={t('placeholder.fullName')} />
                                <Form.Control className='healthCare-input mb-3' type="text" placeholder={t('placeholder.phone')} />
                            </Form.Group>
                            <Button type="submit" className='w-100 healthCare-btn mb-3'>{t('actions.sendReq')}</Button>
                            <p className='healthCare-call'>{t('actions.callUs')}</p>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}