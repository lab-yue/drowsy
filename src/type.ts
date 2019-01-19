import * as puppeteer from "puppeteer";

export interface WPConfig {
    ver: string;
    url: string;
    user: string;
    password: string;
    admin?: string;
}

export interface Config {
    wp: WPConfig;
    LaunchOptions?: puppeteer.LaunchOptions;
    common?: {
        capturesDir?: string,
    };
}

export type PostType = string;

export interface Post {
    type: PostType;
    title: string;
    content: string;
}

export interface Browser extends puppeteer.Browser {
    login(withNewPage?: boolean): Promise<void>;
    post(post: Post, withNewPage?: boolean): Promise<void>;
}

export interface Selector {
    title: string;
    content: string;
    submit: string;
    confirm?: string;
}

export interface SelectorByVersion {
    [version: string]: Selector;
}
