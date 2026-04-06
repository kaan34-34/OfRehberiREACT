import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Anasayfa', path: '/' },
  { label: 'En İyi 10 Yer', path: '/top10' },
  { label: 'Bize Ulaşın', path: '/bize-ulasin' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 70 } }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7f1810, #933933)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  OF
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    '& span': { color: '#7f1810' },
                  }}
                >
                  Of <span>Rehberi</span>
                </Typography>
              </Box>
            </Link>

            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? '#7f1810' : '#555',
                      fontWeight: location.pathname === item.path ? 700 : 400,
                      borderBottom: location.pathname === item.path ? '2px solid #7f1810' : '2px solid transparent',
                      borderRadius: 0,
                      px: 2,
                      '&:hover': {
                        color: '#7f1810',
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid #7f1810',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            ) : (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: '#333' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 260, backgroundColor: '#2d3e50' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 70 } }} />
    </>
  );
}
