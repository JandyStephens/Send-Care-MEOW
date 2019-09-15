// Default settings of changeable aspects of the UI
const JQUERY_SELECTOR_ERROR_ENABLED = true;
const SHOW_TRANSITION_DURATION = 'fast';
const SHOW_TRANSITION_EASING = 'swing';
const HIDE_TRANSITION_DURATION = 'fast';
const HIDE_TRANSITION_EASING = 'swing';

// jQuery References to Static HTML Elements that will exist throughout the lifetime of the whole app
ui.add$ToRef('landing-screen', '.landing');
ui.add$ToRef('about-screen', '.about');
ui.add$ToRef('create-package-screen', '.create-package');
ui.add$ToRef('customize-message-screen', '.message-form');
ui.add$ToRef('customize-meme-screen', '.meme-form');
ui.add$ToRef('customize-postmates-screen', '.postmates-form');
ui.add$ToRef('customize-spotify-screen', '.spotify-form');
ui.add$ToRef('customize-preview-screen', '.preview-screen');
ui.add$ToRef('landing-start-button', '.landing-start-button');
