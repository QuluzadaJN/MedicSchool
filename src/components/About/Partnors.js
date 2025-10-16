import { useTranslation } from 'react-i18next';
import { Col, Image, Row } from 'react-bootstrap';

import Partnor1Sehhet from "../../images/partnor1.png";
import Partnor2Ege from "../../images/partnor2.png";
import Partnor3Shkaf from "../../images/partnor3.png";
import Partnor4Saglikci from "../../images/partnor4.png";
import Partnor5Afgen from "../../images/partnor5.png";

import './Partnors.css';

export default function Partnors ({partners}) {
    const { t } = useTranslation();

    return (
        <div className='py-4 mb-5'>
            <h2 className='instructor-header my-4'>{t('about.partners')}</h2>
            <Row className='mb-5 pb-5'>
                {partners?.map((element, idx) => (
                    <Col key={idx} className="text-center py-3" sm={12} md={4}>
                        <Image
                            className="partnor-img"
                            alt={element?.name}
                            src={element?.partnerLogo}
                        />
                    </Col>
                ))}
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor1Sehhet} />*/}
                {/*</Col>*/}
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor2Ege} />*/}
                {/*</Col>*/}
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor3Shkaf} />*/}
                {/*</Col>*/}
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor4Saglikci} />*/}
                {/*</Col>*/}
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor5Afgen} />*/}
                {/*</Col>*/}
            </Row>
        </div>
    )
}