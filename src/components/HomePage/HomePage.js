import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import HomePageIntro from './HomePageIntro';
import CoursesContainer from '../Courses/CoursesContainer';

import './HomePage.css';

function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('actions.mainPage')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div>
                <HomePageIntro />
                <Container>
                    <div className='coursesDetail-video my-5'>
                        <CoursesContainer />
                    </div>
                </Container>
            </div>
        </>
    )
}

export default HomePage;
