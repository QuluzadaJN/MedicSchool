import { useTranslation } from 'react-i18next';
import { Col, Row, Image, Button, Container } from 'react-bootstrap';

import whatsappIcon from "../../images/whatsapp.svg";
import HealthCareImageLogo from "../../images/HealthCare-logo-big.png";

import './HeaderTop.css';

export default function HeaderTop() {
    const { t } = useTranslation();

    return (
        <>
            <div className='headerTop-wrapper'>
                <Container>
                    <Row className='py-3'>
                        <Col xs={3}>
                            <Image src={HealthCareImageLogo} className='headerTop-logo' />
                        </Col>
                        <Col xs={5} sm={4}>
                            <h1 className='headerTop-header'><span>{t('healtyBanner.title')}</span> {t('healtyBanner.content')}</h1>
                        </Col>
                        <Col xs={4} sm={5}>
                            <Button className='healthCare-wp' onClick={() => {
                                window.open(`https://api.whatsapp.com/send?phone=994507551135?text=Salam MedicSchooldan müraciət edirəm`, "_blank")
                            }}><Image src={whatsappIcon} className='headerTop-icon' /> {t('actions.joinUs')}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="spacer-top">
                &nbsp;
            </div>
        </>
    )
}