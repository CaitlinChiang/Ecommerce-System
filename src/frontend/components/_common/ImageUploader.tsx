import { ReactElement, useState, useEffect } from 'react'
import styles from '../../styles/_common/imageUploader'
import { Box, Button, FormHelperText } from '@mui/material'

const ImageUploader = ({
  alt,
  args,
  disabled,
  error,
  nestedProp,
  required,
  setArgs,
  targetProp
}: {
  alt: string
  args: any
  disabled?: boolean
  error?: boolean
  nestedProp?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const urlProp = nestedProp ? nestedProp + 'Url' : targetProp + 'Url'
    const val = nestedProp ? args[targetProp]?.[urlProp] : args?.[urlProp]

    if (val) setImageUrl(val)
  }, [args])

  const uploadImage = (event: any) => {
    const image = event.target.files[0]
    if (!image) return

    if (nestedProp) {
      setArgs({
        ...args,
        [targetProp]: { ...args[targetProp], [nestedProp]: image }
      })
    } else {
      setArgs({ ...args, [targetProp]: image })
    }

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
      {required &&
        error &&
        (nestedProp ? !args[targetProp]?.[nestedProp] : !args?.[targetProp]) && (
          <>
            <FormHelperText sx={styles.formHelperText}>
              {targetProp === 'image'
                ? 'Product image is required.'
                : 'Payment proof image is required.'}
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
