import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import LogoImage from "../../images/Logo.png";
import { useTranslation } from 'react-i18next';
import { logOut } from '../../store/authSlice';
import { useLogoutMutation } from '../../api/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Form, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import MobileProfileIcon from '../../images/mobile_profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faUser, faBookmark, faGear, faComment, faCircleQuestion, faArrowRightFromBracket, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import {
    Link,
    Route,
    Routes,
    Navigate,
    BrowserRouter as Router,
} from "react-router-dom";

import Login from './Login';
import Search from './Search';
import About from '../About/About';
import RequireAuth from './RequireAuth';
import Contact from '../Contact/Contact';
import Loader from '../component/Loader';
import Settings from '../Settings/Settings';
import HomePage from '../HomePage/HomePage';
import ProfileUser from '../Profile/ProfileUser';
import HealthCare from '../HealthCare/HealthCare';
import Blogs from '../Blogs/BlogList';
import CoursesList from '../CoursesList/CoursesList';
import ProfileInstructor from '../Profile/ProfileInstructor';
import CoursesDetailTaken from '../CourseDetail/CourseDetailTaken';
import CoursesDetailNotTaken from '../CourseDetail/CourseDetailNotTaken';
import BlogDetail from '../BlogDetail/BlogDetail';
import GenericNotFound from '../component/GenericNotFound/GenericNotFound';
import CoursesByCategory from '../Courses/CoursesByCategory';
import CoursesByFilter from '../Courses/CoursesByFilter';

import { authAPI } from '../../api/api';

import "./Header.css";

