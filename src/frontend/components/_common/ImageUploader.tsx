import { ReactElement, useState, useEffect } from 'react'
import styles from '../../styles/_common/imageUploader'
import { Box, Button, FormHelperText } from '@mui/material'

const ImageUploader = ({
  alt,
  args,
  disabled,
  error,
  required,
  setArgs,
  targetProp
}: {
  alt: string
  args: any
  disabled?: boolean
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

  if (disabled) return

  return (
    <>
      <Button>
        <input type='file' accept='image/*' onChange={uploadImage} />
        {'Upload Photo'}
      </Button>
      {required && error && !args?.[targetProp] && (
        <>
          <FormHelperText sx={styles.formHelperText}>
            {'Photo is required.'}
          </FormHelperText>
        </>
      )}
      {imageUrl && (
        <Box component='img' alt={alt} src={imageUrl} sx={styles.image} />
      )}
    </>
  )
}

export default ImageUploader
