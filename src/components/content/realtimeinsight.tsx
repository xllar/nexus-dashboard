'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Select, MenuItem,
  FormControl, InputLabel, Button, CircularProgress, useTheme,
  useMediaQuery, Chip, IconButton, Alert, Snackbar
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import axios from 'axios';

// Simplified types
interface DataPoint {
  date: string;
  value: number;
}

interface GaugeItem {
  label: string;
  value: number;
  color: string;
}

const RealTimeInsights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [timeRange, setTimeRange] = useState('monthly');
  const [sales, setSales] = useState<DataPoint[]>([]);
  const [revenue, setRevenue] = useState<DataPoint[]>([]);
  const [gaugeData, setGaugeData] = useState<GaugeItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generate simulated data
  const generateData = (min: number, max: number): DataPoint[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      date: month,
      value: Math.floor(Math.random() * (max - min)) + min,
    }));
  };
  
  // Generate gauge data
  const generateGaugeData = (): GaugeItem[] => [
    { label: 'Sales Target', value: Math.floor(Math.random() * 40) + 60, color: theme.palette.primary.main },
    { label: 'Revenue Growth', value: Math.floor(Math.random() * 30) + 40, color: theme.palette.secondary.main },
    { label: 'Active Users', value: Math.floor(Math.random() * 25) + 65, color: '#4caf50' }
  ];
  
  // Fetch data from API using useCallback to fix the ESLint warning
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API endpoints
      const salesResponse = await axios.get(`https://api.example.com/sales?timeRange=${timeRange}`);
      const revenueResponse = await axios.get(`https://api.example.com/revenue?timeRange=${timeRange}`);
      const metricsResponse = await axios.get('https://api.example.com/metrics');
      
      // Process data
      setSales(salesResponse.data || generateData(200, 1000));
      setRevenue(revenueResponse.data || generateData(1000, 5000));
      setGaugeData(metricsResponse.data || generateGaugeData());
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Using simulated data.');
      
      // Fallback to simulated data
      setSales(generateData(200, 1000));
      setRevenue(generateData(1000, 5000));
      setGaugeData(generateGaugeData());
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);
  
  // Set up data fetching
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);
  
  // Export data to CSV
  const exportToCSV = () => {
    const salesCSV = sales.map(item => `${item.date},${item.value}`).join('\n');
    const blob = new Blob([`Date,Sales\n${salesCSV}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `sales_data_${timeRange}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        mb: 2
      }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Real-Time Insights
          </Typography>
          <Chip label={`${error ? 'Simulated' : 'Live'} Data`} color={error ? 'warning' : 'success'} size="small" />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: isMobile ? 2 : 0 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          
          <IconButton onClick={exportToCSV} size="small">
            <DownloadIcon />
          </IconButton>
          
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
            onClick={fetchData}
            disabled={loading}
            size="small"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {/* Error notification */}
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="warning">{error}</Alert>
      </Snackbar>

      {/* Last Updated */}
      <Typography variant="body2" color="text.secondary" align="right" sx={{ mb: 2 }}>
        Updated: {lastUpdated.toLocaleTimeString()}
      </Typography>

      {/* Charts */}
      <Grid container spacing={2}>
        {/* Sales Trend */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Sales Trend</Typography>
              <Box sx={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sales} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fill={`${theme.palette.primary.main}40`} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Revenue</Typography>
              <Box sx={{ height: 240 }}>
                <BarChart
                  xAxis={[{ data: revenue.map(d => d.date), scaleType: 'band' }]}
                  series={[{ data: revenue.map(d => d.value), color: theme.palette.secondary.main }]}
                  height={240}
                  width={isMobile ? 280 : 380}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* KPIs */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Key Performance Indicators</Typography>
              <Grid container spacing={2} justifyContent="center">
                {gaugeData.map((item, index) => (
                  <Grid item key={index} xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Box sx={{ 
                      mt: 1, 
                      p: 1, 
                      borderRadius: '50%', 
                      width: 80, 
                      height: 80, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `4px solid ${item.color}`,
                      margin: '0 auto'
                    }}>
                      <Typography variant="h5" sx={{ color: item.color, fontWeight: 'bold' }}>
                        {item.value}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RealTimeInsights;