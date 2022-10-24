import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import ContactInformation from '../../components/websiteTexts/View/contactInformation'

const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Divider sx={{ marginBottom: 4 }} />
      <ContactInformation />
      <Typography sx={{ paddingTop: 3 }}>
        © 2022 All rights reserved by 'Company Name'
      </Typography>
    </Box>
  )
}

export default Footer
