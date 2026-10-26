/* Local-only demo authentication. Do not use real credentials; production needs a secure backend. */
(() => {
  const screen = document.getElementById('authScreen');
  const app = document.querySelector('.app-shell');
  const form = document.getElementById('authForm');
  const nameInput = document.getElementById('authName');
  const emailInput = document.getElementById('authEmail');
  const passwordInput = document.getElementById('authPassword');
  const error = document.getElementById('authError');
  const title = document.getElementById('authTitle');
  const submit = document.getElementById('authSubmit');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  let mode = 'login';
  const readUsers = () => { try { return JSON.parse(localStorage.getItem('cla_demo_users') || '{}'); } catch { return {}; } };
  function setMode(next) {
    mode = next;
    loginTab.classList.toggle('active', mode === 'login');
    registerTab.classList.toggle('active', mode === 'register');
    nameInput.parentElement.querySelector('label[for="authName"]').style.display = mode === 'register' ? '' : 'none';
    nameInput.style.display = mode === 'register' ? '' : 'none';
    title.innerHTML = mode === 'login' ? 'Welcome back<span>.</span>' : 'Create your account<span>.</span>';
    submit.innerHTML = mode === 'login' ? 'Sign in <span>→</span>' : 'Create account <span>→</span>';
    passwordInput.autocomplete = mode === 'login' ? 'current-password' : 'new-password';
    error.textContent = '';
  }
  function unlock(user) {
    localStorage.setItem('cla_demo_session', JSON.stringify({name:user.name,email:user.email}));
    screen.hidden = true; app.classList.remove('auth-locked');
    const avatar = document.getElementById('profileButton');
    if (avatar) { avatar.textContent = (user.name || 'CL').trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase(); avatar.title = 'Signed in as '+user.name+' — click to sign out'; }
  }
  loginTab.addEventListener('click', () => setMode('login'));
  registerTab.addEventListener('click', () => setMode('register'));
  form.addEventListener('submit', (event) => {
    event.preventDefault(); error.textContent = '';
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const users = readUsers();
    if (password.length < 8) { error.textContent = 'Use at least 8 characters for this demo password.'; return; }
    if (mode === 'register') {
      const name = nameInput.value.trim();
      if (!name) { error.textContent = 'Enter your display name.'; return; }
      if (users[email]) { error.textContent = 'An account for this email already exists. Please sign in.'; return; }
      users[email] = {name, password};
      localStorage.setItem('cla_demo_users', JSON.stringify(users));
      unlock({name,email});
    } else {
      const user = users[email];
      if (!user || user.password !== password) { error.textContent = 'Demo account not found or password does not match. Choose Create account first.'; return; }
      unlock({name:user.name,email});
    }
    passwordInput.value = '';
  });
  document.getElementById('profileButton')?.addEventListener('click', () => {
    if (confirm('Sign out of CyberLab Academy?')) { localStorage.removeItem('cla_demo_session'); screen.hidden = false; setMode('login'); passwordInput.value=''; }
  });
  try {
    const session = JSON.parse(localStorage.getItem('cla_demo_session') || 'null');
    if (session && session.email) unlock(session); else { app.classList.add('auth-locked'); setMode('login'); }
  } catch { app.classList.add('auth-locked'); setMode('login'); }
})();
