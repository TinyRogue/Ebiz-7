import React, { type FC, memo } from 'react'

import { Box, CircularProgress } from '@mui/material'

export const FullLoading: FC = memo(() => {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#88C0D080'
    }}>
      <CircularProgress size={92} thickness={1}/>
    </Box>
  )
})

export default FullLoading
