# Drowsy

WordPress automation made with `puppeteer` and `typescript`

## Install

`yarn add puppeteer typescript @faya/drowsy `

## Usage

see [example](./example/example.ts)


### Setup config

WordPress version is needed for selectors.

```typescript
import drowsy from '@faya/drowsy';

const config: drowsy.Config = {
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

```

### make new post content

```typescript
const newpost: drowsy.Post = {
    title: 'drowsy',
    type: 'blog',
    content: 'post this by drowsy!'
};
```

### Run it

```typescript
(async () => {
    const wp = await drowsy.launch(config);
    await wp.login();
    await wp.post(newpost);
    await wp.close();
})();
```
