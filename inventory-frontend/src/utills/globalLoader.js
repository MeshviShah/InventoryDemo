let showLoaderCallback = () => {};
let hideLoaderCallback = () => {};

export const registerLoader = ({ show, hide }) => {
  showLoaderCallback = show;
  hideLoaderCallback = hide;
};

export const showLoader = () => showLoaderCallback();
export const hideLoader = () => hideLoaderCallback();
