import React, { useState } from 'react';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { Button, Modal, Row, Col, Image } from 'react-bootstrap';
import { useGoogleLogin } from '@react-oauth/google';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { authAPI } from '../../api/api';
import { setCredentials } from '../../store/authSlice';
import { useLoginMutation, useLoginWithGoogleMutation, useLoginWithFacebookMutation } from '../../api/usersApiSlice';

import LoginBgImage from "../../images/Login-bg.png";
import LogoRedImage from "../../images/Logo-red.png";
import FacebookIconImage from "../../images/facebook-icon.svg";
import GoogleIconImage from "../../images/google-icon.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Loader from '../component/Loader';
import { isEmail, isNotEmpty, hasMinLength } from '../../utils/validation';

import './Login.css';

export default function Login({ setShowRegParam, showRegParam, setShowLogin, ...props }) {
    const { t } = useTranslation();

    const [login, { isLoading }] = useLoginMutation();
    const [loginWithGoogleFunc] = useLoginWithGoogleMutation();
    const [loginWithFacebookFunc] = useLoginWithFacebookMutation();
    const [isVisible, setVisible] = useState(false);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const toggle = () => {
        setVisible(!isVisible);
    };

    const toggleLogin = () => {
        setVisibleLogin(!isVisibleLogin);
    };

    const dispatch = useDispatch();

    const [enteredLoginValues, setEnteredLoginValues] = useState({
        loginEmail: '',
        loginPassword: ''
    });

    const [didLoginEdit, setDidLoginEdit] = useState({
        loginEmail: false,
        loginPassword: false,
    })

    const loginEmailIsInvalid = didLoginEdit.loginEmail && !isEmail(enteredLoginValues.loginEmail) && isNotEmpty(enteredLoginValues.loginEmail);
    const loginPasswordIsInvalid = didLoginEdit.loginPassword && !hasMinLength(enteredLoginValues.loginPassword, 8);

    function handleLoginInputChange(identifier, value) {
        setEnteredLoginValues((prevValues) => ({
            ...prevValues,
            [identifier]: value,
        }));

        setDidLoginEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false,
        }))
    }

    function handleInputBlur(identifier) {
        setDidLoginEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = enteredLoginValues.loginEmail;
        const password = enteredLoginValues.loginPassword;

        if (!loginEmailIsInvalid && !loginPasswordIsInvalid) {
            try {
                const res = await login({ email, password }).unwrap();
                if (res.status === 'OK') {
                    dispatch(setCredentials({ ...res }))
                    window.location.replace('/');
                    setShowLogin(false);
                } else {
                    toast.error(res.body)
                }
            } catch (err) {
                toast.error(err.data.message || err.error)
            }
        }
    }

    const [enteredRegValues, setEnteredRegValues] = useState({
        regName: '',
        regEmail: '',
        regPassword: '',
        regPhone: '',
    });

    const [didRegEdit, setDidRegEdit] = useState({
        regName: false,
        regEmail: false,
        loginPassword: false,
        regPhone: false,
    })

    const regNameIsInvalid = didLoginEdit.regName && isNotEmpty(enteredRegValues.regName);
    const regEmailIsInvalid = didRegEdit.regEmail && !isEmail(enteredRegValues.regEmail) && isNotEmpty(enteredRegValues.regEmail);
    const regPasswordIsInvalid = didRegEdit.regPassword && !hasMinLength(enteredRegValues.regPassword, 8);
    const regPhoneIsInvalid = didRegEdit.regPhone && !hasMinLength(enteredRegValues.regPassword, 8);

    function handleRegInputChange(identifier, value) {
        setEnteredRegValues((prevRegValues) => ({
            ...prevRegValues,
            [identifier]: value,
        }));

        setDidRegEdit(prevRegEdit => ({
            ...prevRegEdit,
            [identifier]: false,
        }))
    }

    function handleRegInputBlur(identifier) {
        setDidRegEdit(prevRegEdit => ({
            ...prevRegEdit,
            [identifier]: true,
        }))
    }

    const handleRegSubmit = async (e) => {
        e.preventDefault();
        const fullName = enteredRegValues.regName;
        const email = enteredRegValues.regEmail;
        const password = enteredRegValues.regPassword;
        const phoneNumber = enteredRegValues.regPhone;
        if (!regNameIsInvalid && !regEmailIsInvalid && !regPasswordIsInvalid && !regPhoneIsInvalid) {
            try {
                const resp = await authAPI.register({ email, fullName, password, phoneNumber });
                if (resp.status === 'OK') {
                    setShowRegParam(false)
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        }
    }

    const authWithGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                ).then(response => {
                    if (response.status === 200) {
                        authWGoogleApi(response);
                    } else {
                        toast.error(response.body)
                    }
                })
            } catch (err) {
                toast.error(err)
            }
        },
    });

    const authWGoogleApi = async (respon) => {
        if (showRegParam) {
            try {
                const resp = await authAPI.registerWithGoogle({ email: respon.data.email, fullName: respon.data.name });
                if (resp.status === 'OK') {
                    setShowRegParam(false)
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        } else {
            try {
                const resp = await loginWithGoogleFunc(respon.data.email).unwrap();
                if (resp.status === 'OK') {
                    dispatch(setCredentials({ ...resp }))
                    window.location.replace('/');
                    setShowLogin(false);
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err.data.message || err.error)
            }
        }
    }

    const authWithFacebook = async (response) => {
        if (showRegParam) {
            try {
                const resp = await authAPI.registerWithFacebook({ email: response.email, fullName: response.name });
                if (resp.status === 'OK') {
                    setShowRegParam(false)
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err?.response?.data?.errors?.[0].defaultMessage)
            }
        } else {
            try {
                const resp = await loginWithFacebookFunc(response.email).unwrap();
                if (resp.status === 'OK') {
                    dispatch(setCredentials({ ...resp }))
                    window.location.reload('/');
                    setShowLogin(false);
                } else {
                    toast.error(resp.body)
                }
            } catch (err) {
                toast.error(err.data.message || err.error)
            }
        }
    }

    return (
        <Modal show={props.show} setShowRegParam={props.setShowRegParam} showRegParam={props.showRegParam} onHide={props.close} size="lg" className='login-modal'>
            <Modal.Body className='login-modal-body'>
                <Row>
                    <Col md={5} className='login-sm-none pe-0'>
                        <Image src={LoginBgImage} className='w-100' />
                    </Col>
                    <Col sm={12} md={7} className='ps-0'>
                        <div className='text-center login-modal-body-inner'>
                            <div className='login-bg-white px-4'>
                                {/* facebook app id - 797206392291276 */}
                                <Image src={LogoRedImage} className='login-modal-logo m-auto' />
                                {/* <Button
                                    onClick={() => authWithFacebook()}
                                    className='login-modal-btn my-3'
                                >
                                    <Image src={FacebookIconImage} className='me-3' />
                                    {t('login.facebook')} {showRegParam
                                        ? t('actions.enter')
                                        : t('actions.signIn')}
                                </Button> */}
                                <FacebookLogin
                                    appId="797206392291276"
                                    fields="name,email,picture"
                                    // autoLoad
                                    callback={authWithFacebook}
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            className='login-modal-btn mt-3'
                                        >
                                            <Image src={FacebookIconImage} style={{ "width": "14px"}} className='me-3' />
                                            {t('login.facebook')} {showRegParam
                                                ? t('actions.enter')
                                                : t('actions.signIn')}
                                        </Button>
                                    )}
                                />
                                <Button
                                    onClick={() => authWithGoogle()}
                                    className='login-modal-btn my-3'
                                >
                                    <Image src={GoogleIconImage} className='me-3' />
                                    {t('login.google')} {showRegParam
                                        ? t('actions.enter')
                                        : t('actions.signIn')}
                                </Button>
                            </div>
                            {showRegParam ?
                                <div className='login-modal-form px-4 pt-3'>
                                    <p className='login-modal-text'>{t('actions.regWithEmail')}</p>
                                    <form>
                                        <div>
                                            <div className='mb-3'>
                                                <input className='login-modal-input' onBlur={() => handleRegInputBlur('regName')} value={enteredRegValues.regName} onChange={(event) => handleRegInputChange('regName', event.target.value)} type='text' name='name' placeholder={t('placeholder.fullName')} />
                                                <div className='control-error'>{regNameIsInvalid && <p className='mb=0'>{t('error.correctName')}</p>}</div>
                                            </div>
                                            <div className='mb-3'>
                                                <input className='login-modal-input' onBlur={() => handleRegInputBlur('regEmail')} value={enteredRegValues.regEmail} onChange={(event) => handleRegInputChange('regEmail', event.target.value)} type='email' name='email' placeholder={t('placeholder.mail')} />
                                                <div className='control-error'>{regEmailIsInvalid && <p className='mb=0'>{t('error.emailError')}</p>}</div>
                                            </div>
                                            <div className='mb-3 position-relative'>
                                                <FontAwesomeIcon className='me-3 register-eye-icon' onClick={toggle} icon={isVisible ? faEye : faEyeSlash} />
                                                <input className='login-modal-input' type={isVisible ? "text" : "password"} onBlur={() => handleRegInputBlur('regPassword')} value={enteredRegValues.regPassword} onChange={(event) => handleRegInputChange('regPassword', event.target.value)} name='password' placeholder={t('placeholder.password')} />
                                                <div className='control-error'>{regPasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                            </div>
                                            <div className='mb-3'>
                                                <input className='login-modal-input' onBlur={() => handleRegInputBlur('regPhone')} value={enteredRegValues.regPhone} onChange={(event) => handleRegInputChange('regPhone', event.target.value)} type='text' name='phoneNumber' placeholder={t('placeholder.phone')} />
                                                <div className='control-error'>{regPhoneIsInvalid && <p className='mb=0'>{t('error.phoneError')}</p>}</div>
                                            </div>
                                            <Button className='login-modal-form-btn py-2' onClick={handleRegSubmit}>{t('actions.regLogin')}</Button>
                                        </div>
                                    </form>
                                    <p className='login-modal-footer-text mt-5 mb-0 pb-3'>{t('login.hasAccount')}
                                        <span onClick={() => setShowRegParam(false)}> {t('login.log')}</span> {t('login.in')}</p>
                                </div>
                                :
                                <div className='login-modal-form px-4 pt-3'>
                                    <div>
                                        {isLoading ? <Loader /> :
                                            <>
                                                <p className='login-modal-text'>{t('actions.loginWithEmail')}</p>
                                                <form>
                                                    <div>
                                                        <div className='mb-3'>
                                                            <input className='login-modal-input' onBlur={() => handleInputBlur('loginEmail')} value={enteredLoginValues.loginEmail} onChange={(event) => handleLoginInputChange('loginEmail', event.target.value)} type='email' name='email' placeholder={t('placeholder.mail')} />
                                                            <div className='control-error'>{loginEmailIsInvalid && <p className='mb=0'>{t('error.emailError')}</p>}</div>
                                                        </div>
                                                        <div className='mb-3 position-relative'>
                                                            <FontAwesomeIcon className='me-3 register-eye-icon' onClick={toggleLogin} icon={isVisibleLogin ? faEye : faEyeSlash} />
                                                            <input className='login-modal-input' type={isVisibleLogin ? "text" : "password"} onBlur={() => handleInputBlur('loginPassword')} value={enteredLoginValues.loginPassword} onChange={(event) => handleLoginInputChange('loginPassword', event.target.value)} name='password' placeholder={t('placeholder.password')} />
                                                            <div className='control-error'>{loginPasswordIsInvalid && <p className='mb-0'>{t('error.passwordError')}</p>}</div>
                                                        </div>
                                                        <Button className='login-modal-form-btn py-2' onClick={handleSubmit}>{t('actions.logLogin')}</Button>
                                                    </div>
                                                </form>
                                            </>
                                        }
                                    </div>
                                    <p className='login-modal-footer-text mt-3 mb-0 pb-5'>{t('login.newAcc')} <span onClick={() => setShowRegParam(true)}>{t('login.reg')}</span>{t('login.regEnd')}</p>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}