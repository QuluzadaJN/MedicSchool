import { NavLink } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import CoursesContainer from '../Courses/CoursesContainer';

import './InterestedCourses.css';

export default function InterestedCourses() {
    const { t } = useTranslation();

    return (
        <div className='py-5 bg-gray'>
            <Container>
                <h1 className='interestedCourses-header mb-4'>
                {t('interestedCourse.title')}
                </h1>
                <CoursesContainer />

                <div className='mt-4 text-center'>
                    <NavLink
                        to='/courses'
                        className='mx-auto interestedCoursesbtn'>{t('interestedCourse.more')} <FontAwesomeIcon className='ms-5' icon={faArrowRight} /></NavLink>
                </div>
            </Container>
        </div>
    )
}