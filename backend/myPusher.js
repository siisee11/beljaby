import Pusher from 'pusher'

export const pusher = new Pusher({
    appId: '1096557',
    key: '09aca0914798759c73f6',
    secret: '2c595a1314c948290340',
    cluster: 'ap3',
    useTLS: true
});