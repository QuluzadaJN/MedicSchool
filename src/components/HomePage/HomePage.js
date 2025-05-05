import { Container } from 'react-bootstrap';
// import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import HomePageIntro from './HomePageIntro';
import CoursesContainer from '../Courses/CoursesContainer';

import './HomePage.css';
import SeoHead from "../../utils/SEOHead/SEOHead";

function HomePage() {
    const { t } = useTranslation();
    const seoDesc="Medic School Training Center 2021-ci ildən etibarən tibbi təhsil və korporativ idarəetmə sahələrində fəaliyyət göstərən Amerika Ürək Assosiasiyası (American Heart Association) tərəfindən akkreditasiya olunmuş və təsdiqlənmiş Beynəlxalq Təlim Mərkəzi (AHA - International Training Center) statusunu əldə etmiş təlim mərkəzidir."
    const seoUrl= 'https://www.medicschool.az'

    return (
        <>
            <SeoHead
            title={t('actions.mainPage')}
            description={seoDesc}
            url={seoUrl}
            />
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

// <SeoHead
//     title="İstifadəçilər | Admin Panel"
//     description="Sistemdəki istifadəçilərin idarə olunması."
//     url="https://example.com/admin/users"
// />