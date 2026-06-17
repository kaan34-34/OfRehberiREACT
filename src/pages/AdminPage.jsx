import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import {
  answerQuestion as answerQuestionApi,
  createBusiness as createBusinessApi,
  deleteBusiness as deleteBusinessApi,
  deleteReview as deleteReviewApi,
  getAllReviews,
  getWaitingQuestions,
  updateBusiness as updateBusinessApi,
} from '../api/adminService';
import { getBusinessBySlug, getBusinesses, getCategories, getNeighborhoods, getSubCategories, getSubCategoriesByCategory } from '../api/businessService';

const emptyBusiness = {
  id: '',
  name: '',
  slug: '',
  categoryId: 'GRGS',
  subCategoryId: '',
  neighborhoodId: 'M010',
  slogan: '',
  address: '',
  phone1: '',
  gsm: '',
  openNow: true,
  openAllDay: false,
  openTime: '09:00',
  closeTime: '18:00',
  hasDelivery: false,
  acceptsCard: true,
  featured: false,
  imageUrls: [''],
};

const normalizeTime = (value) => (value ? String(value).slice(0, 5) : '09:00');
const toApiTime = (value) => (String(value || '').length === 5 ? `${value}:00` : value);

function toFormBusiness(business, gallery = []) {
  const images = gallery.length > 0 ? gallery : [business.imageUrl || business.image || ''];
  return {
    id: business.id || '',
    name: business.name || '',
    slug: business.slug || '',
    categoryId: business.categoryId || 'GRGS',
    subCategoryId: business.subCategoryId || '',
    neighborhoodId: business.neighborhoodId || 'M010',
    slogan: business.slogan || '',
    address: business.address || '',
    phone1: business.phone1 || '',
    gsm: business.gsm || '',
    openNow: Boolean(business.openNow),
    openAllDay: Boolean(business.openAllDay),
    openTime: normalizeTime(business.openTime),
    closeTime: normalizeTime(business.closeTime),
    hasDelivery: Boolean(business.hasDelivery),
    acceptsCard: Boolean(business.acceptsCard),
    featured: Boolean(business.featured ?? business.isFeatured),
    imageUrls: images.length > 0 ? images : [''],
  };
}

