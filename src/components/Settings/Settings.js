import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Tab, Nav, Row, Col, Form, Button, Container } from 'react-bootstrap';

import InterestedCourses from '../InterestedPart/InterestedCourses';
import { isEmail, isNotEmpty, hasMinLength, isMatchPassword } from '../../utils/validation';

import { authAPI } from '../../api/api';

import './Settings.css';

export default function Settings() {
    const { t, i18n } = useTranslation();

    const [enteredUpdateEmailValues, setEnteredUpdateEmailValues] = useState({
        updateEmail: '',
        updatePassword: ''
    });

    const [didUpdateEmailEdit, setDidUpdateEmailEdit] = useState({
        updateEmail: false,
        updatePassword: false,
    })

    const updateEmailIsInvalid = didUpdateEmailEdit.updateEmail && !isEmail(enteredUpdateEmailValues.updateEmail) && isNotEmpty(enteredUpdateEmailValues.updateEmail);
    const updatePasswordIsInvalid = didUpdateEmailEdit.updatePassword && !hasMinLength(enteredUpdateEmailValues.updatePassword, 6);

    function handleUpdateEmailChange(identifier, value) {
        setEnteredUpdateEmailValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));

        setDidUpdateEmailEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false,
        }))
    }

    function handleUpdateEmailInputBlur(identifier) {
        setDidUpdateEmailEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true,
        }))
    }

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        const newEmail = enteredUpdateEmailValues.updateEmail;
        const oldPassword = enteredUpdateEmailValues.updatePassword;

        if (!updateEmailIsInvalid && !updatePasswordIsInvalid) {
            try {
                const res = await authAPI.updateEmail({ newEmail, oldPassword });
                if (res.status === 'OK') {
                    toast.success(res.body);
                } else {
                    toast.error(res.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        }
    }


    const [enteredUpdatePasswordValues, setEnteredUpdatePasswordValues] = useState({
        updatePrevPassword: '',
        updatePassword: '',
        updateNewPassword: '',
    });

    const [didUpdatePasswordEdit, setDidUpdatePasswordEdit] = useState({
        updatePrevPassword: false,
        updatePassword: false,
        updateNewPassword: false
    })

    const updatePassPrevPasswordIsInvalid = didUpdatePasswordEdit.updatePrevPassword && !hasMinLength(enteredUpdatePasswordValues.updatePrevPassword, 6);
    const updatePassPasswordIsInvalid = didUpdatePasswordEdit.updatePassword && !hasMinLength(enteredUpdatePasswordValues.updatePassword, 6);
    const updatePassNewPasswordIsInvalid = didUpdatePasswordEdit.updateNewPassword && !hasMinLength(enteredUpdatePasswordValues.updateNewPassword, 6) && isMatchPassword(enteredUpdatePasswordValues.updatePassword, enteredUpdatePasswordValues.updateNewPassword);

    function handleUpdatePasswordChange(identifier, value) {
        setEnteredUpdatePasswordValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));

        setDidUpdatePasswordEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false,
        }))
    }

    function handleUpdatePasswordInputBlur(identifier) {
        setDidUpdatePasswordEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true,
        }))
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const newPassword = enteredUpdatePasswordValues.updateNewPassword;
        const oldPassword = enteredUpdatePasswordValues.updatePrevPassword;

        if (!updatePassPrevPasswordIsInvalid && !updatePassPasswordIsInvalid && !updatePassNewPasswordIsInvalid) {
            try {
                const resp = await authAPI.updatePassword({ newPassword, oldPassword });
                if (resp.status === 'OK') {
                    toast.success(resp.body);
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        }
    }

    const changeLanguageForWeb = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <>
            <Helmet>
                <title>{t('menu.settings')}</title>
                <link name="keywords" content="kurs, sağlıqçı, mövzu, sertifikat" />
            </Helmet>
            <div className='bg-gray'>
                <Container>
                    <Row>
                        <Col md={3} className='d-sm-none d-md-block'></Col>
                        <Col sm={12} md={9}>
                            <h1 className='settings-header my-4 pt-3'>{t('settings.title')}</h1>
                        </Col>
                    </Row>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={12} md={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link className="settings-tab py-0" eventKey="first">{t('settings.account')}</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                    <Nav.Link className="settings-tab py-0" eventKey="second">Sertifikatlarım</Nav.Link>
                                </Nav.Item> */}
                                    <Nav.Item>
                                        <Nav.Link className="settings-tab py-0" eventKey="third">{t('language.title')}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={12} md={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className='tab-content-wrapper'>
                                            <h2 className='tab-title'>{t('settings.email')}</h2>
                                            <p className='tab-text'>{t('settings.changeEmail')}</p>
                                            <form>
                                                <div>
                                                    <div className='mb-3'>
                                                        <input className='tab-input mb-3'
                                                            onBlur={() => handleUpdateEmailInputBlur('updateEmail')}
                                                            value={enteredUpdateEmailValues.updateEmail}
                                                            onChange={(event) =>
                                                                handleUpdateEmailChange('updateEmail', event.target.value)}
                                                            type='email' name='email' placeholder={t('placeholder.newEmail')} />
                                                        <div className='control-error'>{updateEmailIsInvalid && <p className='mb=0'>{t('error.emailError')}</p>}</div>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <input className='tab-input mb-3'
                                                            onBlur={() => handleUpdateEmailInputBlur('updatePassword')}
                                                            value={enteredUpdateEmailValues.updatePassword}
                                                            onChange={(event) =>
                                                                handleUpdateEmailChange('updatePassword', event.target.value)}
                                                            type='password' name='password'
                                                            placeholder={t('placeholder.currentPassword')} />
                                                        <div className='control-error'>{updatePasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                                    </div>
                                                    <Button className='tab-btn' onClick={handleUpdateEmail}>{t('actions.saveChanges')}</Button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='tab-content-wrapper mt-3 mb-5'>
                                            <h2 className='tab-title'>{t('settings.password')}</h2>
                                            <p className='tab-text'>{t('settings.changePassword')}</p>
                                            <form>
                                                <div>
                                                    <div className='mb-3'>
                                                        <input className='tab-input mb-3'
                                                            onBlur={() => handleUpdatePasswordInputBlur('updatePrevPassword')}
                                                            value={enteredUpdatePasswordValues.updatePrevPassword}
                                                            onChange={(event) =>
                                                                handleUpdatePasswordChange('updatePrevPassword', event.target.value)}
                                                            type='password' name='oldPassword'
                                                            placeholder={t('placeholder.oldPassword')} />
                                                        <div className='control-error'>{updatePassPrevPasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <input className='tab-input mb-3'
                                                            onBlur={() => handleUpdatePasswordInputBlur('updatePassword')}
                                                            value={enteredUpdatePasswordValues.updatePassword}
                                                            onChange={(event) =>
                                                                handleUpdatePasswordChange('updatePassword', event.target.value)}
                                                            type='password' name='password'
                                                            placeholder={t('placeholder.newPassword')} />
                                                        <div className='control-error'>{updatePassPasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <input className='tab-input mb-3'
                                                            onBlur={() => handleUpdatePasswordInputBlur('updateNewPassword')}
                                                            value={enteredUpdatePasswordValues.updateNewPassword}
                                                            onChange={(event) =>
                                                                handleUpdatePasswordChange('updateNewPassword', event.target.value)}
                                                            type='password' name='newPassword'
                                                            placeholder={t('placeholder.againNewPassword')} />
                                                        <div className='control-error'>{updatePassNewPasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                                    </div>
                                                    <Button className='tab-btn' onClick={handleUpdatePassword}>{t('actions.saveChanges')}</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Pane>
                                    {/* <Tab.Pane eventKey="second">
                                    <div className='tab-content-wrapper'>
                                        <h2 className='tab-title'>SERTİFİKATLAR</h2>
                                        <p className='tab-text'>Sertifikatlarım</p>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <p className='tab-input d-flex justify-content-between align-items-center'>
                                                    <span>First Aid Sertifikatı - 1</span> <FontAwesomeIcon icon={faDownload} />
                                                </p>
                                                <p className='tab-input d-flex justify-content-between align-items-center'>
                                                    <span>First Aid Sertifikatı - 2</span> <FontAwesomeIcon icon={faDownload} />
                                                </p>
                                                <p className='tab-input d-flex justify-content-between align-items-center'>
                                                    <span>First Aid Sertifikatı - 3</span> <FontAwesomeIcon icon={faDownload} />
                                                </p>
                                            </Form.Group>
                                            <Button type="submit" className='tab-btn'>Hamısını endir</Button>
                                        </Form>
                                    </div>
                                </Tab.Pane> */}
                                    <Tab.Pane eventKey="third">
                                        <div className='tab-content-wrapper'>
                                            <h2 className='tab-title'>{t('language.capsTitle')}</h2>
                                            <p className='tab-text'>{t('settings.changeLang')}</p>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className='tab-label'>{t('language.title')}</Form.Label>
                                                    <Form.Select className='tab-input mb-3' onChange={(e) => changeLanguageForWeb(e)}>
                                                        <option value="az">{t('language.az')}</option>
                                                        <option value="en">{t('language.en')}</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Button type="submit" className='tab-btn'>{t('actions.saveChanges')}</Button>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
                <InterestedCourses />
            </div>
        </>
    )
}