const AUTH_SERVER = {
  DEV: 'https://gtlandmark.demo.orderstack.io/gtlandmark-auth-dev/api/',
  QA: '',
  UAT: '',
  PROD: '',
};

const BSNS_SERVER = {
  DEV: 'https://gtlandmark.demo.orderstack.io/gtlandmark-business-dev/api/',
  QA: '',
  UAT: '',
  PROD: '',
};

/*CHANGE HERE */
const BSNSSERVICE = BSNS_SERVER.DEV;
const AUTHSERVICE = AUTH_SERVER.DEV;
/********** */

const CONTROLLERS = {
  AUTH: 'Auth/',
  DASHBOARD :'DashBoard/',
  TASK:'Task/',
  USER:'User/',
  COMMUNICATION :'Communication/'
  
};
const AUTH_SERVICE = AUTHSERVICE + CONTROLLERS.AUTH;
const FORGETPASSWORD_REQUEST = AUTHSERVICE + CONTROLLERS.COMMUNICATION
const FACILITY_SERVICE = BSNSSERVICE + CONTROLLERS.DASHBOARD
const FACILITY_SERVICE_TASK = BSNSSERVICE + CONTROLLERS.TASK
const FACILITY_SERVICE_USER = BSNSSERVICE + CONTROLLERS.USER


export const AUTH_ENDPOINTS = {
  AUTHENTICATE_USER: AUTH_SERVICE + 'AuthenticateUser',
  REFRESH_TOKEN: AUTH_SERVICE + 'RefreshToken',
  FORGET_REQUEST : FORGETPASSWORD_REQUEST + `ChangePasswordRequest`,
  VERIFY_OTP : FORGETPASSWORD_REQUEST + 'VerifyResetPasswordCode'
  
};
export const BUSINESS_ENDPOINTS = {
  GETKEYVALUE : FACILITY_SERVICE + 'KpiValues',
  GETALLPENDINGTASK : FACILITY_SERVICE_TASK + 'GetAllPendingTask',
  GETALLUSER : FACILITY_SERVICE_USER +'GetAllUsers'
}
