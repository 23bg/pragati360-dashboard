const ROUTES = {
    ROOT: '/',
    HOME: '',


    APP: {
        ROOT: "/app",




        // The ONE business the user owns
        BUSINESS: {
            ROOT: "/business",
            OVERVIEW: "/business/overview",
            LOCATIONS: {
                ROOT: "/business/locations",
                CREATE: "/business/locations/create",
                DETAIL: (locationId: string) =>
                    `/app/business/locations/${locationId}`,
                UPDATE: (locationId: string) =>
                    `/app/business/locations/${locationId}/update`,
                POSTS: {
                    ROOT: (locationId: string) =>
                        `/app/business/locations/${locationId}/posts`,
                    CREATE: (locationId: string) =>
                        `/app/business/locations/${locationId}/posts/create`,
                    UPDATE: (locationId: string, postId: string) =>
                        `/app/business/locations/${locationId}/posts/${postId}/update`,
                },
                REVIEWS: {
                    ROOT: (locationId: string) =>
                        `/app/business/locations/${locationId}/reviews`,
                    REPLY: (locationId: string, reviewId: string) =>
                        `/app/business/locations/${locationId}/reviews/${reviewId}/reply`,
                }
            },

        },



        // Instagram module remains same
        INSTAGRAM: {
            ROOT: "/instagram",
            POSTS: "/instagram/posts",
            MESSAGES: "/instagram/messages",
            COMPETITORS: "/instagram/competitors",
        },

        MEMBERS: {
            ROOT: "/members",
            CREATE: "/members/create",
            DETAIL: (memberId: string) => `/app/members/${memberId}`,
            UPDATE: (memberId: string) => `/app/members/${memberId}/update`,
        },

        SUBSCRIPTION: {
            ROOT: "/subscription",
            CREATE: "/subscription/create",
            DETAIL: (subscriptionId: string) => `/app/subscription/${subscriptionId}`,
        },


        // Other modules

        TEMPLATES: "/templates",

        ACCOUNT: "/account",
        INTEGRATIONS: "/integrations",


        HELP_CENTER: "/help-center",
        FAQs: "/faqs",
        CONTACT: "/contact",
    },


    AUTH: {
        LOG_IN: '/login',
        SIGN_UP: '/signup',
        VERIFICATION: '/verification',
    },


    NOT_FOUND: '*'
};

export default ROUTES;
