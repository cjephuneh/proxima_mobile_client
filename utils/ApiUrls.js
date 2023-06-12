const BASE_URI = 'http://192.168.1.18:3000/api'

// auth
const REGISTER_ENDPOINT = BASE_URI + '/auth/client'
const LOGIN_ENDPOINT = BASE_URI + '/auth/signin'
const CHAT_ENDPOINT = BASE_URI + '/chat'
const COMMUNITY_ENDPOINT = BASE_URI + '/community'
const SURVEY_ENDPOINT = BASE_URI + '/survey'

export const ApiUrls =  {
    // auth
    REGISTER_ENDPOINT,
    LOGIN_ENDPOINT,

    // chats
    retrieve_chats: CHAT_ENDPOINT + '/chat/',
    retrieve_messages: CHAT_ENDPOINT + '/message/',

    // community
    retrieve_communities: COMMUNITY_ENDPOINT + '/community/',
    retrieve_community_issues: COMMUNITY_ENDPOINT + '/issue/',
    retrieve_issue_thread: COMMUNITY_ENDPOINT + '/thread/',
    retrieve_thread_comments: COMMUNITY_ENDPOINT + '/comment/',
    like_issue_comment: COMMUNITY_ENDPOINT + '/likeordislikecomment/',
    raise_issue: COMMUNITY_ENDPOINT + '/issue/',
    favorite_communities: COMMUNITY_ENDPOINT + '/favoritecommunities/',
    join_community: COMMUNITY_ENDPOINT + '/joincommunity/',
    leave_community: COMMUNITY_ENDPOINT + '/leavecommunity/',

    // survey
    retrieve_surveys: SURVEY_ENDPOINT + '/survey/',
}