'use client';

import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, Box, useTheme, Chip, 
  ToggleButtonGroup, ToggleButton, Stack, Divider,
  IconButton, Tooltip, alpha
} from '@mui/material';
import { 
  Line, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid,
  ResponsiveContainer, Legend, Area, ComposedChart, ReferenceLine
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface DataPoint {
  month: string;
  profit: number;
  loss: number;
  balance: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: DataPoint;
  }>;
  label?: string;
}

export default function ProfitLossSummary() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '6m' | '1y'>('6m');
  const [showProfit, setShowProfit] = useState(true);
  const [showLoss, setShowLoss] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  
  const data: DataPoint[] = [
    { month: 'Jan', profit: 4000, loss: 2400, balance: 1600 },
    { month: 'Feb', profit: 3000, loss: 1398, balance: 1602 },
    { month: 'Mar', profit: 2000, loss: 9800, balance: -7800 },
    { month: 'Apr', profit: 2780, loss: 3908, balance: -1128 },
    { month: 'May', profit: 1890, loss: 4800, balance: -2910 },
    { month: 'Jun', profit: 2390, loss: 3800, balance: -1410 },
    { month: 'Jul', profit: 3490, loss: 4300, balance: -810 },
  ];

  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const totalLoss = data.reduce((sum, item) => sum + item.loss, 0);
  const netBalance = totalProfit - totalLoss;
  const profitTrend = data[data.length - 1].profit > data[0].profit ? 'up' : 'down';
  const lossTrend = data[data.length - 1].loss > data[0].loss ? 'up' : 'down';

  const handleTimeRangeChange = (
    _: React.MouseEvent<HTMLElement>,
    newTimeRange: '7d' | '30d' | '6m' | '1y',
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  const toggleSeriesVisibility = (series: 'profit' | 'loss' | 'balance') => {
    if (series === 'profit') setShowProfit(!showProfit);
    if (series === 'loss') setShowLoss(!showLoss);
    if (series === 'balance') setShowBalance(!showBalance);
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, boxShadow: theme.shadows[3] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
          
          {payload.map((entry, index) => (
            <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box component="span" sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: entry.color, display: 'inline-block', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {entry.name}: ${entry.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
          
          {payload.length > 1 && showProfit && showLoss && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight="bold">
                Monthly Balance: ${(payload[0].payload.balance).toLocaleString()}
              </Typography>
            </>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Profit/Loss Summary
              </Typography>
              <Tooltip title="Financial performance metrics based on monthly data">
                <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlinedIcon fontSize="small" /></IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="Download as CSV">
                <IconButton size="small" sx={{ mr: 1 }}><DownloadIcon fontSize="small" /></IconButton>
              </Tooltip>
              <ToggleButtonGroup size="small" value={timeRange} exclusive onChange={handleTimeRangeChange}>
                <ToggleButton value="7d">7D</ToggleButton>
                <ToggleButton value="30d">30D</ToggleButton>
                <ToggleButton value="6m">6M</ToggleButton>
                <ToggleButton value="1y">1Y</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Financial performance overview with detailed trend analysis for the selected period.
          </Typography>
        </Box>

        {/* Summary Metrics */}
        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            {/* Profit */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Total Profit</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color={theme.palette.success.main}>
                  ${totalProfit.toLocaleString()}
                </Typography>
                <Chip size="small" label={profitTrend === 'up' ? '↑ 8.2%' : '↓ 5.4%'} 
                      color={profitTrend === 'up' ? 'success' : 'error'} sx={{ ml: 1, height: 20 }} />
              </Box>
            </Box>
            
            {/* Loss */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Total Loss</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color={theme.palette.error.main}>
                  ${totalLoss.toLocaleString()}
                </Typography>
                <Chip size="small" label={lossTrend === 'up' ? '↑ 12.3%' : '↓ 3.1%'} 
                      color={lossTrend === 'up' ? 'error' : 'success'} sx={{ ml: 1, height: 20 }} />
              </Box>
            </Box>
            
            {/* Balance */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Net Balance</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" 
                            color={netBalance >= 0 ? theme.palette.success.main : theme.palette.error.main}>
                  ${netBalance.toLocaleString()}
                </Typography>
                <TrendingUpIcon sx={{ 
                  ml: 1, 
                  color: netBalance >= 0 ? theme.palette.success.main : theme.palette.error.main,
                  transform: netBalance >= 0 ? 'none' : 'rotate(180deg)'
                }} />
              </Box>
            </Box>
          </Stack>

          {/* Series Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {['profit', 'loss', 'balance'].map((series) => (
              <Tooltip key={series} title={`${series === 'profit' && showProfit || series === 'loss' && showLoss || series === 'balance' && showBalance ? 'Hide' : 'Show'} ${series}`}>
                <Chip
                  icon={(series === 'profit' && showProfit || series === 'loss' && showLoss || series === 'balance' && showBalance) ? 
                        <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  label={series.charAt(0).toUpperCase() + series.slice(1)}
                  onClick={() => toggleSeriesVisibility(series as 'profit' | 'loss' | 'balance')}
                  color={(series === 'profit' && showProfit) ? "success" : (series === 'loss' && showLoss) ? "error" : 
                         (series === 'balance' && showBalance) ? "primary" : "default"}
                  variant={(series === 'profit' && showProfit || series === 'loss' && showLoss || series === 'balance' && showBalance) ? 
                           "filled" : "outlined"}
                  sx={{ mr: series !== 'balance' ? 1 : 0 }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Graph Section */}
        <Box sx={{ px: 3, py: 1 }}>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data}>
              <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary }} />
              <YAxis tick={{ fill: theme.palette.text.secondary }} tickFormatter={(value) => `$${value}`} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={0} stroke={theme.palette.divider} />
              
              {showProfit && <Area type="monotone" dataKey="profit" name="Profit" 
                fill={alpha(theme.palette.success.main, 0.2)} stroke={theme.palette.success.main} strokeWidth={2} />}
              
              {showLoss && <Area type="monotone" dataKey="loss" name="Loss" 
                fill={alpha(theme.palette.error.main, 0.2)} stroke={theme.palette.error.main} strokeWidth={2} />}
              
              {showBalance && <Line type="monotone" dataKey="balance" name="Balance" 
                stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} />}
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, py: 2, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {`The graph shows the profit and loss summary for the last ${timeRange === '7d' ? '7 days' : 
            timeRange === '30d' ? '30 days' : timeRange === '6m' ? '6 months' : 'year'}.
            ${netBalance >= 0 ? 'Overall performance is positive with growing profit margins.' : 
            'Focus areas needed to reduce losses and improve revenue streams.'}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}