export default function AdminPage() {
  const [tab, setTab] = useState(0);
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [businessForm, setBusinessForm] = useState(emptyBusiness);
  const [editingBusinessId, setEditingBusinessId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedCategory = useMemo(
    () => getSubCategoriesByCategory(subCategories, businessForm.categoryId),
    [subCategories, businessForm.categoryId]
  );
  const selectedSubCategory = selectedCategory[0];

  const loadAdminData = async () => {
    try {
      const [businessData, questionData, reviewData, categoryData, subCategoryData, neighborhoodData] = await Promise.all([
        getBusinesses(),
        getWaitingQuestions(),
        getAllReviews(),
        getCategories(),
        getSubCategories(),
        getNeighborhoods(),
      ]);
      setBusinesses(businessData);
      setQuestions(questionData);
      setReviews(reviewData);
      setCategories(categoryData);
      setSubCategories(subCategoryData);
      setNeighborhoods(neighborhoodData);
    } catch (error) {
      setStatus({ severity: 'error', text: `${error.message} Backend çalışıyor mu?` });
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const updateBusinessForm = (field, value) => {
    setBusinessForm((current) => ({ ...current, [field]: value }));
  };

  const updateCategory = (categoryId) => {
    const firstSubCategory = getSubCategoriesByCategory(subCategories, categoryId)[0];
    setBusinessForm((current) => ({
      ...current,
      categoryId,
      subCategoryId: firstSubCategory?.id || '',
    }));
  };

  const updateImageUrl = (index, value) => {
    setBusinessForm((current) => ({
      ...current,
      imageUrls: current.imageUrls.map((url, itemIndex) => (itemIndex === index ? value : url)),
    }));
  };

  const addImageUrl = () => {
    setBusinessForm((current) => ({ ...current, imageUrls: [...current.imageUrls, ''] }));
  };

  const removeImageUrl = (index) => {
    setBusinessForm((current) => ({
      ...current,
      imageUrls: current.imageUrls.length === 1 ? [''] : current.imageUrls.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleBusinessName = (value) => {
    const slug = value
      .toLocaleLowerCase('tr-TR')
      .replaceAll('ı', 'i')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setBusinessForm((current) => ({
      ...current,
      name: value,
      slug,
      id: current.id || `F${String(Date.now()).slice(-5)}`,
    }));
  };

  const resetBusinessForm = () => {
    setEditingBusinessId(null);
    setBusinessForm(emptyBusiness);
  };

  const startEditBusiness = async (business) => {
    setLoading(true);
    setStatus(null);
    try {
      const detail = await getBusinessBySlug(business.slug);
      setEditingBusinessId(business.id);
      setBusinessForm(toFormBusiness(detail.business, detail.gallery || []));
      setTab(0);
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const saveBusiness = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const imageUrls = businessForm.imageUrls.map((url) => url.trim()).filter(Boolean);
      const payload = {
        ...businessForm,
        subCategoryId: businessForm.subCategoryId || selectedSubCategory?.id,
        openTime: toApiTime(businessForm.openTime),
        closeTime: toApiTime(businessForm.closeTime),
        imageUrl: imageUrls[0] || '',
        imageUrls,
      };

      if (editingBusinessId) {
        await updateBusinessApi(editingBusinessId, payload);
        setStatus({ severity: 'success', text: 'Firma başarıyla güncellendi.' });
      } else {
        await createBusinessApi(payload);
        setStatus({ severity: 'success', text: 'Firma başarıyla eklendi.' });
      }

      resetBusinessForm();
      await loadAdminData();
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteBusiness = async (businessId) => {
    if (!window.confirm('Bu firmayı ve bağlı kayıtlarını silmek istiyor musunuz?')) return;
    setLoading(true);
    setStatus(null);
    try {
      await deleteBusinessApi(businessId);
      setStatus({ severity: 'success', text: 'Firma silindi.' });
      if (editingBusinessId === businessId) resetBusinessForm();
      await loadAdminData();
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Bu yorumu silmek istiyor musunuz?')) return;
    setLoading(true);
    setStatus(null);
    try {
      await deleteReviewApi(reviewId);
      setStatus({ severity: 'success', text: 'Yorum silindi.' });
      await loadAdminData();
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (questionId) => {
    setLoading(true);
    setStatus(null);
    try {
      await answerQuestionApi(questionId, answers[questionId] || '');
      setStatus({ severity: 'success', text: 'Cevap kaydedildi.' });
      setAnswers((current) => ({ ...current, [questionId]: '' }));
      await loadAdminData();
    } catch (error) {
      setStatus({ severity: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '80vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2d3e50', mb: 0.5 }}>
            Admin Paneli
          </Typography>
          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
            Firma yönetimi, yorum moderasyonu ve kullanıcı sorularını cevaplama
          </Typography>
        </Box>

        {status && <Alert severity={status.severity} sx={{ mb: 2 }}>{status.text}</Alert>}

        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: '1px solid #eee', px: 2 }}>
            <Tab icon={<AddBusinessIcon />} iconPosition="start" label={editingBusinessId ? 'Firma Düzenle' : 'Firma Ekle'} />
            <Tab icon={<BusinessIcon />} iconPosition="start" label="Firmalar" />
            <Tab icon={<RateReviewIcon />} iconPosition="start" label="Yorumlar" />
            <Tab icon={<QuestionAnswerIcon />} iconPosition="start" label="Mesaj Cevapla" />
          </Tabs>

          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {tab === 0 && (
              <Box component="form" onSubmit={saveBusiness}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth required label="Firma adı" value={businessForm.name} onChange={(e) => handleBusinessName(e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth required disabled={Boolean(editingBusinessId)} label="Firma ID" value={businessForm.id} onChange={(e) => updateBusinessForm('id', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth required label="Slug" value={businessForm.slug} onChange={(e) => updateBusinessForm('slug', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Kategori" value={businessForm.categoryId} onChange={(e) => updateCategory(e.target.value)}>
                      {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Alt kategori" value={businessForm.subCategoryId || selectedSubCategory?.id || ''} onChange={(e) => updateBusinessForm('subCategoryId', e.target.value)}>
                      {selectedCategory.map((subCategory) => <MenuItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select fullWidth label="Mahalle" value={businessForm.neighborhoodId} onChange={(e) => updateBusinessForm('neighborhoodId', e.target.value)}>
                      {neighborhoods.map((neighborhood) => <MenuItem key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Slogan" value={businessForm.slogan} onChange={(e) => updateBusinessForm('slogan', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Adres" value={businessForm.address} onChange={(e) => updateBusinessForm('address', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Telefon" value={businessForm.phone1} onChange={(e) => updateBusinessForm('phone1', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="GSM" value={businessForm.gsm} onChange={(e) => updateBusinessForm('gsm', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField fullWidth type="time" label="Açılış" value={businessForm.openTime} onChange={(e) => updateBusinessForm('openTime', e.target.value)} InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField fullWidth type="time" label="Kapanış" value={businessForm.closeTime} onChange={(e) => updateBusinessForm('closeTime', e.target.value)} InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2d3e50' }}>Görseller</Typography>
                      {businessForm.imageUrls.map((url, index) => (
                        <Stack key={index} direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                          <TextField fullWidth label={`Görsel URL ${index + 1}`} value={url} onChange={(e) => updateImageUrl(index, e.target.value)} />
                          <Button type="button" variant="outlined" color="error" onClick={() => removeImageUrl(index)} startIcon={<DeleteIcon />}>
                            Sil
                          </Button>
                        </Stack>
                      ))}
                      <Box>
                        <Button type="button" variant="outlined" startIcon={<ImageIcon />} onClick={addImageUrl}>
                          Görsel Ekle
                        </Button>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Kart geçerli" color={businessForm.acceptsCard ? 'secondary' : 'default'} onClick={() => updateBusinessForm('acceptsCard', !businessForm.acceptsCard)} />
                  <Chip label="Eve sipariş" color={businessForm.hasDelivery ? 'secondary' : 'default'} onClick={() => updateBusinessForm('hasDelivery', !businessForm.hasDelivery)} />
                  <Chip label="Öne çıkan" color={businessForm.featured ? 'warning' : 'default'} onClick={() => updateBusinessForm('featured', !businessForm.featured)} />
                  <Chip label="7/24 açık" color={businessForm.openAllDay ? 'secondary' : 'default'} onClick={() => updateBusinessForm('openAllDay', !businessForm.openAllDay)} />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                  <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={loading} sx={{ backgroundColor: '#7f1810' }}>
                    {editingBusinessId ? 'Firmayı Güncelle' : 'Firmayı Kaydet'}
                  </Button>
                  {editingBusinessId && (
                    <Button type="button" variant="outlined" onClick={resetBusinessForm}>
                      Vazgeç
                    </Button>
                  )}
                </Stack>
              </Box>
            )}

            {tab === 1 && (
              <Stack spacing={2}>
                {businesses.map((business) => (
                  <Paper key={business.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { md: 'center' } }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{business.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>{business.categoryName} / {business.subCategoryName} - {business.neighborhoodName}</Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>Puan: {business.rating} - Oy: {business.totalVotes}</Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Düzenle">
                          <IconButton color="primary" onClick={() => startEditBusiness(business)} disabled={loading}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton color="error" onClick={() => deleteBusiness(business.id)} disabled={loading}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}

            {tab === 2 && (
              <Stack spacing={2}>
                {reviews.length === 0 ? (
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>Henüz yorum yok.</Typography>
                ) : (
                  reviews.map((review) => (
                    <Paper key={review.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{review.businessName}</Typography>
                          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>{review.userName} - {new Date(review.reviewDate).toLocaleDateString('tr-TR')} - {review.rating}/5</Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>{review.commentText}</Typography>
                        </Box>
                        <Box>
                          <Tooltip title="Yorumu Sil">
                            <IconButton color="error" onClick={() => deleteReview(review.id)} disabled={loading}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Stack>
                    </Paper>
                  ))
                )}
              </Stack>
            )}

            {tab === 3 && (
              <Stack spacing={2}>
                {questions.length === 0 ? (
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>Cevap bekleyen kullanıcı mesajı yok.</Typography>
                ) : (
                  questions.map((question) => (
                    <Paper key={question.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{question.businessName}</Typography>
                          <Chip size="small" label={new Date(question.askedAt).toLocaleString('tr-TR')} />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>{question.userName}</Typography>
                        <Typography variant="body1">{question.questionText}</Typography>
                        <Divider />
                        <TextField fullWidth multiline minRows={2} label="Admin cevabı" value={answers[question.id] || ''} onChange={(e) => setAnswers((current) => ({ ...current, [question.id]: e.target.value }))} />
                        <Box>
                          <Button variant="contained" startIcon={<SendIcon />} disabled={loading || !answers[question.id]?.trim()} onClick={() => answerQuestion(question.id)} sx={{ backgroundColor: '#d6a64c' }}>
                            Cevabı Gönder
                          </Button>
                        </Box>
                      </Stack>
                    </Paper>
                  ))
                )}
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
