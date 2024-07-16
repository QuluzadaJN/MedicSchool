import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import './Rating.css';

export default function Rating({ handleRateCourse }) {
    const { t } = useTranslation();

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                return (
                    <label key={index}>
                        <input
                            key={star}
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onChange={() => setRating(currentRating)}
                        />
                        <span
                            className="star"
                            style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                            }}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        >
                            &#9733;
                        </span>
                    </label>
                );
            })}
            <Button onClick={() => handleRateCourse(rating)} className='d-block mt-2 rate-course mb-3'>{t('actions.rateCourse')}</Button>
        </div>
    );
}