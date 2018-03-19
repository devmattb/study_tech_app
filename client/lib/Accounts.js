/**
*   TODO: Configure Facebook/Google Logins!
**/

if (Meteor.isClient) {

    /***
    *   Form Translations.
    *   Reference link to all attributes:
    *   https://github.com/softwarerero/meteor-accounts-t9n/blob/master/t9n/en.coffee
    **/
    T9n.map('en', {
        'Invalid email': 'Felaktig Email!',
        'Required Field': 'Fältet är ej ifyllt!',
        'usernameOrEmail': "Användarnamn eller Email",
        'passwordAgain': "Bekräfta Lösenord",
        'emailResetLink': "Återställ Lösenord",
        error: {
            accounts: {
                'Login forbidden': 'Vi hittade inget konto med de givna detaljerna!',
                'User not found': 'Vi hittade inget konto med de givna detaljerna!',
                'Incorrect password': 'Felaktigt Lösenord!',
            },
        }
    });
}

/**
*   More Form Translations.
*   Reference link to all attributes:
*   https://github.com/meteor-useraccounts/core/blob/master/Guide.md
**/
AccountsTemplates.configure({
    /**
    *   Behaviour Settings:
    **/
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,  // TODO?
    lowercaseUsername: false,
    focusFirstInput: true,

    /**
    *  Privacy Policy and Terms of Use
    **/
    privacyUrl: '#privacyPolicy', // TODO!
    termsUrl: '#userAgreement',

    /**
    *   Appearance:
    **/
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    /***
    *   Text Settings:
    **/
    texts: {

      /**
      *   General Text Settings:
      **/
      title: {
        changePwd: "Byt Lösenord",
        enrollAccount: "Skriv upp dig",
        forgotPwd: "Återställ Lösenord",
        resetPwd: "Återställ Lösenord",
        signIn: "Logga in",
        signUp: "Skapa konto",
        verifyEmail: "Verifiera Email",
      },

      button: {
        signUp: "Skapa konto!",
        signIn: "Logga in!",
      },

      errors: {
        cannotRemoveService: "Du kan inte inaktivera din enda aktiva tjänst!",
        captchaVerification: "Captcha verifering misslyckades",
        loginForbidden: "Vi hittade inget konto med de givna detaljerna!",
        mustBeLoggedIn: "Du måste vara inloggad!",
        pwdMismatch: "Dina lösenord matchade inte!",
        validationErrors: "Ett fel skedde i valideringen.",
        verifyEmailFirst: "Var god verifiera din email först. Kolla din mail!",
      },

      /**
      *   Advanced Texts Settings:
      **/
      navSignIn: "Logga in",
      navSignOut: "Logga ut",
      optionalField: "valfritt",
      pwdLink_pre: "",
      pwdLink_link: "Har du glömt ditt lösenord?",
      pwdLink_suff: "",
      resendVerificationEmailLink_pre: "Fick du inget verifieringsmail?",
      resendVerificationEmailLink_link: "Skicka igen",
      resendVerificationEmailLink_suff: "",
      sep: "Eller logga in med:",
      signInLink_pre: "Har du redan ett konto?",
      signInLink_link: "Logga in",
      signInLink_suff: "",
      signUpLink_pre: "Har du inget konto?",
      signUpLink_link: "Skapa ett konto",
      signUpLink_suff: "",
      socialAdd: "Koppla",
      socialConfigure: "Lägg till sociala medier för bästa möjliga användarupplevelse.",
      socialSignUp: "",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      inputIcons: {
        isValidating: "fa fa-spinner fa-spin",
        hasSuccess: "fa fa-check",
        hasError: "fa fa-times",
      },
      socialRemove: "Ta bort",
      socialSignIn: "",
      socialSignUp: "",
      socialWith: "",
      termsPreamble: "Genom att skapa ett konto, accepterar du vår",
      termsPrivacy: "Integritetspolicy",
      termsAnd: "och",
      termsTerms: "Användarvillkor",
    }
});

/**
*   Add fields to the sign in page:
**/
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Användarnamn",
      required: true,
      minLength: 4,
      icon: "prefixIcon fa fa-user-circle-o prefix",
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Felaktig Email!',
  },
  {
      _id: "password",
      type: "password",
      displayName: "Lösenord",
      required: true,
      minLength: 3,
  },
]);
