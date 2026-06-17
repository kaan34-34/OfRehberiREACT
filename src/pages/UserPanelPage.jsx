import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getBusinesses } from '../api/businessService';
import { createUserReview, deleteUserReview, getUserReviews } from '../api/userService';
import { getStoredUser } from '../utils/authStorage';

export default function UserPanelPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ businessId: '', rating: 5, commentText: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async (activeUser) => {
    try {
      const [businessData, reviewData] = await Promise.all([
        getBusinesses(),
        getUserReviews(activeUser.id),
      ]);
      setBusinesses(businessData);
      setReviews(reviewData);
      setForm((current) => ({ ...current, businessId: current.businessId || businessData[0]?.id || '' }));
    } catch (error) {
      setStatus({ severity: 'error', text: `${error.message} Backend çalışıyor mu?` });
    }
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate('/giris');
      return;
    }
    setUser(storedUser);
    loadData(storedUser);
  }, [navigate]);

  const submitReview = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await createUserReview(user.id, form.businessId, {
        userName: user.fullName,
        rating: Number(form.rating),
        commentText: form.commentText,
      });
      setStatus({ severity: 'success', text: 'Yorumunuz kaydedildi.' });
      setForm((current) => ({ ...current, commentText: '', rating: 5 }));
      await loadData(user);
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    setLoading(true);
    setStatus(null);
    try {
      await deleteUserReview(user.id, reviewId);
      setStatus({ severity: 'success', text: 'Yorum silindi.' });
      await loadData(user);
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '80vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2d3e50' }}>
            Kullanıcı Paneli
          </Typography>
          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
            {user.fullName} olarak giriş yaptınız
          </Typography>
        </Box>

        {status && <Alert severity={status.severity} sx={{ mb: 2 }}>{status.text}</Alert>}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Firmaya Yorum Yap
              </Typography>
              <Box component="form" onSubmit={submitReview}>
                <TextField select fullWidth label="Firma" value={form.businessId} onChange={(e) => setForm({ ...form, businessId: e.target.value })} sx={{ mb: 2 }}>
                  {businesses.map((business) => (
                    <MenuItem key={business.id} value={business.id}>{business.name}</MenuItem>
                  ))}
                </TextField>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>Puan</Typography>
                  <Rating value={Number(form.rating)} onChange={(_, value) => setForm({ ...form, rating: value || 1 })} />
                </Box>
                <TextField
                  fullWidth
                  required
                  multiline
                  minRows={4}
                  label="Yorumunuz"
                  value={form.commentText}
                  onChange={(e) => setForm({ ...form, commentText: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" startIcon={<RateReviewIcon />} disabled={loading || !form.businessId} sx={{ backgroundColor: '#7f1810' }}>
                  Yorumu Kaydet
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Yorum Geçmişim
              </Typography>
              {reviews.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Henüz yorumunuz yok.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {reviews.map((review) => (
                    <Paper key={review.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{review.businessName}</Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>{review.reviewDate}</Typography>
                        </Box>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2">{review.commentText}</Typography>
                        {review.adminReply && (
                          <Alert severity="info" sx={{ py: 0.5 }}>
                            Firma yanıtı: {review.adminReply}
                          </Alert>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Button component={Link} to={`/company/${review.businessSlug}`} size="small" startIcon={<VisibilityIcon />}>
                            Firmayı Gör
                          </Button>
                          <Button color="error" size="small" startIcon={<DeleteIcon />} onClick={() => deleteReview(review.id)} disabled={loading}>
                            Sil
                          </Button>
                        </Box>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
