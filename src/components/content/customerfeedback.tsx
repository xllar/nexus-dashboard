import React from 'react';
import { Card, Typography, Box, Rating, Avatar, Stack, Divider, Button, Grid } from '@mui/material';
import { Star, StarBorder, ThumbUp, ThumbDown } from '@mui/icons-material';

export default function CustomerFeedback() {
  const feedback = [
    { customer: 'John Doe', rating: 4, comment: 'Great service, will buy again!', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { customer: 'Jane Smith', rating: 5, comment: 'Excellent experience, highly recommend!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { customer: 'Sam Wilson', rating: 3, comment: 'Good product but slow delivery.', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { customer: 'Emily Johnson', rating: 5, comment: 'I love it! Amazing quality.', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { customer: 'Michael Brown', rating: 2, comment: 'Not satisfied, product didn&apos;t meet expectations.', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 4, color: '#4CAF50' }}>
        Customer Feedback
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 6 }}>
        View and manage customer reviews and ratings.
      </Typography>

      <Card sx={{ maxHeight: 150, overflowY: 'auto', padding: 2, borderRadius: 2 }}>
        <Stack spacing={2}>
          {feedback.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 2,
                borderBottom: '1px solid #f0f0f0',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                },
              }}
            >
              <Avatar
                src={item.avatar}
                sx={{
                  width: 50,
                  height: 50,
                  marginRight: 2,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                  {item.customer}
                </Typography>
                <Rating
                  value={item.rating}
                  readOnly
                  sx={{ mb: 1 }}
                  icon={<Star />}
                  emptyIcon={<StarBorder />}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  &quot;{item.comment}&quot;
                </Typography>
              </Box>
              <Grid container direction="column" alignItems="flex-end" spacing={1}>
                <Grid item>
                  {item.rating >= 4 ? (
                    <ThumbUp sx={{ color: '#4CAF50' }} />
                  ) : (
                    <ThumbDown sx={{ color: '#F44336' }} />
                  )}
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#1976D2',
                      borderColor: '#1976D2',
                      textTransform: 'none',
                      '&:hover': { borderColor: '#1565C0' },
                    }}
                  >
                    Respond
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
        <Divider />
      </Card>
    </section>
  );
}