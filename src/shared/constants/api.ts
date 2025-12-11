export const API = {
    PRELAUNCH_SUBMIT: '/web/pre-launch',
    AUTH: {
        LOG_IN: '/auth/login',
        LOG_OUT: '/auth/logout',
        SIGN_UP: '/auth/signup',
        VERIFY: '/auth/verify',
        REFRESH_TOKEN: '/auth/refersh-token',

    },
    USERS: {
        ALL: '/users',
        GET: (id: string) => `/users/${id}`,
        CURRENT_USER: '/users/me',
        CREATE: '/users',
        UPDATE: (id: string) => `/users/${id}`,
    },
    TEMPLATES: {
        ALL: '/tickets',
        GET: (id: string) => `/tickets/${id}`,
        CREATE: '/tickets',
    },

    GOOGLE_BUSINESS: {
        LOCATION: {
            GET_ALL: `/google-business-locations/`,
            GET: (locationId: string) => `/google-business-locations/${locationId}`,
            BY_LOCATION: (locationId: string) => `/google-business-locations/posts/location/${locationId}`,
            UPDATE: (id: string) => `/google-business-locations/posts/${id}`,
            DELETE: (id: string) => `/google-business-locations/posts/${id}`,
        },
        REVIEW: {
            BY_LOCATION: (locationId: string) => `/google/posts/location/${locationId}`,
            CREATE: `/google/posts`,
            UPDATE: (id: string) => `/google/posts/${id}`,
            DELETE: (id: string) => `/google/posts/${id}`,
        },
        POST: {
            BY_LOCATION: (locationId: string) => `/google/posts/location/${locationId}`,
            CREATE: `/google/posts`,
            UPDATE: (id: string) => `/google/posts/${id}`,
            DELETE: (id: string) => `/google/posts/${id}`,
        },
    },
    SUBSCRIPTION: {
        ALL: '/payments/me',
        GET: (id: string) => `/payments/${id}`,
        CREATE: '/payments',
    },
    TICKETS: {
        CREATE: '/tickets',
    },

    INSTAGRAM: {
        LIST: "/instagram",
        GET: (id: string) => `/instagram/${id}`,
        GET_BY_BUSINESS: (biz: string) => `/instagram/business/${biz}`,
        CREATE: "/instagram",
        UPDATE: (id: string) => `/instagram/${id}`,
        DELETE: (id: string) => `/instagram/${id}`,
    },
    BUSINESS: {
        GET: (id: string) => `/business/${id}`,
        GET_ALL: '/business/',
        CREATE: '/business/',

        UPDATE: (id: string) => `/business/posts/${id}`,
        DELETE: (id: string) => `/business/posts/${id}`,
    },
}