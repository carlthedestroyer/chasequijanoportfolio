// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE PREVIEW PROTECTION
//
// TO REMOVE FOR PUBLIC LAUNCH:
//   1. Delete this file (auth.js)
//   2. Delete login.html
//   3. Remove the ONE script tag from every HTML page:
//        <script src="/auth.js"></script>   ← in root pages
//        <script src="../auth.js"></script> ← in projects/ pages
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  // ── CREDENTIALS ── change these to whatever you want ──────────────────────
  var USERNAME = 'chasequijano';
  var PASSWORD = 'Stuart27!!!';
  // ──────────────────────────────────────────────────────────────────────────

  var SESSION_KEY = 'cq_preview_auth';
  var SESSION_VAL = 'granted';

  // Always expose login function — login.html calls this on form submit
  window.__cqLogin = function (user, pass) {
    if (user === USERNAME && pass === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, SESSION_VAL);
      var dest = sessionStorage.getItem('cq_return') || '/';
      sessionStorage.removeItem('cq_return');
      location.replace(dest);
      return true;
    }
    return false;
  };

  // Guard logic — skip on the login page itself
  var isLoginPage = /\/login\.html$/.test(location.pathname) ||
                    location.pathname === '/login';

  if (isLoginPage) return;

  // Hide the document immediately to prevent a flash of protected content
  document.documentElement.style.visibility = 'hidden';

  if (sessionStorage.getItem(SESSION_KEY) === SESSION_VAL) {
    document.documentElement.style.visibility = '';
  } else {
    sessionStorage.setItem('cq_return', location.href);
    location.replace('/login.html');
  }
}());
