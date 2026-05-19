import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import instructorImage from '../../images/instructor.png';
import './Instructor.css';

export default function Instructors({ users }) {
    const { t } = useTranslation();

    return (
        <div>
            <h2 className='instructor-header my-4'>{t('about.trainers')}</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000 }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {users?.map((element, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="instructor-card p-3">
                            <div className="d-flex">
                                <div className="me-3">
                                    <Image
                                        className="about-instructor-img"
                                        src={element.profilePhotoPath || instructorImage}
                                        alt={element.fullName}
                                    />
                                </div>
                                <div>
                                    <h3 className="instructor-name">{element.fullName}</h3>
                                    <div>
                    <span className="instructor-badge instructor-badge-danger me-2">
                      {element.role}
                    </span>
                                    </div>
                                    <span className="mt-2 instructor-badge instructor-badge-info">
                    {element.userPosition}
                  </span>
                                    <p className="mt-2 instructor-text">{element.biography}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
