import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Rating,
  Button,
  Divider,
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
  Dialog,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import FaxIcon from '@mui/icons-material/Print';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { businesses, businessDetails } from '../data/mockData';
import { isBusinessOpen } from '../utils/businessUtils';

export default function BusinessDetailPage() {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#7f1810', mb: 2 }}>
          Firma Bulunamadı
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Aradığınız firma bulunamadı veya artık aktif değil.
        </Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />}
          sx={{ backgroundColor: '#7f1810', '&:hover': { backgroundColor: '#5a110b' } }}>
          Anasayfaya Dön
        </Button>
      </Container>
    );
  }

  const detail = businessDetails[business.id] || {};
  const gallery = detail.gallery || [business.image];
  const reviews = detail.reviews || [];

  const isOpen = isBusinessOpen(business);
  const statusColor = business.is724 ? '#458cb9' : isOpen ? '#458cb9' : '#933933';
  const statusText = business.is724
    ? '7/24 AÇIK'
    : isOpen
    ? `AÇIK (${business.closeTime}'a kadar)`
    : 'KAPALI';

  const handleImageClick = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', pb: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', py: 1.5 }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: '#7f1810', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <HomeIcon sx={{ fontSize: 16 }} /> Anasayfa
            </Link>
            <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              {detail.categoryName || 'Firma'}
            </Typography>
            <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {business.name}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* ===== LEFT / MAIN CONTENT ===== */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Photo Gallery */}
            <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
              {/* Main Image */}
              <Box
                sx={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => handleImageClick(0)}
              >
                <Box
                  component="img"
                  src={gallery[0]}
                  alt={`${business.name} fotoğrafı`}
                  sx={{ width: '100%', height: { xs: 240, md: 380 }, objectFit: 'cover', display: 'block' }}
                />
                <Chip
                  label={statusText}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: statusColor,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                />
                {gallery.length > 1 && (
                  <Chip
                    label={`${gallery.length} Fotoğraf`}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              {/* Thumbnail Strip */}
              {gallery.length > 1 && (
                <Box sx={{ display: 'flex', gap: 0.5, p: 1, overflowX: 'auto' }}>
                  {gallery.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt={`${business.name} fotoğrafı ${i + 1}`}
                      onClick={() => handleImageClick(i)}
                      sx={{
                        width: 80,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        opacity: 0.7,
                        transition: 'all 0.2s',
                        '&:hover': { opacity: 1, border: '2px solid #7f1810' },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Paper>

            {/* Business Name & Info */}
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    {business.name}
                  </Typography>
                  {business.slogan && (
                    <Typography variant="body1" sx={{ color: '#888', fontStyle: 'italic', mb: 1.5 }}>
                      {business.slogan}
                    </Typography>
                  )}
                </Box>
                {/* Share */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small" sx={{ color: '#3b5998' }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#1da1f2' }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#666' }}>
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Actions Row */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
                {(business.phone1 || business.gsm) && (
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    onClick={() => {
                      const tel = business.phone1 || business.gsm;
                      window.location.href = `tel:${tel.replace(/\s/g, '')}`;
                    }}
                    sx={{
                      backgroundColor: isOpen || business.is724 ? '#458cb9' : '#6babd3',
                      fontWeight: 700,
                      borderRadius: 25,
                      '&:hover': { backgroundColor: '#2d6a8e' },
                    }}
                  >
                    ARA
                  </Button>
                )}
                {detail.googleMapEmbed && (
                  <Button
                    variant="outlined"
                    startIcon={<MapIcon />}
                    sx={{
                      borderColor: '#d6a64c',
                      color: '#d6a64c',
                      fontWeight: 700,
                      borderRadius: 25,
                      '&:hover': { backgroundColor: 'rgba(214,166,76,0.1)', borderColor: '#d6a64c' },
                    }}
                  >
                    HARİTA
                  </Button>
                )}
              </Box>

              {/* Features Badges */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {business.hasDelivery && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#458cb9' }}>
                    <TwoWheelerIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Eve Sipariş Var</Typography>
                  </Box>
                )}
                {business.is724 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#458cb9' }}>
                    <AccessTimeIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>7/24 Açık</Typography>
                  </Box>
                )}
                {business.acceptsCard && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#458cb9' }}>
                    <CreditCardIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Kart Geçerli</Typography>
                  </Box>
                )}
              </Box>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Rating value={business.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {business.rating} / 5 ({business.totalVotes} oy)
                </Typography>
              </Box>
            </Paper>

            {/* Google Map */}
            {detail.googleMapEmbed && (
              <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                <Box
                  component="iframe"
                  src={detail.googleMapEmbed}
                  sx={{ width: '100%', height: 300, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`${business.name} harita`}
                />
              </Paper>
            )}

            {/* Reviews */}
            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChatBubbleOutlineIcon sx={{ color: '#7f1810' }} />
                YORUMLAR ({reviews.length})
              </Typography>

              {reviews.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#999', py: 2 }}>
                  Henüz yorum yapılmamış. İlk yorumu siz yapın!
                </Typography>
              ) : (
                reviews.map((review, idx) => (
                  <Box key={review.id}>
                    {idx > 0 && <Divider sx={{ my: 2 }} />}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ width: 44, height: 44, backgroundColor: '#458cb9', fontWeight: 700 }}>
                        {review.user.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {review.user}
                          </Typography>
                          <Rating value={review.rating} size="small" readOnly />
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {review.date}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          {review.text}
                        </Typography>

                        {/* Business Reply */}
                        {review.reply && (
                          <Box
                            sx={{
                              mt: 1.5,
                              ml: 2,
                              pl: 2,
                              borderLeft: '3px solid #d6a64c',
                              backgroundColor: '#fdf8ef',
                              p: 1.5,
                              borderRadius: 1,
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                              <ReplyIcon sx={{ fontSize: 16, color: '#d6a64c' }} />
                              <Typography variant="caption" sx={{ fontWeight: 700, color: '#d6a64c' }}>
                                Firma Yanıtı
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              {review.reply}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Paper>
          </Grid>

          {/* ===== RIGHT SIDEBAR ===== */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* General Info */}
            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#7f1810', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                  Detaylar
                </Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', mb: 1.5 }}>
                  Genel Bilgiler
                </Typography>

                <InfoRow icon={<CategoryIcon />} label="Kategori" value={`${detail.categoryName || ''} / ${business.subCategoryName}`} />
                <InfoRow icon={<LocationOnIcon />} label="Adres" value={business.address} />
                <InfoRow icon={<HomeIcon />} label="Mahalle" value={`${business.neighborhoodName} Mahallesi`} />
                <InfoRow icon={<TwoWheelerIcon />} label="Eve Sipariş" value={business.hasDelivery ? 'Var' : 'Yok'} />
                <InfoRow icon={<CreditCardIcon />} label="Kart Geçerli Mi?" value={business.acceptsCard ? 'Evet' : 'Hayır'} />
                {detail.openingDate && (
                  <InfoRow icon={<CalendarTodayIcon />} label="Açılış Tarihi" value={detail.openingDate} />
                )}
              </Box>
            </Paper>

            {/* Opening Hours */}
            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#458cb9', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                  Açılış / Kapanış Saatleri
                </Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <HoursRow day="Hafta İçi" hours={detail.weekdayHours || `${business.openTime} - ${business.closeTime}`} />
                <HoursRow day="Cumartesi" hours={detail.saturdayHours || `${business.openTime} - ${business.closeTime}`} />
                <HoursRow day="Pazar" hours={detail.sundayHours || `${business.openTime} - ${business.closeTime}`} />
              </Box>
            </Paper>

            {/* Contact Info */}
            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#2d3e50', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                  İletişim Bilgileri
                </Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                {business.phone1 && <InfoRow icon={<PhoneIcon />} label="Telefon" value={business.phone1} isLink={`tel:${business.phone1.replace(/\s/g, '')}`} />}
                {business.phone2 && <InfoRow icon={<PhoneIcon />} label="Telefon 2" value={business.phone2} isLink={`tel:${business.phone2.replace(/\s/g, '')}`} />}
                {business.gsm && <InfoRow icon={<PhoneIcon />} label="GSM" value={business.gsm} isLink={`tel:${business.gsm.replace(/\s/g, '')}`} />}
                {detail.fax && <InfoRow icon={<FaxIcon />} label="Faks" value={detail.fax} />}
                {detail.email && <InfoRow icon={<EmailIcon />} label="E-Posta" value={detail.email} isLink={`mailto:${detail.email}`} />}
                {detail.website && <InfoRow icon={<LanguageIcon />} label="Web Sitesi" value={detail.website} isLink={`http://${detail.website}`} />}

                {/* Social Media */}
                {(detail.instagram || detail.facebook || detail.twitter) && (
                  <>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      {detail.instagram && (
                       <InfoRow color={'#e1306c'} icon={<InstagramIcon />} value={detail.instagram} isLink={`https://instagram.com/${detail.instagram}`} />
                      )}
                      {detail.facebook && (
                        <InfoRow color={'#3b5998'} icon={<FacebookIcon />} value={detail.facebook} isLink={`https://facebook.com/${detail.facebook}`} />
                      )}
                      {detail.twitter && (
                        <InfoRow color={'#1da1f2'} icon={<TwitterIcon />} value={detail.twitter} isLink={`https://twitter.com/${detail.twitter}`} />  
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Paper>

            {/* Send Message Button */}
            <Button
              variant="contained"
              fullWidth
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{
                backgroundColor: '#d6a64c',
                fontWeight: 700,
                py: 1.5,
                borderRadius: 2,
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: '#c4932f' },
              }}
            >
              Firmaya Mesaj Gönder
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: 'rgba(0,0,0,0.95)', borderRadius: 2 },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={gallery[lightboxIndex]}
            alt={`${business.name} fotoğrafı`}
            sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
          {gallery.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2, overflowX: 'auto' }}>
              {gallery.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt=""
                  onClick={() => setLightboxIndex(i)}
                  sx={{
                    width: 70,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: i === lightboxIndex ? '2px solid #d6a64c' : '2px solid transparent',
                    opacity: i === lightboxIndex ? 1 : 0.5,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: 1 },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

/* Helper Components */
function InfoRow({ icon, label, value, isLink, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: color || '#7f8c8d', mt: 0.2 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', lineHeight: 1.2 }}>
          {label}
        </Typography>
        {isLink ? (
          <Typography
            component="a"
            href={isLink}
            target={isLink.startsWith('http') ? '_blank' : undefined}
            rel={isLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            variant="body2"
            sx={{ color: color || '#458cb9', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {value}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: color || '#333', fontWeight: 600 }}>
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function HoursRow({ day, hours }) {
  const isClosed = hours === 'Kapalı';
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
        {day}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: isClosed ? '#933933' : '#458cb9',
        }}
      >
        {hours}
      </Typography>
    </Box>
  );
}