export default function Header({showRegParam, setShowRegParam, showLogin, setShowLogin}) {
    // const [showRegParam, setShowRegParam] = useState(false);
    // const [showLogin, setShowLogin] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [logOutToApi] = useLogoutMutation();

    // const setIsLoginOrRegister = (bool) => {
    //     setShowRegParam(bool)
    // }

    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage('az');
    }, []);

    let { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const filterArray = [
        { name: "Popular", text: "Populyar kurslar" },
        { name: "CheapFirst", text: "Endirimli Kurslar" },
        { name: "NewDateFirst", text: "Yeni kurslar" },
        { name: "Free", text: "Pulsuz kurslar" },
    ];

    const logoutHandler = async () => {
        console.log(userInfo)
        try {
            const resp = await logOutToApi(userInfo.body.email).unwrap();
            if (resp.status === 'OK') {
                dispatch(logOut());
                toast.success(resp.body)
                window.location.reload();
            } else {
                toast.error(resp.body)
            }
        } catch (err) {
            toast.error(err.data.message || err.error)
        }
    }

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const resp = await authAPI.getAllCategories();
            setCategories(resp)
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }

    const getSearchByName = (topicName) => {
        localStorage.removeItem('filterName');
        localStorage.setItem('topicName', topicName);
    }

    return (
        <Router>
            <Login
                show={showLogin}
                showRegParam={showRegParam}
                setShowRegParam={setShowRegParam}
                setShowLogin={setShowLogin}
                close={() => {
                    setShowLogin(false)
                }} />
            <div>
                <div className='header-bg'>
                    <Container>
                        <Navbar expand="lg">
                            <Container fluid className='position-static'>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Brand href="/"><Image src={LogoImage} /></Navbar.Brand>
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav
                                        className="my-2 my-lg-0"
                                        navbarScroll
                                    >
                                        <NavDropdown title={t('menu.courses')} className='courses-dropdown position-static' id="navbarScrollingDropdown" onClick={getCategories}>
                                            <Container className='d-flex nav-courses-flex'>
                                                <div className='nav-courses-flex-left'>
                                                    <h3 className="footer-title mb-3">{t('footerMenu.allCourses')} <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} /></h3>
                                                    {categories ? categories?.body?.items?.map((cat) => {
                                                        return (
                                                            <NavDropdown.Item className='footer-listItem ps-0' href={`/courses/category/${cat.id}`} key={cat.id}>{cat.name}</NavDropdown.Item>
                                                        )
                                                    }) : <Loader />}
                                                </div>
                                                <div className='nav-courses-flex-right'>
                                                    <h3 className="footer-title mb-3">{t('footerMenu.myCourses')} <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} /></h3>
                                                    <NavDropdown.Item className='footer-listItem ps-0' value="" href="/courses">{t('footerMenu.myCourses')}</NavDropdown.Item>
                                                    {filterArray.map((filter, index) => (
                                                        <NavDropdown.Item href={`/courses/${filter.name}`} className='footer-listItem ps-0' key={index} value={filter.name}>{filter.text}</NavDropdown.Item>
                                                    ))}
                                                </div>
                                            </Container>
                                        </NavDropdown>
                                        <Nav.Link as={Link} activeClassName="active" to={'/blogs'}>{t('menu.blogs')}</Nav.Link>
                                        <Nav.Link as={Link} activeClassName="active" to={'/about'}>{t('menu.about')}</Nav.Link>
                                        <Nav.Link as={Link} activeClassName="active" to={'/contact'}>{t('menu.contact')}</Nav.Link>
                                        {userInfo?.status === 'OK' &&
                                            <>
                                                <Nav.Link as={Link} activeClassName="active" to={'/myCourses'}>{t('menu.myCourses')}</Nav.Link>
                                                <NavDropdown className='profil-dropdown' title="Profilim" id="navbarScrollingDropdown">
                                                    <NavDropdown.Item href="/profileUser">
                                                        <FontAwesomeIcon className='me-3' icon={faUser} />
                                                        {t('menu.profil')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item href="/myCourses">
                                                        <FontAwesomeIcon className='me-3' icon={faBookmark} />
                                                        {t('menu.myCourses')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item href="/settings">
                                                        <FontAwesomeIcon className='me-3' icon={faGear} />
                                                        {t('menu.settings')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item href="/healthcare">
                                                        <FontAwesomeIcon className='me-3' icon={faComment} />
                                                        {t('menu.beHealthy')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item href="/contact">
                                                        <FontAwesomeIcon className='me-3' icon={faCircleQuestion} />
                                                        {t('menu.contact')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item onClick={() => logoutHandler()} >
                                                        <FontAwesomeIcon className='me-3' icon={faArrowRightFromBracket} />
                                                        {t('menu.exit')}
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        }
                                    </Nav>
                                </Navbar.Collapse>
                                <Form.Group className="input-wrapper" controlId="formSearch">
                                    <FontAwesomeIcon className='search-icon' icon={faSearch} />
                                    <Form.Control to={'/search'}
                                                  onChange={(e) => setSearchParam(e.target.value)}
                                                  type="search"
                                                  className='search-input'
                                                  placeholder={t('menu.search')} />
                                    {searchParam !== "" &&
                                        <Link to={'/search'}>
                                            <FontAwesomeIcon className='me-3 searchArrow'
                                                             onClick={() => getSearchByName(searchParam)}
                                                             icon={faArrowCircleRight} />
                                        </Link>
                                    }
                                </Form.Group>
                                {userInfo?.status !== 'OK' &&
                                    <>
                                        <Button className='nav-login'
                                            onClick={() => {
                                                setShowLogin(true);
                                                setShowRegParam(false)
                                                // setIsLoginOrRegister(false)
                                            }}>{t('actions.login')}</Button>
                                        <Button className="nav-register"
                                            onClick={() => {
                                                setShowLogin(true);
                                                setShowRegParam(true)
                                                // setIsLoginOrRegister(true)
                                            }}>{t('actions.register')}</Button>
                                        <span className='nav-mobile-reg'
                                            onClick={() => {
                                                setShowLogin(true);
                                                setShowRegParam(false)
                                                // setIsLoginOrRegister(true)
                                            }}><Image src={MobileProfileIcon} /></span>
                                    </>
                                }
                            </Container>
                        </Navbar>
                    </Container>
                </div>
                <div className="spacer">
                    &nbsp;
                </div>
                <div>
                    <Routes>
                        {/* <Switch> */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/courses" element={<CoursesList />} />
                        <Route path="/courses/category/:id" element={<CoursesByCategory />} />
                        <Route path="/courses/:id" element={<CoursesByFilter />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/course/id/:id"
                               element={<CoursesDetailNotTaken
                                        showRegParam={showRegParam}
                                        setShowRegParam={setShowRegParam}
                                        showLogin={showLogin}
                                        setShowLogin={setShowLogin}/>} />
                        <Route path='' element={<RequireAuth />}>
                            <Route path="/myCourses" element={<CoursesList />} />
                            <Route path="/profileUser" element={userInfo?.body.role === 'ADMIN'
                                ? <ProfileInstructor />
                                : <ProfileUser />} />
                            <Route path="/content/byCourse/:id" element={<CoursesDetailTaken />} />
                        </Route>
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/healthCare" elemen={<HealthCare />} />
                        <Route path="/search" element={<Search searchParam={searchParam} getSearchByName={getSearchByName} />} />
                        <Route path="/404" element={<GenericNotFound />} />
                        <Route path="*" element={<Navigate replace to="/404" />} />
                        {/* </Switch> */}
                    </Routes>
                </div>
            </div>

        </Router>
    )
}
