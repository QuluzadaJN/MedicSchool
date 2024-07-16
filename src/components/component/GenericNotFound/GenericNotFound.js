import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import './GenericNotFound.css';

export default function GenericNotFound() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('error.notFoundPage')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div className="genericNotFound">
                <p>{t('error.notFoundPage')}</p>
                <Button href='/' className='genericNotFound-btn'>{t('actions.mainPage')}</Button>
            </div>
        </>
    )
}
