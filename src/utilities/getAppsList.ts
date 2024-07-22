import fs from 'fs';
import path from 'path';
import { Settings } from '../Settings';
import { AppProps, FieldProps, FieldType } from '../modal';
import { getFilesList } from './getFiles';
import mergeDeep from './mergeDeep';

const getAppsListFromPath = (appPath: string) => {
  const files = getFilesList(appPath);
  return files
    .filter((file) => file.extension === '.json')
    .reduce((result: Array<AppProps>, file) => {
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

export const getAppsAndGroups = () => {
  const defaultAppsList = getAppsListFromPath(path.resolve(__dirname, '../apps'));
  const customAppsList = ([] as string[]).concat(Settings.customAppPaths).map(getAppsListFromPath).flat();
  const appsList = [...defaultAppsList, ...customAppsList, ...Settings.customApps];

  const distinctApps = appsList.reduce((res: AppProps[], app) => {
    const existingAppIndex = res.findIndex((resApp) => resApp.appName === app.appName);
    if (existingAppIndex < 0) return [...res, app];
    res[existingAppIndex] = mergeDeep(res[existingAppIndex], app) as AppProps;
    return res;
  }, [] as AppProps[]);

  const sanitizedApps = distinctApps.map((app, index) => {
    app.tags = [...new Set(([] as string[]).concat(app.tags || [], app.appName, app.groupNames))]
      .filter(Boolean)
      .map((tag) => tag.toLowerCase());
    app.order = app.order ?? index + 1;

    app.groupNames = [...new Set(([] as string[]).concat(app.groupNames || app.appName))].filter(Boolean);
    app.relatedAppNames = [...new Set(([] as string[]).concat(app.relatedAppNames || []))].filter(Boolean);

    const fieldEntries = Object.entries(app.fields || {})
      .filter(([, fieldProps]) => !fieldProps.hide)
      .map(([key, fieldProps], index) => [
        key,
        {
          ...fieldProps,
          order: fieldProps.order ?? index + 1,
          type: fieldProps.type || FieldType.TEXTBOX
        } as FieldProps
      ]);

    app.fields = Object.fromEntries(fieldEntries);

    return app;
  });

  const sortedApps = sanitizedApps.sort((a, b) => (a!.order! > b!.order! ? 1 : -1));

  const shownApps = sortedApps.filter(
    (app) =>
      !(
        app.hide ||
        Settings.hiddenAppNames.includes(app.appName) ||
        app.groupNames.every((groupName) => Settings.hiddenGroupNames.includes(groupName))
      )
  );

  const groupNames = [...new Set(shownApps.map((app) => app.groupNames).flat())].filter(
    (groupName) => !Settings.hiddenGroupNames.includes(groupName)
  );

  return {
    appsList: shownApps,
    groupNames
  };
};
