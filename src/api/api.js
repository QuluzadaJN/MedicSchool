import { toast } from 'react-toastify';
import axios from "axios";
import { store } from "../store";

const BASE_URL = 'http://167.86.101.78:8080/api/v1';

const { userInfo } = store.getState().auth;

const token = userInfo?.headers?.token?.[0];

export const authAPI = {
    registerWithGoogle({ email, fullName }) {
        return axios.post(`${BASE_URL}/auth/google/register?email=${email}&fullName=${fullName}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.status === 'OK') {
                        toast.success(response.data.body);
                        return response.data;
                    } else {
                        toast.error(response.data.body);
                    }
                }
            }).catch(error => {
                toast.error(error?.response?.data?.errors?.[0].defaultMessage);
            })
    },
    register({ email, fullName, password, phoneNumber }) {
        return axios.post(`${BASE_URL}/auth/register`, JSON.stringify({ email, fullName, password, phoneNumber }), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body);
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    updateEmail(data) {
        return axios.put(`${BASE_URL}/auth/updateEmail`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body);
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    updatePassword(data) {
        return axios.put(`${BASE_URL}/auth/updatePassword`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body);
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getAllCategories() {
        return axios.get(`${BASE_URL}/category/all`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.status === 'OK') {
                        return response.data;
                    } else {
                        toast.error(response.data.body);
                    }
                }
            }).catch(error => {
                toast.error(error?.response?.data?.errors?.[0].defaultMessage);
            })
    },

    getCourseCertificate(courseId) {
        return axios.get(`${BASE_URL}/certificate/getbyCourse/${courseId}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getCommentsByCourseId(courseId) {
        return axios.get(`${BASE_URL}/comment/byCourse/${courseId}`
        ).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    postComment(data) {
        return axios.post(`${BASE_URL}/comment/save`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getAllByCourseId(courseId) {
        return axios.get(`${BASE_URL}/content/byCourse/${courseId}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getAllByCategory(categoryId) {
        return axios.get(`${BASE_URL}/course/byCategory/${categoryId}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getClientCourses(pageIndex) {
        return axios.get(`${BASE_URL}/course/clientCourses?pageIndex=${pageIndex}`, {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getBlogs(index) {
        return axios.get(`${BASE_URL}/blog/page/${index}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getBlogById(id) {
        return axios.get(`${BASE_URL}/blog/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getAllByFilter({ page, filter }) {
        return axios.get(`${BASE_URL}/course/filter?page=${page}&filter=${filter}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getCourseById(id) {
        return axios.get(`${BASE_URL}/course/id/${id}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getCoursesPagination(pageIndex) {
        return axios.get(`${BASE_URL}/course/page/${pageIndex}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getSearchByName(topicName) {
        return axios.get(`${BASE_URL}/course/search?topicName=${topicName}`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    postCheckPayment({ orderId, sessionId }) {
        return axios.post(`${BASE_URL}/payment/check`, JSON.stringify({ orderId, sessionId }), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {},
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body);
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        })
    },

    postPurchaseCourse(data) {
        return axios.post(`${BASE_URL}/payment/purchase`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {},
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body)
                    return response.data
                } else {
                    toast.error(response.data.body)
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage)
        })
    },

    postSubmitRating(data) {
        return axios.post(`${BASE_URL}/rate/submit`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {},
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    postSubmitContactForm(data) {
        return axios.post(`${BASE_URL}/support/submit`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    toast.success(response.data.body);
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    getUserShortInfo() {
        return axios.get(`${BASE_URL}/user/shortInfo`, {
            headers: {
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },

    updateUserProgressOnCourse(contentId) {
        return axios.put(`${BASE_URL}/userProgress/update?contentId=${contentId}`, null, {
            headers: {
                'Content-Type': 'application/json',
                ...token ? { authorization: token } : {}
            },
        }).then(response => {
            if (response.status === 200) {
                if (response.data.status === 'OK') {
                    return response.data;
                } else {
                    toast.error(response.data.body);
                }
            }
        }).catch(error => {
            toast.error(error?.response?.data?.errors?.[0].defaultMessage);
        })
    },
}
