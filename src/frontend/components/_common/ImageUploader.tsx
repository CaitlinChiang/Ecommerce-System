import { ReactElement, useState, useEffect } from 'react'
import { formHelperText, image } from '../../styles/_common/imageUploader'
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
      <Button>
        <input type='file' accept='image/*' onChange={uploadImage} />
        {'Upload Photo'}
      </Button>
      {required && error && !args?.[targetProp] && (
        <>
          <FormHelperText sx={formHelperText}>{'Photo is required.'}</FormHelperText>
        </>
      )}
      {imageUrl && <Box component='img' alt={alt} src={imageUrl} sx={image} />}
    </>
  )
}

export default ImageUploader
