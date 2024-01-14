export { stringToArray, arrayToString, getImgLink, Btn };

function stringToArray(str) {
  return str?.split('/').map((val) => val.trim());
}

function arrayToString(arr) {
  let str = '';
  arr.map((item) => {
    if (arr.indexOf(item) === 0) {
      str = item;
      return;
    }
    str += ', ' + item;
  });
  return str;
}

function getImgLink(link, color) {
  return link.replace('.jpg', `-${color}.jpg`);
}

function Btn(btnID) {
  const btn = document.getElementById(btnID);
  const enable = () => {
    btn.disabled = false;
  };
  const disable = () => {
    btn.disabled = true;
  };
  return {
    enable,
    disable,
  };
}
