import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { getBusinessBySlug } from '../api/businessService';
import { askBusinessQuestion, getBusinessQuestions } from '../api/questionService';
import { isBusinessOpen } from '../utils/businessUtils';
import { getStoredUser } from '../utils/authStorage';

export default function BusinessDetailPage() {
  const { slug } = useParams();
  const [detail, setDetail] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getBusinessBySlug(slug)
      .then(async (data) => {
        if (!active) return;
        setDetail(data);
        const questionData = await getBusinessQuestions(data.business.id);
        if (active) setQuestions(questionData);
      })
      .catch(() => active && setStatus({ severity: 'error', text: 'Firma detayı API üzerinden alınamadı.' }))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!detail?.business) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#7f1810', mb: 2 }}>Firma Bulunamadı</Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />} sx={{ backgroundColor: '#7f1810' }}>
          Anasayfaya Dön
        </Button>
      </Container>
    );
  }

  const business = detail.business;
  const gallery = detail.gallery?.length ? detail.gallery : [business.image];
  const reviews = detail.reviews || [];
  const isOpen = isBusinessOpen(business);
  const statusColor = business.is724 ? '#458cb9' : isOpen ? '#458cb9' : '#933933';
  const statusText = business.is724 ? '7/24 AÇIK' : isOpen ? `AÇIK (${business.closeTime}'a kadar)` : 'KAPALI';

  const submitQuestion = async (event) => {
    event.preventDefault();
    try {
      await askBusinessQuestion(business.id, {
        userName: user?.fullName || 'Misafir Kullanıcı',
        questionText,
      });
      setQuestionText('');
      setStatus({ severity: 'success', text: 'Sorunuz firmaya iletildi.' });
      setQuestions(await getBusinessQuestions(business.id));
    } catch (error) {
      setStatus({ severity: 'error', text: 'Soru gönderilemedi.' });
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', pb: 4 }}>
      <Box sx={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', py: 1.5 }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: '#7f1810', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <HomeIcon sx={{ fontSize: 16 }} /> Anasayfa
            </Link>
            <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>{business.categoryName}</Typography>
            <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{business.name}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {status && <Alert severity={status.severity} sx={{ mb: 2 }}>{status.text}</Alert>}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
              <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => setLightboxOpen(true)}>
                <Box component="img" src={gallery[0]} alt={`${business.name} fotoğrafı`} sx={{ width: '100%', height: { xs: 240, md: 380 }, objectFit: 'cover', display: 'block' }} />
                <Chip label={statusText} sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: statusColor, color: '#fff', fontWeight: 700 }} />
              </Box>
              {gallery.length > 1 && (
                <Box sx={{ display: 'flex', gap: 0.5, p: 1, overflowX: 'auto' }}>
                  {gallery.map((img, i) => (
                    <Box key={img} component="img" src={img} alt={`${business.name} fotoğrafı ${i + 1}`} onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }} sx={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 1, cursor: 'pointer' }} />
                  ))}
                </Box>
              )}
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {business.name}
              </Typography>
              {business.slogan && <Typography variant="body1" sx={{ color: '#888', fontStyle: 'italic', mb: 1.5 }}>{business.slogan}</Typography>}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
                {(business.phone1 || business.gsm) && (
                  <Button variant="contained" startIcon={<PhoneIcon />} href={`tel:${(business.phone1 || business.gsm).replace(/\s/g, '')}`} sx={{ backgroundColor: '#458cb9', fontWeight: 700 }}>
                    ARA
                  </Button>
                )}
                <Button variant="outlined" startIcon={<MapIcon />} sx={{ borderColor: '#d6a64c', color: '#d6a64c', fontWeight: 700 }}>
                  HARİTA
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {business.hasDelivery && <Feature icon={<TwoWheelerIcon />} text="Eve Sipariş Var" />}
                {business.is724 && <Feature icon={<AccessTimeIcon />} text="7/24 Açık" />}
                {business.acceptsCard && <Feature icon={<CreditCardIcon />} text="Kart Geçerli" />}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Rating value={Number(business.rating)} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ color: '#666' }}>{business.rating} / 5 ({business.totalVotes} oy)</Typography>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChatBubbleOutlineIcon sx={{ color: '#7f1810' }} /> YORUMLAR ({reviews.length})
              </Typography>
              {reviews.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#999', py: 2 }}>Henüz yorum yapılmamış.</Typography>
              ) : (
                reviews.map((review, idx) => (
                  <Box key={review.id}>
                    {idx > 0 && <Divider sx={{ my: 2 }} />}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ width: 44, height: 44, backgroundColor: '#458cb9', fontWeight: 700 }}>{review.userName?.charAt(0)}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{review.userName}</Typography>
                          <Rating value={review.rating} size="small" readOnly />
                          <Typography variant="caption" sx={{ color: '#999' }}>{review.reviewDate}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#555' }}>{review.commentText}</Typography>
                        {review.adminReply && (
                          <Box sx={{ mt: 1.5, pl: 2, borderLeft: '3px solid #d6a64c', backgroundColor: '#fdf8ef', p: 1.5, borderRadius: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#d6a64c' }}><ReplyIcon sx={{ fontSize: 16, verticalAlign: 'middle' }} /> Firma Yanıtı</Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>{review.adminReply}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Firmaya Soru Sor</Typography>
              <Box component="form" onSubmit={submitQuestion}>
                <TextField fullWidth required multiline minRows={3} label="Sorunuz" value={questionText} onChange={(e) => setQuestionText(e.target.value)} sx={{ mb: 2 }} />
                <Button type="submit" variant="contained" startIcon={<SendIcon />} sx={{ backgroundColor: '#7f1810' }}>Gönder</Button>
              </Box>
              <Stack spacing={1.5} sx={{ mt: 3 }}>
                {questions.map((question) => (
                  <Box key={question.id} sx={{ borderTop: '1px solid #eee', pt: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{question.userName}</Typography>
                    <Typography variant="body2">{question.questionText}</Typography>
                    {question.answerText && <Alert severity="info" sx={{ mt: 1, py: 0.5 }}>Admin cevabı: {question.answerText}</Alert>}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#7f1810', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>Detaylar</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <InfoRow icon={<CategoryIcon />} label="Kategori" value={`${business.categoryName} / ${business.subCategoryName}`} />
                <InfoRow icon={<LocationOnIcon />} label="Adres" value={business.address} />
                <InfoRow icon={<HomeIcon />} label="Mahalle" value={`${business.neighborhoodName} Mahallesi`} />
                <InfoRow icon={<TwoWheelerIcon />} label="Eve Sipariş" value={business.hasDelivery ? 'Var' : 'Yok'} />
                <InfoRow icon={<CreditCardIcon />} label="Kart Geçerli Mi?" value={business.acceptsCard ? 'Evet' : 'Hayır'} />
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#458cb9', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>Açılış / Kapanış Saatleri</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <InfoRow icon={<AccessTimeIcon />} label="Hafta İçi" value={detail.weekdayHours || `${business.openTime} - ${business.closeTime}`} />
                <InfoRow icon={<AccessTimeIcon />} label="Cumartesi" value={detail.saturdayHours || `${business.openTime} - ${business.closeTime}`} />
                <InfoRow icon={<AccessTimeIcon />} label="Pazar" value={detail.sundayHours || `${business.openTime} - ${business.closeTime}`} />
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: '#2d3e50', px: 2.5, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>İletişim Bilgileri</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                {business.phone1 && <InfoRow icon={<PhoneIcon />} label="Telefon" value={business.phone1} />}
                {business.gsm && <InfoRow icon={<PhoneIcon />} label="GSM" value={business.gsm} />}
                {detail.email && <InfoRow icon={<EmailIcon />} label="E-Posta" value={detail.email} />}
                {detail.website && <InfoRow icon={<LanguageIcon />} label="Web Sitesi" value={detail.website} />}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="lg" fullWidth PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.95)', borderRadius: 2 } }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={() => setLightboxOpen(false)} sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 1 }}>
            <CloseIcon />
          </IconButton>
          <Box component="img" src={gallery[lightboxIndex]} alt={`${business.name} fotoğrafı`} sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
        </Box>
      </Dialog>
    </Box>
  );
}

function Feature({ icon, text }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#458cb9' }}>
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{text}</Typography>
    </Box>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: '#7f8c8d', mt: 0.2 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', lineHeight: 1.2 }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>{value}</Typography>
      </Box>
    </Box>
  );
}
