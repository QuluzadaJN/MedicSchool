import { useTranslation } from 'react-i18next';
import { Col, Image, Row } from 'react-bootstrap';

import Partnor1 from "../../images/partnor1.png";
import Partnor2 from "../../images/partnor2.png";
import Partnor3 from "../../images/partnor3.png";
import Partnor4 from "../../images/partnor4.png";
import Partnor5 from "../../images/partnor5.png";

import './Partnors.css';

export default function Partnors () {
    const { t } = useTranslation();

    return (
        <div className='py-4 mb-5'>
            <h2 className='instructor-header my-4'>{t('about.partners')}</h2>
            <Row className='mb-5 pb-5'>
                <Col className='text-center py-3' sm={12} md={4}>
                    <Image className='partnor-img' src={Partnor1} />
                </Col>
                <Col className='text-center py-3' sm={12} md={4}>
                    <Image className='partnor-img' src={Partnor2} />
                </Col>
                <Col className='text-center py-3' sm={12} md={4}>
                    <Image className='partnor-img' src={Partnor3} />
                </Col>
                <Col className='text-center py-3' sm={12} md={4}>
                    <Image className='partnor-img' src={Partnor4} />
                </Col>
                <Col className='text-center py-3' sm={12} md={4}>
                    <Image className='partnor-img' src={Partnor5} />
                </Col>
            </Row>
        </div>
    )
}