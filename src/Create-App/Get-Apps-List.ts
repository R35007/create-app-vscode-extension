import fs from "fs";
import path from "path";
import { Settings } from '../Settings';
import { getFilesList } from '../getFiles';
import { AppProps } from '../modal';

const getAppsListFromPath = (appPath: string) => {
    const files = getFilesList(appPath);
    return files.filter(file => file.extension === ".json").reduce((result: Array<AppProps>, file) => {
        try {
            const json = JSON.parse(fs.readFileSync(file.filePath, 'utf-8'));
            if (Array.isArray(json)) return [...result, ...json];
            if (json && typeof json === 'object' && !Array.isArray(json)) return [...result, json];
            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }, []);
};

export const getAppsList = () => {
    const defaultAppsList = getAppsListFromPath(path.resolve(__dirname, "../apps"));
    const customAppsList = getAppsListFromPath(Settings.customAppPath);
    const appsList = [...Settings.customApps, ...customAppsList, ...defaultAppsList];

    const appNames: string[] = [];
    const distinctApps = appsList.map((app) => {
        if (appNames.includes(app.appName)) return;
        appNames.push(app.appName);
        app.fields = Object.fromEntries(Object.entries(app.fields || {}).filter(([, fieldProps]) => !fieldProps.hide));
        return app;
    }).filter(Boolean) as AppProps[];

    return distinctApps.filter(app => !app.hide);
};
