import angular from "./apps/angular.json";
import react from "./apps/react.json";
import viteExtra from "./apps/vite-extra.json";
import vite from "./apps/vite.json";
import vsCodeExtension from "./apps/vsCodeExtension.json";
import vue from "./apps/vue.json";

const getApps = () => [vite, viteExtra, react, angular, vue, vsCodeExtension];

export default getApps;
