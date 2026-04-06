import { Box, Container, Grid, Typography, TextField, Button, IconButton, Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      alert('E-Bülten kaydınız alınmıştır!');
      setEmail('');
    }
  };

  return (
    <Box component="footer">
      {/* Main Footer */}
      <Box sx={{ backgroundColor: '#2d3e50', color: '#ccc', py: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo & Description */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7f1810, #933933)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  OF
                </Box>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                  Of <span style={{ color: '#6babd3' }}>Rehberi</span>
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#aaa', lineHeight: 1.8 }}>
                Trabzon / Of ilçesi için özel hazırlanmış sitemizde Of'taki tüm firmaları kolaylıkla bulun.
              </Typography>
            </Grid>

            {/* Contact Links */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontSize: '0.95rem', fontWeight: 600 }}>
                Bize Ulaşın
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#6babd3' }} />
                  <MuiLink href="#" underline="hover" sx={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Bize Ulaşın
                  </MuiLink>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FacebookIcon sx={{ fontSize: 18, color: '#3b5998' }} />
                  <MuiLink href="https://www.facebook.com/ofrehberi" target="_blank" underline="hover" sx={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Facebook
                  </MuiLink>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InstagramIcon sx={{ fontSize: 18, color: '#e1306c' }} />
                  <MuiLink href="https://www.instagram.com/ofrehberi" target="_blank" underline="hover" sx={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Instagram
                  </MuiLink>
                </Box>
              </Box>
            </Grid>

            {/* Newsletter */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontSize: '0.95rem', fontWeight: 600 }}>
                Yeni kampanyalardan ve gelişmelerden haberdar olun
              </Typography>
              <Box component="form" onSubmit={handleNewsletter} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="E-Posta adresi"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: 1,
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#6babd3' },
                    },
                    '& input::placeholder': { color: '#999' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#1abc9c',
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    '&:hover': { backgroundColor: '#16a085' },
                  }}
                >
                  e-Bülten kayıt ol
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Box sx={{ backgroundColor: '#1a2a3a', py: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: '#888' }}>
              &copy; {new Date().getFullYear()} Tüm hakları saklıdır. Of Rehberi
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Gizlilik Politikası', 'Hakkımızda', 'Bize Ulaşın', 'S.S.S', 'Firma Ekle'].map((text) => (
                <MuiLink
                  key={text}
                  href="#"
                  underline="hover"
                  sx={{ color: '#6babd3', fontSize: '0.8rem' }}
                >
                  {text}
                </MuiLink>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
