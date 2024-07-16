import { useTranslation } from 'react-i18next';
import { Col, Image, Row } from 'react-bootstrap';

import instructorImage from '../../images/instructor.png';

import './Instructor.css';

export default function Instructors() {
    const { t } = useTranslation();

    return (
        <div>
            <h2 className='instructor-header my-4'>{t('about.trainers')}</h2>
            <Row>
                <Col sm={12} md={6}>
                    <Row>
                        <Col sm={12} md={4}>
                            <Image src={instructorImage} />
                        </Col>
                        <Col sm={12} md={8}>
                            <h3 className='instructor-name'>Mətin Mahmudov</h3>
                            <div>
                                <span className='instructor-badge instructor-badge-danger me-2'>DİREKTOR</span>
                                <span className='instructor-badge instructor-badge-danger'>TƏSİSÇİ</span>
                            </div>
                            <span className='mt-2 instructor-badge instructor-badge-info'>BLS TƏLİMÇİ</span>
                            <p className='mt-2 instructor-text'>AHA Coordinator, 10 il təcrübə asd . dasd k da dkjsa d    asjnd kjansd kda nsdknad   asmdn   çmd  das  sdad sjd ajhsd aksd</p>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} md={6}>
                    <Row>
                        <Col sm={12} md={4}>
                            <Image src={instructorImage} />
                        </Col>
                        <Col sm={12} md={8}>
                            <h3 className='instructor-name'>Mətin Mahmudov</h3>
                            <div>
                                <span className='instructor-badge instructor-badge-danger me-2'>DİREKTOR</span>
                                <span className='instructor-badge instructor-badge-danger'>TƏSİSÇİ</span>
                            </div>
                            <span className='mt-2 instructor-badge instructor-badge-info'>BLS TƏLİMÇİ</span>
                            <p className='mt-2 instructor-text'>AHA Coordinator, 10 il təcrübə asd . dasd k da dkjsa d    asjnd kjansd kda nsdknad   asmdn   çmd  das  sdad sjd ajhsd aksd</p>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} md={6}>
                    <Row>
                        <Col sm={12} md={4}>
                            <Image src={instructorImage} />
                        </Col>
                        <Col sm={12} md={8}>
                            <h3 className='instructor-name'>Mətin Mahmudov</h3>
                            <span className='mt-2 instructor-badge instructor-badge-info'>BLS TƏLİMÇİ</span>
                            <p className='mt-2 instructor-text'>AHA Coordinator, 10 il təcrübə asd . dasd k da dkjsa d    asjnd kjansd kda nsdknad   asmdn   çmd  das  sdad sjd ajhsd aksd</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}