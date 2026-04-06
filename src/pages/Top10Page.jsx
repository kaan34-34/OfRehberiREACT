import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  Chip,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { businesses, categories, businessDetails } from '../data/mockData';
import { isBusinessOpen } from '../utils/businessUtils';

// Sort: totalVotes DESC, rating DESC — top 10
const top10 = [...businesses]
  .sort((a, b) => b.totalVotes - a.totalVotes || b.rating - a.rating)
  .slice(0, 10);

export default function Top10Page() {
  const [callOpen, setCallOpen] = useState(null); // business id
  const [mapOpen, setMapOpen] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCallOpen = (id) => setCallOpen(id);
  const handleCallClose = () => setCallOpen(null);
  const handleMapOpen = (id) => setMapOpen(id);
  const handleMapClose = () => setMapOpen(null);

  const activeBusiness = callOpen ? businesses.find((b) => b.id === callOpen) : null;
  const mapBusiness = mapOpen ? businesses.find((b) => b.id === mapOpen) : null;
  const mapDetail = mapOpen ? businessDetails[mapOpen] || {} : {};

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #458cb9 0%, #2d3e50 100%)',
          py: { xs: 5, md: 7 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <EmojiEventsIcon sx={{ fontSize: 48, color: '#d6a64c', mb: 1 }} />
          <Typography
            variant="h4"
            sx={{ color: '#fff', fontWeight: 800, mb: 1 }}
          >
            En İyi 10 Yer
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Of'un en çok beğenilen ve oy alan firmalarını keşfedin
          </Typography>
        </Container>
      </Box>

      {/* List */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="md">
          {top10.map((biz, idx) => {
            const rank = idx + 1;
            const detail = businessDetails[biz.id] || {};
            const cat = categories.find((c) => c.id === biz.categoryId);

            const open = isBusinessOpen(biz);

            const statusColor = biz.is724
              ? '#458cb9'
              : open
              ? '#458cb9'
              : '#933933';

            const statusText = biz.is724
              ? 'AÇIK'
              : open
              ? `AÇIK (${biz.closeTime}'a kadar)`
              : 'KAPALI';

            return (
              <Card
                key={biz.id}
                elevation={2}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  {/* Image */}
                  <Box
                    component={Link}
                    to={`/company/${biz.slug}`}
                    sx={{
                      position: 'relative',
                      width: { xs: '100%', md: 260 },
                      minHeight: { xs: 200, md: 200 },
                      flexShrink: 0,
                      display: 'block',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={biz.image}
                      alt={biz.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: { md: 'absolute' },
                        top: 0,
                        left: 0,
                      }}
                    />
                    {/* Status badge */}
                    <Chip
                      label={statusText}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        backgroundColor: statusColor,
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 26,
                      }}
                    />
                    {/* Rank badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor:
                          rank === 1
                            ? '#d6a64c'
                            : rank === 2
                            ? '#95a5a6'
                            : rank === 3
                            ? '#cd7f32'
                            : 'rgba(45,62,80,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                        }}
                      >
                        {rank}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Middle - Info */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2, md: 2.5 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      component={Link}
                      to={`/company/${biz.slug}`}
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#333',
                        textDecoration: 'none',
                        mb: 0.5,
                        '&:hover': { color: '#7f1810' },
                      }}
                    >
                      {biz.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: '#555', fontWeight: 600, mb: 0.5 }}
                    >
                      {cat?.name || detail.categoryName} / {biz.subCategoryName}
                    </Typography>

                    {/* Rating */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <Rating
                        value={biz.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#555' }}
                      >
                        ({biz.rating})
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888' }}>
                        {biz.totalVotes} Oy
                      </Typography>
                    </Box>

                    {/* Slogan */}
                    {biz.slogan && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#777',
                          fontStyle: 'italic',
                          fontSize: '0.85rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {biz.slogan}
                      </Typography>
                    )}

                    {/* Delivery badge */}
                    {biz.hasDelivery && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mt: 1,
                          color: '#458cb9',
                        }}
                      >
                        <TwoWheelerIcon sx={{ fontSize: 16 }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600 }}
                        >
                          Eve Sipariş
                        </Typography>
                      </Box>
                    )}

                    {/* Mobile buttons */}
                    {isMobile && (
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<MapIcon />}
                          onClick={() => handleMapOpen(biz.id)}
                          sx={{
                            flex: 1,
                            backgroundColor: '#d6a64c',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            borderRadius: 5,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#c49540' },
                          }}
                        >
                          HARİTA
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<PhoneIcon />}
                          onClick={() => handleCallOpen(biz.id)}
                          sx={{
                            flex: 1,
                            backgroundColor: '#458cb9',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            borderRadius: 5,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#2d6a8e' },
                          }}
                        >
                          ARA
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {/* Right - Buttons (desktop) */}
                  {!isMobile && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1.5,
                        p: 2.5,
                        borderLeft: '1px solid #eee',
                        width: 150,
                        flexShrink: 0,
                      }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<MapIcon />}
                        onClick={() => handleMapOpen(biz.id)}
                        sx={{
                          backgroundColor: '#d6a64c',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          borderRadius: 5,
                          textTransform: 'none',
                          '&:hover': { backgroundColor: '#c49540' },
                        }}
                      >
                        HARİTA
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PhoneIcon />}
                        onClick={() => handleCallOpen(biz.id)}
                        sx={{
                          backgroundColor: '#458cb9',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          borderRadius: 5,
                          textTransform: 'none',
                          '&:hover': { backgroundColor: '#2d6a8e' },
                        }}
                      >
                        ARA
                      </Button>
                    </Box>
                  )}
                </Box>
              </Card>
            );
          })}
        </Container>
      </Box>

      {/* Call Modal */}
      <Dialog
        open={!!callOpen}
        onClose={handleCallClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {activeBusiness && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 0,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: '#333' }}
                >
                  {activeBusiness.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  Aramak için bir numara seçin
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleCallClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
              <List disablePadding>
                {activeBusiness.phone1 && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={`tel:${activeBusiness.phone1.replace(/\s/g, '')}`}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(69, 140, 185, 0.08)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CallIcon sx={{ color: '#458cb9' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={activeBusiness.phone1}
                        secondary="Sabit Hat"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {activeBusiness.phone2 && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={`tel:${activeBusiness.phone2.replace(/\s/g, '')}`}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(69, 140, 185, 0.08)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CallIcon sx={{ color: '#458cb9' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={activeBusiness.phone2}
                        secondary="Sabit Hat 2"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {activeBusiness.gsm && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={`tel:${activeBusiness.gsm.replace(/\s/g, '')}`}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(69, 140, 185, 0.08)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PhoneAndroidIcon sx={{ color: '#27ae60' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={activeBusiness.gsm}
                        secondary="Cep Telefonu"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Map Modal */}
      <Dialog
        open={!!mapOpen}
        onClose={handleMapClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {mapBusiness && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 1,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: '#333' }}
                >
                  {mapBusiness.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {mapBusiness.address}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleMapClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              {mapDetail.googleMapEmbed ? (
                <Box
                  component="iframe"
                  src={mapDetail.googleMapEmbed}
                  sx={{ width: '100%', height: 350, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${mapBusiness.name} harita`}
                />
              ) : (
                <Box
                  component="iframe"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    mapBusiness.address + ', Of, Trabzon'
                  )}&output=embed`}
                  sx={{ width: '100%', height: 350, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${mapBusiness.name} harita`}
                />
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
