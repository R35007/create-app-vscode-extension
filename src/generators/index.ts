import { Settings } from '../Settings';
import { AppProps } from '../modal';

export const generateAppNameListItems = (appsList: AppProps[], selectedApp?: AppProps, filterValue: string = ''): string[] => {
  return appsList.map((app) => {
    const isSelected = app.appName === selectedApp?.appName;
    const isHidden = filterValue && !app.tags?.some((tag) => tag.includes(filterValue));

    const icon = Settings.shouldShowAppIcons
      ? /* html */ `
          <div class="col-3 text-center thumbnail p-2">
            <img src="${app.logoPath || 'https://raw.githubusercontent.com/R35007/create-app-support/version_5.1.0/images/ca-logo.png'}" />
          </div>`
      : '';

    return /* html */ `
        <li 
          data-switch-group="${!isSelected ? app.appName : ''}" 
          data-switch-app="${!isSelected ? app.appName : ''}" 
          title="${app.description}" 
          role="${isSelected ? '' : 'button'}" 
          class="row g-0 app-card ${isSelected ? 'selected' : ''}"
          style="order: ${app.order}; display: ${isHidden ? 'none' : 'flex'};" 
        >
          ${icon}
          <div class="tags d-none">${app.tags?.join(',')}</div>
          <div class="col app-title p-2">${app.appName}</div>
        </li>
      `;
  });
};

export const generateGroupNameListItems = (
  appsList: AppProps[],
  groupNames: string[],
  selectedGroup?: string,
  filterValue: string = ''
): string[] => {
  return groupNames.map((groupName) => {
    const appsByGroup = appsList.filter((app) => app.groupNames.includes(groupName));
    const app = appsByGroup[0] as AppProps;
    const isSelected = groupName === selectedGroup;
    const groupTags = appsList
      .filter((app) => app.groupNames.includes(groupName))
      .map((app) => app.tags || [])
      .flat();
    const isHidden = filterValue && !groupTags?.some((tag) => tag.includes(filterValue));

    const icon = Settings.shouldShowAppIcons
      ? /* html */ `
          <div class="col-3 text-center thumbnail p-2">
            <img loading="lazy" src="${app.logoPath || 'https://raw.githubusercontent.com/R35007/create-app-support/version_5.1.0/images/ca-logo.png'}" />
          </div>`
      : '';

    return /* html */ `
        <li 
          data-switch-group="${!isSelected ? groupName : ''}" 
          data-switch-app="${!isSelected ? app.appName : ''}" 
          title="${groupName} - ${appsByGroup.length}" 
          role="${!isSelected ? 'button' : ''}" 
          class="row g-0 app-card ${isSelected ? 'selected' : ''}"
          style="order: ${app.order}; display: ${isHidden ? 'none' : 'flex'};"
        >
          ${icon}
          <div class="tags d-none">${groupTags?.join(',')}</div>
          <div class="col app-title p-2">${groupName}</div>
        </li>
      `;
  });
};

export const generateAppButtonsByGroupName = (appsList: AppProps[], selectedApp: AppProps, selectedGroup: string): string[] => {
  if (!Settings.shouldGroupApps)
    return [
      /* html */ `
      <div 
        style="order: ${selectedApp.order}; display: inline-block; padding: var(--button-padding-vertical) var(--button-padding-horizontal)" 
        class="app-card selected"
      >
        ${selectedApp.appName}
      </div>`
    ];

  return appsList
    .filter((app) => app.groupNames.includes(selectedGroup))
    .map((app) => {
      const isSelected = selectedApp.appName === app.appName;
      if (isSelected)
        return /* html */ `
          <div 
            style="order: ${app.order}; display: inline-block; padding: var(--button-padding-vertical) var(--button-padding-horizontal)" 
            class="app-card selected"
          >
              ${app.appName}
          </div>`;

      return /* html */ `
        <vscode-button 
          style="order: ${app.order}" 
          data-switch-app="${app.appName}"
          data-switch-group="${selectedGroup}"
          appearance=${isSelected ? 'primary' : 'secondary'}
        >
            ${app.appName}
        </vscode-button>`;
    });
};

