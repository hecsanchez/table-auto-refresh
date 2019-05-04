import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

const campaignId = process.env.REACT_APP_CAMPAIGN_ID;

export const createNewCandidate = (body) => {
    const { first_name, last_name, email, user_phone_number } = body;

    return api.post(`/campaigns/${campaignId}/campaign_invitations`, {
        api_key: process.env.REACT_APP_API_KEY,
        campaign_invitation: {
            first_name,
            last_name,
            email,
            user_phone_number,
            temporary_cv: {},
            source: ''
        }
    });
}