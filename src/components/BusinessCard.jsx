import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CallIcon from '@mui/icons-material/Call';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { businessDetails } from '../data/mockData';
import { isBusinessOpen } from '../utils/businessUtils';

export default function BusinessCard({ business, compact = false }) {
  const [callOpen, setCallOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const {
    id,
    name,
    slug,
    subCategoryName,
    neighborhoodName,
    slogan,
    address,
    phone1,
    phone2,
    gsm,
    is724,
    openTime,
    closeTime,
    hasDelivery,
    acceptsCard,
    rating,
    totalVotes,
    image,
  } = business;

  const isOpen = isBusinessOpen(business);
  const detail = businessDetails[id] || {};

  const statusColor = is724
    ? '#458cb9'
    : isOpen
    ? '#458cb9'
    : '#933933';

  const statusText = is724
    ? 'AÇIK'
    : isOpen
    ? `AÇIK (${closeTime}'a kadar)`
    : 'KAPALI';

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative' }} component={Link} to={`/company/${slug}`}>
        <CardMedia
          component="img"
          height={compact ? 160 : 200}
          image={image}
          alt={`${name} resmi`}
          sx={{ objectFit: 'cover' }}
        />
        {/* Status Badge */}
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
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography
          component={Link}
          to={`/company/${slug}`}
          variant="subtitle1"
          sx={{ fontWeight: 700, color: '#333', mb: 0.3, lineHeight: 1.3, textDecoration: 'none', '&:hover': { color: '#7f1810' } }}
        >
          {name}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: '#7f8c8d', fontWeight: 600, mb: 1 }}
        >
          {subCategoryName} - {neighborhoodName}
        </Typography>

        {slogan && (
          <Typography
            variant="body2"
            sx={{
              color: '#888',
              fontStyle: 'italic',
              mb: 1.5,
              fontSize: '0.8rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {slogan}
          </Typography>
        )}

        {/* Features */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 1.5 }}>
          {hasDelivery && (
            <Tooltip title="Eve Sipariş Var">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#458cb9' }}>
                <TwoWheelerIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                  Eve Sipariş
                </Typography>
              </Box>
            </Tooltip>
          )}
          {is724 && (
            <Tooltip title="7/24 Açık">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#458cb9' }}>
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                  7/24
                </Typography>
              </Box>
            </Tooltip>
          )}
          {acceptsCard && (
            <Tooltip title="Kart Geçerli">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#458cb9' }}>
                <CreditCardIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                  Kart
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ mt: 'auto' }}>
          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Rating value={rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" sx={{ color: '#888' }}>
              ({totalVotes})
            </Typography>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(phone1 || gsm) && (
              <Chip
                icon={<PhoneIcon sx={{ fontSize: 16 }} />}
                label="ARA"
                clickable
                onClick={() => setCallOpen(true)}
                sx={{
                  backgroundColor: isOpen ? '#458cb9' : '#6babd3',
                  color: '#fff',
                  fontWeight: 700,
                  padding: 2,
                  '&:hover': { backgroundColor: '#2d6a8e' },
                  '& .MuiChip-icon': { color: '#fff' },
                }}
              />
            )}
            <Chip
              icon={<MapIcon sx={{ fontSize: 16 }} />}
              label="HARİTA"
              clickable
              onClick={() => setMapOpen(true)}
              sx={{
                backgroundColor: '#d6a64c',
                borderColor: '#d6a64c',
                color: '#fff',
                padding: 2,
                fontWeight: 700,
                '&:hover': { backgroundColor: '#c49540' },
                '& .MuiChip-icon': { color: '#fff' },
              }}
            />
          </Box>
        </Box>
      </CardContent>

      {/* Call Modal */}
      <Dialog
        open={callOpen}
        onClose={() => setCallOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 0 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#333' }}>{name}</Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>Aramak için bir numara seçin</Typography>
          </Box>
          <IconButton size="small" onClick={() => setCallOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <List disablePadding>
            {phone1 && (
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`tel:${phone1.replace(/\s/g, '')}`}
                  sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(69, 140, 185, 0.08)' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CallIcon sx={{ color: '#458cb9' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={phone1}
                    secondary="Sabit Hat"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            {phone2 && (
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`tel:${phone2.replace(/\s/g, '')}`}
                  sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(69, 140, 185, 0.08)' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CallIcon sx={{ color: '#458cb9' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={phone2}
                    secondary="Sabit Hat 2"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            {gsm && (
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`tel:${gsm.replace(/\s/g, '')}`}
                  sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(69, 140, 185, 0.08)' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PhoneAndroidIcon sx={{ color: '#27ae60' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={gsm}
                    secondary="Cep Telefonu"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>

      {/* Map Modal */}
      <Dialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#333' }}>{name}</Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>{address}</Typography>
          </Box>
          <IconButton size="small" onClick={() => setMapOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {detail.googleMapEmbed ? (
            <Box
              component="iframe"
              src={detail.googleMapEmbed}
              sx={{ width: '100%', height: 350, border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${name} harita`}
            />
          ) : (
            <Box
              component="iframe"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ', Of, Trabzon')}&output=embed`}
              sx={{ width: '100%', height: 350, border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${name} harita`}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