export const generateAppListDropdown = (appsList: AppProps[], selectedApp: AppProps): string[] =>
  appsList.map(
    (app) => /* html */ `
    <vscode-option 
      data-switch-group=${selectedApp.groupNames[0]} 
      ${app.appName === selectedApp.appName && 'selected'} 
      value="${app.appName || ''}">${app.appName}</vscode-option>`
  );

export const generateInfoContainers = (appsList: AppProps[], selectedApp: AppProps, _selectedGroup: string) => {
  const prerequisites =
    selectedApp.prerequisites
      ?.map((p) => {
        if (p.href) return /* html */ `<a title="${p.description}" href="${p.href}" class="tag anchor-tag">${p.label}</a>`;
        return /* html */ `<span title="${p.description}" data-command="${p.command}" class="tag command-tag">${p.label}</span>`;
      })
      .join('') || '';

  const additionalCommands =
    selectedApp.additionalCommands
      ?.map((ac) => /* html */ `<span title="${ac.description}" data-command="${ac.command}" class="tag command-tag">${ac.label}</span>`)
      .join('') || '';

  const relatedApps =
    selectedApp.relatedAppNames
      ?.filter((relativeAppName: string) => appsList.some((app) => app.appName === relativeAppName))
      .map(
        (relativeApp: string) => /* html */ `
    <span 
        data-switch-app="${relativeApp}"
        data-switch-group="${appsList.find((app) => app.appName === relativeApp)?.groupNames[0]}"
        title="${relativeApp}" 
        class="tag"
    >${relativeApp}</span>`
      )
      .join('') || '';

  const resources =
    selectedApp.resources
      ?.map((resource) => `<div><a href='${resource.href}' title='${resource.description || resource.href}'>${resource.label}</a></div>`)
      .join('') || '';

  const aboutSection = selectedApp.description?.length
    ? /* html */ `
    <div class="about-container">
        <h5 class="my-3">About</h5>
        <div class="about-content my-3">
        ${selectedApp.description}
        </div>
    </div>`
    : '';

  const prerequisitesSection = selectedApp.prerequisites?.length
    ? /* html */ `
    <div class="prerequisites-container">
        <h5 class="my-3">Prerequisites</h5>
        <div class="prerequisites-content my-3">
        ${prerequisites}
        </div>
    </div>`
    : '';

  const additionCommandsSection = selectedApp.additionalCommands?.length
    ? /* html */ `
    <div class="additional-commands-container">
        <h5 class="my-3">Additional Commands</h5>
        <div class="additional-commands-content my-3">
        ${additionalCommands}
        </div>
    </div>`
    : '';

  const relatedAppsSection = relatedApps?.length
    ? /* html */ `
    <div class="additional-commands-container">
        <h5 class="my-3">Related Apps</h5>
        <div class="additional-commands-content my-3">
        ${relatedApps}
        </div>
    </div>`
    : '';

  const resourcesSection = selectedApp.resources?.length
    ? /* html */ `
    <div class="resources-container">
        <h5 class="my-3">Resources</h5>
        <div class="resources-content my-3">
        ${resources}
        </div>
    </div>`
    : '';

  const infoContainers = [aboutSection, prerequisitesSection, additionCommandsSection, relatedAppsSection, resourcesSection]
    .filter(Boolean)
    .join('<vscode-divider></vscode-divider>');

  return infoContainers;
};

export const getLoaderStyle = (nonce: string) => /* css */ `<style nonce="${nonce}">
.hide-loader{
  display: none !important;
}

.loader{
  background: var(--vscode-editor-background);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;
}

.loader-text{
  font-size: 26px;
  opacity: 0.8;
  animation: blink 0.5s linear infinite alternate;
  position: absolute;
  top: 35%;
  text-align: center;
  width: 100%;
}

@keyframes blink {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}

</style>`;
