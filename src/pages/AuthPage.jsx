import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { loginWithFirebase, registerWithFirebase } from '../firebase';
import { firebaseLogin } from '../api/authService';
import { storeUser } from '../utils/authStorage';

function getAuthErrorMessage(error) {
  if (error?.code === 'auth/invalid-credential') {
    return 'Mail adresi veya şifre hatalı. Kullanıcı Firebase Authentication içinde kayıtlı mı kontrol edin.';
  }

  if (error?.code?.startsWith('auth/')) {
    return error.message;
  }

  if (error?.message === 'Network Error') {
    return 'Backend API bağlantısı kurulamadı. Backend çalışıyor mu ve CORS izinleri doğru mu?';
  }

  return error?.message || 'Giriş işlemi tamamlanamadı.';
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ fullName: '', email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendTokenToBackend = async (idToken) => {
    return firebaseLogin(idToken);
  };

  const submit = async (path, payload) => {
    setLoading(true);
    setStatus(null);
    try {
      const idToken = path === 'register'
        ? await registerWithFirebase(payload)
        : await loginWithFirebase(payload);
      const user = await sendTokenToBackend(idToken);
      storeUser(user);
      navigate('/kullanici-paneli');
    } catch (error) {
      setStatus({ severity: 'error', text: getAuthErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '75vh', py: 5 }}>
      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ p: 3, backgroundColor: '#2d3e50' }}>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
              Kullanıcı Girişi
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
              Yorum yazmak ve geçmiş yorumlarınızı yönetmek için giriş yapın
            </Typography>
          </Box>

          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
            <Tab icon={<LoginIcon />} iconPosition="start" label="Giriş" />
            <Tab icon={<PersonAddIcon />} iconPosition="start" label="Kayıt Ol" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {status && <Alert severity={status.severity} sx={{ mb: 2 }}>{status.text}</Alert>}

            {tab === 0 ? (
              <Box component="form" onSubmit={(event) => { event.preventDefault(); submit('login', loginForm); }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth required label="Mail adresi" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth required type="password" label="Şifre" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" startIcon={<LoginIcon />} disabled={loading} sx={{ mt: 2, backgroundColor: '#7f1810' }}>
                  Giriş Yap
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={(event) => { event.preventDefault(); submit('register', registerForm); }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth required label="Ad soyad" value={registerForm.fullName} onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth required label="Mail adresi" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth required type="password" label="Şifre" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" startIcon={<PersonAddIcon />} disabled={loading} sx={{ mt: 2, backgroundColor: '#458cb9' }}>
                  Kayıt Ol
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
