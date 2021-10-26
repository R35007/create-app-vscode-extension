import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "python",
    href: "https://www.python.org/",
    description: "https://www.python.org/"
  },
  {
    label: "Django",
    command: "python -m pip install Django",
    description: "Click here to install Django globally"
  }
]

const additionalCommands: Tags[] = [
  {
    label: "django-admin startproject",
    command: "django-admin startproject",
    description: "Click here to create the django app using cli prompts"
  },
  {
    label: "check cli version",
    command: "django-admin --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "django-admin startproject --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://www.djangoproject.com/">Home Page</a>`,
  `<a href="https://www.djangoproject.com/start/">Getting Started</a>`,
  `<a href="https://docs.djangoproject.com/en/3.2/intro/tutorial01/">Tutorial</a>`,
]

const tags = [
  "django",
  "python",
  "framework",
  "frontend",
  "pythonwebapp",
  "ui",
  "web",
  "webapp"
]


const angular: AppProps = {
  appName: AppName.DJANGO,
  fieldProps: FieldProps.django,
  description: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design",
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/django.png",
  scriptPath: ['media', 'scripts', 'django.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default angular;
