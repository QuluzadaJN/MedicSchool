import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes ...
        },
        resources: {
            en: {
                translation: {
                    menu: {
                        courses: "Courses",
                        about: "About",
                        blogs: "Blogs",
                        contact: "Contact",
                        search: "Search",
                        profil: "View profile",
                        myCourses: "My courses",
                        settings: "Settings",
                        beHealthy: "'Be healthy'",
                        exit: "Exit",
                    },
                    actions: {
                        login: "Log In",
                        register: "Register",
                        followUs: "APPLY",
                        mainPage: "HOME PAGE",
                        rateCourse: "Rate course",
                        share: "Share",
                        addtoFavorites: "Add to wish list",
                        purchaseCourse: "KURSU AL",
                        download: "Download",
                        send: "Send",
                        goToCourse: "GO TO COURSE",
                        buy: "BUY",
                        startCourse: "START THE COURSE",
                        continueCourse: "STAY ON COURSE",
                        seeCourses: "See courses",
                        joinUs: "JOIN US",
                        callUs: "CALL US",
                        sendReq: "SEND INQUIRY",
                        orSendReq: "or send an inquiry",
                        enter: "ENTER",
                        signIn: "SIGN IN",
                        regWithEmail: "Register with an email address",
                        regLogin: "REGISTER",
                        loginWithEmail: "Enter your login information",
                        logLogin: "LOG IN",
                        saveChanges: "Save change",
                    },
                    profil: "Profil",
                    footerMenu: {
                        ourCourses: "Our Courses",
                        allCourses: "All Courses",
                        myCourses: "My Courses",
                        forContact: "FOR CONTACT"
                    },
                    language: {
                        title: "Language",
                        capsTitle: "LANGUAGE",
                        az: "AZERBAIJANI LANGUAGE",
                        en: "ENGLISH LANGUAGE"
                    },
                    about: {
                        title: "About us",
                        content: "Medic School Training Center is a training center that has obtained the status of an International Training Center (AHA - International Training Center) accredited and approved by the American Heart Association, which operates in the fields of medical education and corporate management since 2021. Our center constantly supports the career development of medical personnel by organizing and teaching medical trainings (BFA, AFA, BLS, ACLS, PALS) and medical conferences (local and international) according to AHA protocols, as well as making advanced science and practice more accessible. Trainings are conducted by AHA (American Heart Association) internationally certified trainers.",
                        vision: "Our vision",
                        visionText: "We aim to create a community prepared for heart attack and sudden cardiac arrest with our accessible and effective training programs, while raising awareness for a healthier society with our high-quality and internationally protocol-based training on heart health and cardiovascular disease for medical and non-medical professionals.",
                        mission: "Our mission",
                        missionText: "It is to support the development of international experience in all fields of medicine in Azerbaijan with quality and innovative healthcare education.",
                        goal: "Our goal",
                        goalText: "The Medic School Training Center is committed to promoting personal development, career mobility, community service and leadership among healthcare professionals.",
                        trainers: "OUR TRAINERS",
                        partners: "OUR PARTNERS",
                    },
                    error: {
                        notFoundPage: "Page not found",
                        nameError: "You must enter your first and last name.",
                        emailError: "You must enter a valid Email.",
                        noteError: "You must enter a note.",
                        correctName: "You must enter the correct First and Last name",
                        passwordError: "The password must not be less than 8 digits.",
                        phoneError: "You must enter the correct Contact Number",
                    },
                    contactText: "You can fill out the form to contact us",
                    course: {
                        whatToLearn: "What will you learn in this online course?",
                        whoResp: "Who is this course for?",
                        requirementsAndMaterials: "Requirements and materials",
                        discount: "discount",
                        saleDuration: "the offer will end",
                        comment: "comment",
                        lesson: "lesson",
                        tooltip: "You must log in to take the course.",
                        level: "Level",
                        trainer: "Trainer",
                        contents: "Contents",
                        comments: "Comments",
                        courseContent: "COURSE CONTENT",
                        containerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum massa sit amet porta efficitur.",
                        notStarted: "You have not started this course yet",
                        myCourses: "MY COURSES",
                    },
                    homePageIntroText: "We are here for Professional Support",
                    interestedCourse: {
                        title: "Courses you may be interested in",
                        more: "More",
                    },
                    healtyBanner: {
                        title: '"Healthy"',
                        content: "Join us now to become a ",
                        forContact: "For contact",
                        healthText1: "Medical research named X showed a negative 2nd place result in the rating of the cause of death from heart attack in Azerbaijan. This case makes us think deeply and disappoints us. Over the next 5 years, we are starting first aid training with 100,000 volunteers under the slogan 'Everyone should know first aid'!",
                        healthText2: "Citizens who have passed First Aid training and received a certificate will be supporters of our mission - health workers (firesiders, pre-doctor first aiders). To reach the goal we set, you too",
                        healthText3: "You can be a #healthWorker. Let's not forget that First Aid saves lives!",
                        mission: "Our mission: Whoever saves one life is like saving all people.     (Surat al-Maidah, 32)",
                        vision: "Our vision: To provide first aid training to everyone",
                    },
                    placeholder: {
                        fullName: "First name, last name",
                        phone: "Contact number",
                        mail: "E-mail",
                        password: "Password",
                        newEmail: "New email",
                        currentPassword: "Current password",
                        oldPassword: "Old password",
                        newPassword: "New password",
                        againNewPassword: "New password again",
                    },
                    login: {
                        facebook: "WITH FACEBOOK",
                        google: "WITH GOOGLE",
                        hasAccount: "If you already have an account",
                        log: "Log",
                        in: "in",
                        newAcc: "To create a new account",
                        reg: "Register",
                        regEnd: "",
                    },
                    settings: {
                        title: "SETTINGS",
                        account: "Account settings",
                        email: "E-MAIL",
                        changeEmail: "To change your email address",
                        password: "PASSWORD",
                        changePassword: "To change your password",
                        changeLang: "To change the language of the site",
                    },
                    notFound: {
                        notFoundCourse: "No course matching your search was found",
                        course: "Course not found",
                    },
                    blog: {
                        header: "MedicSchool Blogs",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum fringilla lorem hendrerit mollis. Aliquam venenatis dolor sit amet velit facilisis consectetur.",
                    },
                }
            },
            az: {
                translation: {
                    menu: {
                        courses: "Kurslar",
                        blogs: "Bloqlar",
                        about: "Haqqımızda",
                        contact: "Əlaqə",
                        search: "Axtarış",
                        profil: "Profilə bax",
                        myCourses: "Kurslarım",
                        settings: "Tənzimləmələr",
                        beHealthy: "'Sağlıqçı ol'",
                        exit: "Çıxış",
                    },
                    actions: {
                        login: "Giriş",
                        register: "Qeydiyyat",
                        followUs: "MÜRACİƏT EDİN",
                        mainPage: "ANA SƏHİFƏ",
                        rateCourse: "Kursu qiymətləndir",
                        share: "Paylaş",
                        addtoFavorites: "İstək siyahısına əlavə et",
                        purchaseCourse: "KURSU AL",
                        download: "Yüklə",
                        send: "Göndər",
                        goToCourse: "KURSA KEÇİD ET",
                        buy: "SATIN AL",
                        startCourse: "KURSA BAŞLA",
                        continueCourse: "KURSA DAVAM ET",
                        seeCourses: "Kurslara bax",
                        joinUs: "BİZƏ QOŞUL",
                        callUs: "BİZƏ ZƏNG EDİN",
                        sendReq: "SORĞU GÖNDƏR",
                        orSendReq: "və ya sorğu göndərin",
                        enter: "DAXİL OL",
                        signIn: "GİRİŞ ET",
                        regWithEmail: "E-poçt ünvanı ilə qeydiyyatdan keç",
                        regLogin: "QEYDİYYATDAN KEÇ",
                        loginWithEmail: "Giriş məlumatlarınızı daxil edin",
                        logLogin: "GİRİŞ",
                        saveChanges: "Dəyişikliyi yadda saxla",
                    },
                    footerMenu: {
                        ourCourses: "Kurslarımız",
                        allCourses: "Bütün kurslar",
                        myCourses: "Mənim kurslarım",
                        forContact: "ƏLAQƏ ÜÇÜN"
                    },
                    profil: "Profil",
                    language: {
                        title: "Dil",
                        capsTitle: "DİL",
                        az: "AZƏRBAYCAN DİLİ",
                        en: "İNGİLİS DİLİ"
                    },
                    about: {
                        title: "Haqqımızda",
                        content: "Medic School Training Center 2021-ci ildən etibarən tibbi təhsil və korporativ idarəetmə sahələrində fəaliyyət göstərən Amerika Ürək Assosiasiyası (American Heart Association) tərəfindən akkreditasiya olunmuş və təsdiqlənmiş Beynəlxalq Təlim Mərkəzi (AHA - International Training Center) statusunu əldə etmiş təlim mərkəzidir. Mərkəzimiz AHA protokollarına uyğun tibbi təlimlərin (BFA,AFA,BLS,ACLS,PALS) və tibbi konfransların (yerli və beynəlxalq) təşkili və tədrisini həyata keçirməklə tibb personalının karyera inkişafına daim dəstək olur həmçinin qabaqcıl elm və təcrübəni daha əlçatan edir. Təlimlər AHA (American Heart Association) beynəlxalq sertifikatlı təlimçilər tərəfindən aparılır.",
                        vision: "Vizyonumuz",
                        visionText: "Tibb işçiləri və qeyri-tibb işçiləri üçün ürək sağlamlığı və ürək-damar xəstəlikləri ilə bağlı yüksək keyfiyyətli və beynəlxalq protokollara əsaslanan təlimlərimiz ilə daha sağlam cəmiyyət üçün maarifləndirmə işləri aparmaqla yanaşı, əlçatan və təsirli təlim proqramlarımızla infarkt və qəfil ürək dayanmalarına qarşı hazırlanmış bir toplum yaratmağı hədəfləyirik.",
                        mission: "Missiyamız",
                        missionText: "Keyfiyyətli və innovativ səhiyyə təhsili ilə tibbin bütün sahələrində beynəlxalq təcrübəni Azərbaycanda inkişaf etdirməyə dəstək verməkdir.",
                        goal: "Məqsədimiz",
                        goalText: "Medic School Training Center səhiyyə mütəxəssisləri arasında şəxsi inkişaf, karyera mobiliyini, ictimai xidmət və liderliyi təşviq etməyə sadiqdir.",
                        trainers: "TƏLİMÇİLƏRİMİZ",
                        partners: "PARTNYORLARIMIZ",
                    },
                    error: {
                        notFoundPage: "Səhifə tapılmadı",
                        nameError: "AD, SOYAD qeyd etməlisiniz.",
                        emailError: "Düzgün Email qeyd etməlisiniz.",
                        noteError: "Qeyd qeyd etməlisiniz.",
                        correctName: "Düzgün Ad, Soyad qeyd etməlisiniz",
                        passwordError: "Şifrə 8 rəqəmdən az olmamalıdır.",
                        phoneError: "Düzgün Əlaqə nömrəsi qeyd etməlisiniz",
                    },
                    contactText: "Bizimlə əlaqə üçün formu doldura bilərsiniz",
                    course: {
                        whatToLearn: "Bu onlayn kursda nə öyrənəcəksiniz?",
                        whoResp: "Bu kurs kimlər üçündür?",
                        requirementsAndMaterials: "Requirements and materials",
                        discount: "endirim",
                        saleDuration: "sonra təklif bitəcək",
                        comment: "rəy",
                        lesson: "dərs",
                        tooltip: "Kursu almaq üçün giriş etməlisiniz.",
                        level: "Səviyyə",
                        trainer: "Təlimçi",
                        contents: "Contents",
                        comments: "Şərhlər",
                        courseContent: "KURSUN MƏZMUNU",
                        containerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum massa sit amet porta efficitur.",
                        notStarted: "Bu kursa hələ başlamamısınız",
                        myCourses: "KURSLARIM",
                    },
                    homePageIntroText: "Peşəkar Dəstək üçün yanınızdayıq",
                    interestedCourse: {
                        title: "Maraqlanacağınız kurslar",
                        more: "Daha çox",
                    },
                    healtyBanner: {
                        title: '"Sağlıqçı"',
                        content: "olmaq üçün elə indi bizə qoşulun!",
                        forContact: "Əlaqə üçün",
                        healthText1: "X adlı Tibbi araşdırma Azərbaycan ürək tumasından ölüm səbəbinə görə  reytinqdə mənfi 2 ci yer nəticə göstərmişdir. Bu hal bizi dərindən düşündürür və məyus edir. Növbəti 5 il ərzində 100000 nəfər könüllü olmaqla 'Hər kəs ilk yardımı bilməlidir' şüarı ilə ilk yardım təlimlərinə start veririk!",
                        healthText2: "İlk Yardım təlimləri keçib Sertifikat alan vətəndaşalar bu missiyamızda dəstəkçi - Sağlıqçı (firsaider, həkiməqədər ilkyardımçı) olacaqlar. Qoyduğumuz hədəfə çatmaq üçün siz də",
                        healthText3: "#Sağlıqçı ola bilərsiniz. Unutmayaq İlk Yardım Həyat Qurtarır!",
                        mission: "Missiyamız : Kim bir can qurtararsa, bütün insanları xilas etmiş kimidir.     (Maidə Surəsi, 32)",
                        vision: "Vizyonumuz: Hər kəsə ilk yardımı təlimini keçmək",
                    },
                    placeholder: {
                        fullName: "Ad, Soyad",
                        phone: "Əlaqə nömrəsi",
                        mail: "E-poçt",
                        password: "Şifrə",
                        newEmail: "Yeni email",
                        currentPassword: "Hazırki şifrəniz",
                        oldPassword: "Köhnə şifrəniz",
                        newPassword: "Yeni şifrəniz",
                        againNewPassword: "Təkrar yeni şifrəniz",
                    },
                    login: {
                        facebook: "FACEBOOK İLƏ",
                        google: "GOOGLE İLƏ",
                        hasAccount: "Artıq hesabın varsa",
                        log: "Giriş",
                        in: "et",
                        newAcc: "Yeni hesabın yaratmaq üçün",
                        reg: "Qeydiyyat",
                        regEnd: "dan keç",
                    },
                    settings: {
                        title: "TƏNZİMLƏMƏLƏR",
                        account: "Hesab tənzimləmələri",
                        email: "ELEKTRON POÇT",
                        changeEmail: "Elektron poçt ünvanınızı dəyişmək üçün",
                        password: "ŞİFRƏ",
                        changePassword: "Şifrənizi dəyişmək üçün",
                        changeLang: "Saytın dilini dəyişmək üçün",
                    },
                    notFound: {
                        notFoundCourse: "Axtarışa uyğun kurs tapılmadı",
                        course: "Kurs tapılmadı",
                    },
                    blog: {
                        header: "MedicSchool Bloqları",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum fringilla lorem hendrerit mollis. Aliquam venenatis dolor sit amet velit facilisis consectetur.",
                    },
                }
            }
        }
    });

export default i18n;