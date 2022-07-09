import { ReactElement, useState, useEffect } from 'react'
import { Box, Button, FormHelperText } from '@mui/material'

const ImageUploader = ({
  alt,
  args,
  error,
  required,
  setArgs,
  targetProp
}: {
  alt: string
  args: any
  error?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const existingUrl = targetProp + 'Url'

    if (args?.[existingUrl]) {
      setImageUrl(args[existingUrl])
    }
  }, [args])

  const uploadImage = (event: any) => {
    const image = event.target.files[0]
    if (!image) return
    setArgs({ ...args, [targetProp]: image })

    const imageUrl = URL.createObjectURL(image)
    setImageUrl(imageUrl)
  }

  return (
    <>
      <Button variant={'contained'}>
        <input type='file' accept='image/*' onChange={uploadImage} />
        {'Upload Product Photo'}
      </Button>
      {required && error && !args?.[targetProp] && (
        <>
          <FormHelperText sx={{ color: 'red' }}>
            {'Product Photo is a required field.'}
          </FormHelperText>
        </>
      )}
      {imageUrl && (
        <Box
          component='img'
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 }
          }}
          alt={alt}
          src={imageUrl}
        />
      )}
    </>
  )
}

export default ImageUploader
