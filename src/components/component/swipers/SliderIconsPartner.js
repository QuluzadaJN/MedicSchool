import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Image } from 'react-bootstrap';

import 'swiper/css';
import style from  './SliderIconsPartner.css'
const PartnersSlider = ({partners}) => {    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3000 }}
            breakpoints={{
                768: { slidesPerView: 3 },
                480: { slidesPerView: 2 },
                0: { slidesPerView: 1 }
            }}
        >
            {partners?.map((element, index) => (
                <SwiperSlide key={index}>
                    <div className={`${style.slideCenter} py-3`} >
                        {/*<img alt={p?.alt} src={p?.src} className="partnor-img" />*/}
                            <Image
                                className={style.partnorImg}
                                style={{
                                    height: '100px',
                                    text : 'center'
                                }}
                                alt={element?.name}
                                src={element?.partnerLogo}
                            />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default PartnersSlider;
