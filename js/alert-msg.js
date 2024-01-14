export default function showAlertMsg(msg, type, duration = 3000) {
  const alert = document.getElementById('alert');
  const alertContent = document.getElementById('alertContent');
  const closeAlert = document.getElementById('closeAlert');
  alertContent.textContent = msg;
  if (type === ALERT_TYPE.INFO) {
    styleElement(alert, '#a8a8ff', '#0000ff')
  }
  if (type === ALERT_TYPE.SUCCESS) {
    styleElement(alert, '#9fff9f', '#008000')
  }
  if (type === ALERT_TYPE.DANGER) {
    styleElement(alert, '#ffb2b2', '#b22222')
  }
  alert.style.display = 'block';
  closeAlert.addEventListener('click', () => {
    alert.style.display = 'none'
  })
}

function styleElement(el, bgColor, borderColor) {
  el.style.backgroundColor = bgColor;
  el.style.border = `1px solid ${borderColor}`;
}

export const ALERT_TYPE = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  DANGER: 'DANGER'
})
