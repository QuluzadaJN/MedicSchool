import { toast } from 'react-toastify';
import {useEffect, useRef, useState} from 'react';
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

import { universalAPI } from '../../api/api';

import "./Header.css";
import ScrollToTop from "../component/ScrollToTop";

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
            const resp = await universalAPI.getAllCategories();
            setCategories(resp)
        } catch (err) {
            toast.error(err?.response?.data?.errors?.[0].defaultMessage)
        }
    }
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        if (expanded) {
            getCategories();
        }
    }, [expanded]);

    // const navClickHideMenu = ()=>{
    //     document.querySelector('.navbar-collapse').classList.remove('show')
    // }
    const navClickHideMenu = () => setExpanded(false);
    const getSearchByName = (topicName) => {
        localStorage.removeItem('filterName');
        localStorage.setItem('topicName', topicName);
    }

    const navRef = useRef(null);
    const collapseRef = useRef(null);

    useEffect(() => {
        function handlePointer(e) {
            if (!expanded) return;

            const navEl = navRef.current;
            const collapseEl = collapseRef.current;
            if (!collapseEl) return;

            // click/touch Y
            const clickY = (e.touches && e.touches[0]) ? e.touches[0].clientY : (e.clientY || 0);
            const clickX = (e.touches && e.touches[0]) ? e.touches[0].clientX : (e.clientX || 0);

            const collapseRect = collapseEl.getBoundingClientRect();
            const navRect = navEl ? navEl.getBoundingClientRect() : null;

            // 1) Əgər klik collapse və ya navbar içindədirsə, heç nə etmə
            if ((navEl && navEl.contains(e.target)) || collapseEl.contains(e.target)) {
                return;
            }

            // 2) elementFromPoint ilə vizual targetı yoxla (overlay və z-index problemlərinə qarşı)
            const elemAtPoint = document.elementFromPoint(clickX, clickY);
            if (elemAtPoint && (collapseEl.contains(elemAtPoint) || (navEl && navEl.contains(elemAtPoint)))) {
                return;
            }

            // 3) Əgər klik collapse altındadırsa (yəni collapse bottom‑dan aşağıdır) bağla
            if (clickY > collapseRect.bottom) {
                setExpanded(false);
                return;
            }

            // 4) Default: klik navbar xaricindədirsə bağla
            setExpanded(false);
        }

        document.addEventListener('pointerdown', handlePointer, true);
        // bəzi cihazlarda touchstart daha etibarlı olur
        document.addEventListener('touchstart', handlePointer, true);

        return () => {
            document.removeEventListener('pointerdown', handlePointer, true);
            document.removeEventListener('touchstart', handlePointer, true);
        };
    }, [expanded]);


    const updateCollapseHeight = () => {
        const collapseEl = collapseRef.current;
        if (!collapseEl) return;
        // scrollHeight collapse içindəki tam məzmun hündürlüyüdür
        const h = collapseEl.scrollHeight;
        // optional: CSS variable for backdrop top if you use it
        collapseEl.style.setProperty('--collapse-height', `${h}px`);
        // ensure max-height large enough
        collapseEl.style.maxHeight = `calc(100vh - var(--navbar-height, 64px))`;
    };


    useEffect(() => {
        // update on mount and when expanded changes
        updateCollapseHeight();
    }, [expanded, categories]); //
    const [coursesOpen, setCoursesOpen] = useState(false);

    // useEffect: navbar collapse bağlananda dropdown da bağlansın
    useEffect(() => {
        if (!expanded) setCoursesOpen(false);
    }, [expanded]);
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
                <header className='header-bg' ref={navRef}>
                    <Container>
                        <Navbar
                                expand="lg"
                                collapseOnSelect
                                expanded={expanded}
                                onToggle={() => setExpanded(!expanded)}
                        >
                            <Container fluid >
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Brand href="/"><Image src={LogoImage} /></Navbar.Brand>
                                <Navbar.Collapse id="navbarScroll" ref={collapseRef}>
                                    <Nav className="my-2 my-lg-0" navbarScroll
                                    >
                                        {/*<NavDropdown title={t('menu.courses')} className='courses-dropdown' id="navbarScrollingDropdown" onClick={getCategories}>*/}
                                        {/*    <div className='d-flex nav-courses-flex'>*/}
                                        {/*        <div className='nav-courses-flex-left'>*/}
                                        {/*            <h3 className="footer-title mb-3">{t('footerMenu.allCourses')}*/}
                                        {/*                <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} />*/}
                                        {/*            </h3>*/}
                                        {/*            {categories ? categories?.body?.items?.map((cat) => {*/}
                                        {/*                return (*/}
                                        {/*                    <NavDropdown.Item className='footer-listItem ps-0 '*/}
                                        {/*                                      onClick={() => setExpanded(false)}*/}
                                        {/*                                      href={`/courses/category/${cat.id}`} key={cat.id}>{cat.name}*/}
                                        {/*                    </NavDropdown.Item>*/}
                                        {/*                )*/}
                                        {/*            }) : <Loader />}*/}
                                        {/*        </div>*/}
                                        {/*        <div className='nav-courses-flex-right'>*/}
                                        {/*            <h3 className="footer-title mb-3">{t('footerMenu.myCourses')}*/}
                                        {/*                <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} />*/}
                                        {/*            </h3>*/}
                                        {/*            <NavDropdown.Item className='footer-listItem ps-0' value="" href="/courses">{t('footerMenu.myCourses')}</NavDropdown.Item>*/}
                                        {/*            {filterArray.map((filter, index) => (*/}
                                        {/*                <NavDropdown.Item href={`/courses/${filter.name}`}*/}
                                        {/*                                  onClick={() => setExpanded(false)}*/}
                                        {/*                                  className='footer-listItem ps-0' key={index} value={filter.name}>{filter.text}*/}
                                        {/*                </NavDropdown.Item>*/}
                                        {/*            ))}*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</NavDropdown>*/}
                                        <NavDropdown
                                            className='courses-dropdown'
                                            id="navbarScrollingDropdown"
                                            show={coursesOpen}
                                            onClick={() => {
                                                // əgər kateqoriyalar hələ yüklənməyibsə, yüklə
                                                if (!categories?.body) getCategories();
                                            }}
                                            onToggle={(nextShow) => {
                                                setCoursesOpen(nextShow);
                                                if (nextShow) setTimeout(updateCollapseHeight, 60);
                                            }}
                                            title={t('menu.courses')}
                                        >
                                            <div className='d-flex nav-courses-flex'>
                                                <div className='nav-courses-flex-left'>
                                                    <h3 className="footer-title mb-3">{t('footerMenu.allCourses')}
                                                        <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} />
                                                    </h3>

                                                    {categories?.body?.items?.length ? categories.body.items.map(cat => (
                                                        <NavDropdown.Item
                                                            as={Link}
                                                            to={`/courses/category/${cat.id}`}
                                                            key={cat.id}
                                                            className='footer-listItem ps-0'
                                                            onClick={() => { setCoursesOpen(false); setExpanded(false); }}
                                                        >
                                                            {cat.name}
                                                        </NavDropdown.Item>
                                                    )) : <Loader />}
                                                </div>

                                                <div className='nav-courses-flex-right'>
                                                    <h3 className="footer-title mb-3">{t('footerMenu.myCourses')}
                                                        <FontAwesomeIcon className="footer-arrowIcon" icon={faArrowRight} />
                                                    </h3>

                                                    <NavDropdown.Item
                                                        as={Link}
                                                        to="/courses"
                                                        className='footer-listItem ps-0'
                                                        onClick={() => setExpanded(false)}
                                                    >
                                                        {t('footerMenu.myCourses')}
                                                    </NavDropdown.Item>

                                                    {filterArray.map((filter, index) => (
                                                        <NavDropdown.Item
                                                            as={Link}
                                                            to={`/courses/${filter.name}`}
                                                            onClick={() => setExpanded(false)}
                                                            className='footer-listItem ps-0'
                                                            key={index}
                                                            value={filter.name}
                                                        >
                                                            {filter.text}
                                                        </NavDropdown.Item>
                                                    ))}
                                                </div>
                                            </div>
                                        </NavDropdown>
                                        <Nav.Link as={Link}  onClick={() => setExpanded(false)} activeClassName="active" to={'/blogs'}>{t('menu.blogs')}</Nav.Link>
                                        <Nav.Link as={Link}  onClick={() => setExpanded(false)} activeClassName="active" to={'/about'}>{t('menu.about')}</Nav.Link>
                                        <Nav.Link as={Link}  onClick={() => setExpanded(false)} activeClassName="active" to={'/contact'}>{t('menu.contact')}</Nav.Link>
                                        {userInfo?.status === 'OK' &&
                                            <>
                                                <Nav.Link as={Link} activeClassName="active" to={'/myCourses'}>{t('menu.myCourses')}</Nav.Link>
                                                <NavDropdown className='profil-dropdown' title="Profilim" id="navbarScrollingDropdown">
                                                    <NavDropdown.Item  onClick={() => setExpanded(false)} href="/profileUser">
                                                        <FontAwesomeIcon className='me-3' icon={faUser} />
                                                        {t('menu.profil')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item  onClick={() => setExpanded(false)} href="/myCourses">
                                                        <FontAwesomeIcon className='me-3' icon={faBookmark} />
                                                        {t('menu.myCourses')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item  onClick={() => setExpanded(false)} href="/settings">
                                                        <FontAwesomeIcon className='me-3' icon={faGear} />
                                                        {t('menu.settings')}courses-dropdown
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item  onClick={() => setExpanded(false)} href="/healthcare">
                                                        <FontAwesomeIcon className='me-3' icon={faComment} />
                                                        {t('menu.beHealthy')}
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item  onClick={() => setExpanded(false)} href="/contact">
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
                </header>
                <div className="spacer">
                    &nbsp;
                </div>
                <div>
                    <ScrollToTop />
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
