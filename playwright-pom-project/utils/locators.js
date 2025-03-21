const LOCATORS = {
    LOGIN: {
      USERNAME_INPUT: "//input[@id='email-input']",
      PASSWORD_INPUT: "//input[@id='password-input']",
      LOGIN_BUTTON: "//button[text()='Login']",
      ERROR_MESSAGE:"//p[text()='Invalid email or password. Try again.']",
      DEMO_HEADER:"//h2[text()='Demo Login Form']",
      EMAIL_LABEL:"//label[text()='Email']",
      PASSWORD_LABEL:"//label[text()='Password']",
      
    },
    HOME_PAGE: {
      COUNTER_VALUE: "//h2[text()='Counter']/following-sibling::p",
      PLUS_BUTTON: "//button[text()='+']",
      MINUS_BUTTON: "//button[text()='-']",
      RESET_BUTTON: "//button[text()='Reset']",
      LOGOUT_BUTTON: "//button[text()='Logout']",
      COUNTER:"//h2[text()='Counter']",
      HOME_HEADER:"//h1[text()='Home']"
    }
  };
  export default LOCATORS;