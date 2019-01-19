import puppeteer from "puppeteer";
import selectors from "./selectors";
import { Browser, Config, Post } from "./type";

// Launch and return Browser

const launch = async ({ wp, LaunchOptions }: Config): Promise<Browser> => {

    wp.admin = `${wp.url}/wp-admin`;
    const browser = await puppeteer.launch(LaunchOptions) as Browser;
    const mainPage = await browser.newPage();

    // Login with config

    browser.login = async (withNewPage?: boolean) => {
        const page = withNewPage ? await browser.newPage() : mainPage;
        await page.goto(wp.admin as string, { waitUntil: "networkidle2" });
        await page.type("#user_login", wp.user);
        await page.type("#user_pass", wp.password);
        await page.click("#wp-submit");
        await page.waitForNavigation({ waitUntil: "networkidle2" });

        if (withNewPage) {
            await page.close();
        }
    };

    // Post Content

    browser.post = async (post: Post, withNewPage?: boolean) => {

        const url = post.type === "blog"
            ? `${wp.admin}/post-new.php`
            : `${wp.admin}/post-new.php?post_type=${post.type}`;

        const selector = selectors.ver[wp.ver];

        const page = withNewPage ? await browser.newPage() : mainPage;
        await page.goto(url, { waitUntil: "networkidle2" });
        await page.type(selector.title, post.title);
        await page.type(selector.content, post.content);
        await page.click(selector.submit);

        if (selector.confirm) {
            await page.waitFor(200);
            await page.click(selector.confirm);
        }

        await page.waitForNavigation({ waitUntil: "networkidle2" });

        if (withNewPage) {
            await page.close();
        }
    };

    return browser;
};
export  {
    launch,
};
