import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export default function ContactPage() {
  const [form, setForm] = useState({ adSoyad: '', telefon: '', mesaj: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.mesaj) {
      setStatus('error');
      setErrorMsg('Birşeyler yazın.');
      return;
    }
    if (form.mesaj.length < 10) {
      setStatus('error');
      setErrorMsg('Yazdıklarınız çok kısa.');
      return;
    }

    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setForm({ adSoyad: '', telefon: '', mesaj: '' });
    }, 1500);
  };

  return (
    <>
      {/* Contact Form Section */}
      <Box sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#458cb9',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                mb: 1,
              }}
            >
              İletişim Formu
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 3,
                backgroundColor: '#458cb9',
                mx: 'auto',
                mb: 2,
                borderRadius: 2,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2d3e50', mb: 2 }}>
              Bir sorununuz mu var?
            </Typography>
            <Typography variant="body1" sx={{ color: '#777' }}>
              Platform hakkında eleştirilerinizi, aklınıza takılan soruları, değişmesini veya
              eklenmesini istediğiniz özellikleri bizlere yazabilirsiniz.
            </Typography>
          </Box>

          {status === 'success' ? (
            <Alert
              severity="success"
              sx={{ borderRadius: 2, fontSize: '1rem', justifyContent: 'center' }}
            >
              Mesajınız iletildi. Teşekkür ederiz!
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  name="adSoyad"
                  label="Ad Soyad"
                  value={form.adSoyad}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="medium"
                />
                <TextField
                  name="telefon"
                  label="Telefon Numaranız"
                  value={form.telefon}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="medium"
                />
              </Box>

              <TextField
                name="mesaj"
                label="Mesajınız"
                value={form.mesaj}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              {status === 'error' && (
                <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
                  {errorMsg}
                </Alert>
              )}

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                  disabled={status === 'sending'}
                  sx={{
                    backgroundColor: '#458cb9',
                    px: 5,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 6,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#2d6a8e' },
                  }}
                >
                  {status === 'sending' ? 'İletiliyor...' : 'Mesajı İlet'}
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Social / Contact Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#458cb9',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                mb: 1,
              }}
            >
              Bize Ulaşın
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 3,
                backgroundColor: '#458cb9',
                mx: 'auto',
                mb: 2,
                borderRadius: 2,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2d3e50' }}>
              Bir tık uzağınızdayız
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, sm: 4 },
              flexWrap: 'wrap',
            }}
          >
            {/* Facebook */}
            <Paper
              component="a"
              href="https://www.facebook.com/ofrehberi"
              target="_blank"
              rel="noopener noreferrer"
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 3,
                borderRadius: 3,
                textDecoration: 'none',
                color: '#3b5998',
                width: 140,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                },
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: '#3b5998',
                  color: '#fff',
                  width: 56,
                  height: 56,
                  '&:hover': { backgroundColor: '#2d4373' },
                }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Facebook
              </Typography>
            </Paper>

            {/* Instagram */}
            <Paper
              component="a"
              href="https://www.instagram.com/ofrehberi"
              target="_blank"
              rel="noopener noreferrer"
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 3,
                borderRadius: 3,
                textDecoration: 'none',
                color: '#e1306c',
                width: 140,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                },
              }}
            >
              <IconButton
                sx={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: '#fff',
                  width: 56,
                  height: 56,
                  '&:hover': { opacity: 0.9 },
                }}
              >
                <InstagramIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Instagram
              </Typography>
            </Paper>

            {/* Email */}
            <Paper
              component="a"
              href="mailto:info@ofrehberi.com"
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 3,
                borderRadius: 3,
                textDecoration: 'none',
                color: '#458cb9',
                width: 140,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                },
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: '#458cb9',
                  color: '#fff',
                  width: 56,
                  height: 56,
                  '&:hover': { backgroundColor: '#2d6a8e' },
                }}
              >
                <EmailIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Mail Gönder
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
