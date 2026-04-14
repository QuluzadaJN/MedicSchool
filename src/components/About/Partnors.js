import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import PartnersSlider from "../component/swipers/SliderIconsPartner"
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
                <PartnersSlider partners={partners}/>
                {/*<Col className='text-center py-3' sm={12} md={4}>*/}
                {/*    <Image className='partnor-img' src={Partnor1Sehhet} />*/}
                {/*</Col>*/}
            </Row>
        </div>
    )
}