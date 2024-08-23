import { useTranslation } from 'react-i18next';
import { Button, Container } from 'react-bootstrap';

import HomePageIntroImg from '../../images/HomePageIntroImg.png';

import './HomePageIntro.css';


export default function HomePageIntro() {
    const { t } = useTranslation();

    return (
        <div className='homehage-intro-wrapper'>
            <div className='intro-bg' style={{ backgroundImage: `url(${HomePageIntroImg})`, backgroundSize: "cover", padding: "140px 0" }}>
                <Container>
                    <h1 className='intro-text mb-5'>{t('homePageIntroText')}</h1>
                    <Button className='intro-btn' href='/courses'>{t('actions.seeCourses')}</Button>
                </Container>
            </div>
        </div>
    )
}
