'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useTheme,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Badge,
  ButtonGroup,
  Button,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// TypeScript interfaces
interface SalesDataItem {
  label: string;
  value: number;
  percentage: string;
  change: number;
  color: string;
}

interface ChartDataItem {
  name: string;
  Revenue: number;
  Target: number;
  color: string;
}

export default function  RevenueUpdate(){ 
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  
  // Enhanced sales data with trend indicators
  const salesData: SalesDataItem[] = [
    {
      label: 'Online Sales',
      value: 80000,
      percentage: '65% of total',
      change: 12.3,
      color: theme.palette.primary.main,
    },
    {
      label: 'In-Store Sales',
      value: 44567,
      percentage: '35% of total',
      change: -4.7,
      color: theme.palette.secondary.main,
    },
  ];

  // Enhanced chart data with targets for comparison
  const chartData: ChartDataItem[] = [
    { name: 'Online', Revenue: 80000, Target: 75000, color: theme.palette.primary.main },
    { name: 'In-Store', Revenue: 44567, Target: 50000, color: theme.palette.secondary.main },
  ];

  // Total revenue calculation
  const totalRevenue = salesData.reduce((sum, item) => sum + item.value, 0);
  
  // Update view mode handler
  const handleViewModeChange = (mode: 'weekly' | 'monthly' | 'quarterly') => {
    setViewMode(mode);
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
        borderRadius: 3,
        p: { xs: 2, md: 4 },
        mb: 4,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Header with more information */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Revenue Update
            <Tooltip title="Revenue from all sales channels">
              <IconButton size="small" sx={{ ml: 0.5 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Chip 
            label={`Last updated: ${new Date().toLocaleDateString()}`} 
            size="small" 
            sx={{ ml: { xs: 0, sm: 2 } }}
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ButtonGroup size="small" sx={{ mr: 2 }}>
            <Button 
              variant={viewMode === 'weekly' ? 'contained' : 'outlined'}
              onClick={() => handleViewModeChange('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={viewMode === 'monthly' ? 'contained' : 'outlined'}
              onClick={() => handleViewModeChange('monthly')}
            >
              Monthly
            </Button>
            <Button 
              variant={viewMode === 'quarterly' ? 'contained' : 'outlined'}
              onClick={() => handleViewModeChange('quarterly')}
            >
              Quarterly
            </Button>
          </ButtonGroup>
          <Tooltip title="Refresh data">
            <IconButton size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Summary badge */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            py: 1,
            px: 3,
            borderRadius: 4,
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.light + '20',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mr: { xs: 0, sm: 2 } }}>
            Total {viewMode} Revenue:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            ${totalRevenue.toLocaleString()}
          </Typography>
          <Chip 
            icon={<TrendingUpIcon />}
            label="↑ 8.2% vs last period" 
            color="success" 
            size="small"
            sx={{ ml: { xs: 0, sm: 2 } }}
          />
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              height: { xs: 200, sm: 280 },
              p: 2,
              backgroundColor: theme.palette.grey[50],
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {viewMode} Sales Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height="85%">
              <BarChart 
                data={chartData}
                barGap={8}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.secondary} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke={theme.palette.text.secondary} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <RechartsTooltip 
                  formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name]}
                  cursor={{ fillOpacity: 0.1 }}
                  contentStyle={{
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: 12,
                  }}
                />
                <Bar 
                  dataKey="Revenue" 
                  fill={theme.palette.primary.main} 
                  barSize={40} 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar 
                  dataKey="Target" 
                  fill={theme.palette.grey[300]} 
                  barSize={40} 
                  radius={[4, 4, 0, 0]}
                  opacity={0.7}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue Details */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              height: { xs: 'auto', sm: 280 },
              borderRadius: 2,
              p: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: theme.palette.grey[50],
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {viewMode} Revenue Breakdown
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {salesData.map(({ label, value, percentage, change, color }, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.grey[100]}`,
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: `${color}10`,
                      borderColor: color,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: color,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {label}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {percentage}
                        </Typography>
                        <Badge
                          sx={{ ml: 1 }}
                          badgeContent={
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                color: change >= 0 ? 'success.main' : 'error.main',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                              }}
                            >
                              {change >= 0 ? <TrendingUpIcon fontSize="inherit" /> : <TrendingDownIcon fontSize="inherit" />}
                              {Math.abs(change)}%
                            </Box>
                          }
                        />
                      </Box>
                    }
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: color }}>
                    ${value.toLocaleString()}
                  </Typography>
                </ListItem>
              ))}

              {/* Additional insights or metrics can be added here */}
              <ListItem
                sx={{
                  p: 2,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.grey[100]}`,
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.info.main,
                    color: 'white',
                    mr: 2,
                  }}
                >
                  <TrendingUpIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Projected Growth
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Based on current trends
                    </Typography>
                  }
                />
                <Chip 
                  label="+10.2% next period" 
                  color="info" 
                  variant="outlined"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
