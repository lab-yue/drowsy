import drowsy from '../src/';
import * as Drowsy from '../src/type';

const config: Drowsy.Config = {
    wp: {
        ver: '5.0.3',
        url: 'https://your.wordpress.com',
        user: '__username__',
        password: '__password__'
    },
    LaunchOptions: {
        headless: false
    }
};

const newpost: Drowsy.Post = {
    title: `I'm drowsy`,
    type: 'blog',
    content: `post this drowsily`
};

(async () => {
    const wp = await drowsy.launch(config);
    await wp.login();
    await wp.post(newpost);
    await wp.close();
})();
