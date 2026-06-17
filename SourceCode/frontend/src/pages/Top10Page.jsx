import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getBusinesses } from '../api/businessService';
import { isBusinessOpen } from '../utils/businessUtils';

export default function Top10Page() {
  const [businesses, setBusinesses] = useState([]);
  const [callOpen, setCallOpen] = useState(null);
  const [mapOpen, setMapOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getBusinesses()
      .then((data) => active && setBusinesses(data))
      .catch(() => active && setError('Top 10 verisi API üzerinden alınamadı.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const top10 = useMemo(
    () => [...businesses].sort((a, b) => b.totalVotes - a.totalVotes || b.rating - a.rating).slice(0, 10),
    [businesses]
  );

  const activeBusiness = callOpen ? businesses.find((b) => b.id === callOpen) : null;
  const mapBusiness = mapOpen ? businesses.find((b) => b.id === mapOpen) : null;

  return (
    <>
      <Box sx={{ background: 'linear-gradient(135deg, #458cb9 0%, #2d3e50 100%)', py: { xs: 5, md: 7 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <EmojiEventsIcon sx={{ fontSize: 48, color: '#d6a64c', mb: 1 }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>
            En İyi 10 Yer
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Of'un en çok beğenilen ve oy alan firmalarını keşfedin
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#f5f5f5', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="md">
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            top10.map((biz, idx) => {
              const rank = idx + 1;
              const open = isBusinessOpen(biz);
              const statusColor = biz.is724 ? '#458cb9' : open ? '#458cb9' : '#933933';
              const statusText = biz.is724 ? 'AÇIK' : open ? `AÇIK (${biz.closeTime}'a kadar)` : 'KAPALI';

              return (
                <Card key={biz.id} elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' } }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box component={Link} to={`/company/${biz.slug}`} sx={{ position: 'relative', width: { xs: '100%', md: 260 }, minHeight: { xs: 200, md: 200 }, flexShrink: 0, display: 'block' }}>
                      <CardMedia component="img" image={biz.image} alt={biz.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', position: { md: 'absolute' }, top: 0, left: 0 }} />
                      <Chip label={statusText} size="small" sx={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: statusColor, color: '#fff', fontWeight: 700, fontSize: '0.7rem', height: 26 }} />
                      <Box sx={{ position: 'absolute', top: 10, left: 10, width: 36, height: 36, borderRadius: '50%', backgroundColor: rank === 1 ? '#d6a64c' : rank === 2 ? '#95a5a6' : rank === 3 ? '#cd7f32' : 'rgba(45,62,80,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{rank}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1, p: { xs: 2, md: 2.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography component={Link} to={`/company/${biz.slug}`} variant="h6" sx={{ fontWeight: 700, color: '#333', textDecoration: 'none', mb: 0.5, '&:hover': { color: '#7f1810' } }}>
                        {biz.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', fontWeight: 600, mb: 0.5 }}>
                        {biz.categoryName} / {biz.subCategoryName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <Rating value={Number(biz.rating)} precision={0.5} size="small" readOnly />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#555' }}>({biz.rating})</Typography>
                        <Typography variant="caption" sx={{ color: '#888' }}>{biz.totalVotes} Oy</Typography>
                      </Box>
                      {biz.slogan && <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic', fontSize: '0.85rem', mb: 1 }}>{biz.slogan}</Typography>}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {biz.hasDelivery && <Chip size="small" icon={<TwoWheelerIcon />} label="Eve Sipariş" />}
                        {biz.acceptsCard && <Chip size="small" label="Kart Geçerli" />}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 1, p: 2, justifyContent: 'center', alignItems: 'stretch' }}>
                      <Button variant="contained" startIcon={<PhoneAndroidIcon />} onClick={() => setCallOpen(biz.id)} sx={{ backgroundColor: '#458cb9' }}>ARA</Button>
                      <Button variant="outlined" startIcon={<MapIcon />} onClick={() => setMapOpen(biz.id)} sx={{ borderColor: '#d6a64c', color: '#d6a64c' }}>HARİTA</Button>
                    </Box>
                  </Box>
                </Card>
              );
            })
          )}
        </Container>
      </Box>

      <Dialog open={!!callOpen} onClose={() => setCallOpen(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{activeBusiness?.name}</Typography>
          <IconButton size="small" onClick={() => setCallOpen(null)}><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <List disablePadding>
            {[activeBusiness?.phone1, activeBusiness?.phone2, activeBusiness?.gsm].filter(Boolean).map((phone) => (
              <ListItem disablePadding key={phone}>
                <ListItemButton component="a" href={`tel:${phone.replace(/\s/g, '')}`} sx={{ borderRadius: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}><CallIcon sx={{ color: '#458cb9' }} /></ListItemIcon>
                  <ListItemText primary={phone} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={!!mapOpen} onClose={() => setMapOpen(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{mapBusiness?.name}</Typography>
          <IconButton size="small" onClick={() => setMapOpen(null)}><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {mapBusiness && (
            <Box component="iframe" src={`https://maps.google.com/maps?q=${encodeURIComponent(mapBusiness.address + ', Of, Trabzon')}&output=embed`} sx={{ width: '100%', height: 350, border: 0 }} allowFullScreen loading="lazy" title={`${mapBusiness.name} harita`} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
