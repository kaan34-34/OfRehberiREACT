import { Box, Typography, Container, Grid } from '@mui/material';
import BusinessCard from './BusinessCard';
import { businesses } from '../data/mockData';

export default function FeaturedSection() {
  const featured = businesses.filter((b) => b.isFeatured);

  if (featured.length === 0) return null;

  return (
    <Box
      sx={{
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1580834341580-8c17a3a630c1?w=1600&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#333',
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: 60,
              height: 3,
              backgroundColor: '#d6a64c',
              margin: '12px auto 0',
              borderRadius: 2,
            },
          }}
        >
          Öne Çıkanlar
        </Typography>

        <Grid container spacing={3}>
          {featured.map((biz) => (
            <Grid key={biz.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <BusinessCard business={biz} compact />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
