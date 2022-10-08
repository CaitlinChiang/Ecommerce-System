import { ReactElement, useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'

const ImageUploader = ({
  alt,
  args,
  disabled,
  error,
  label,
  nestedProp,
  required,
  setArgs,
  targetProp
}: {
  alt: string
  args: any
  disabled?: boolean
  error?: boolean
  label?: string
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

  const emptyProp = nestedProp
    ? !args[targetProp]?.[nestedProp]
    : !args?.[targetProp]

  return (
    <Box sx={{ marginTop: 2.5 }}>
      <input
        accept='image/*'
        id='select-image'
        onChange={uploadImage}
        style={{ display: 'none' }}
        type='file'
      />
      <label htmlFor='select-image'>
        <Button
          color={'secondary'}
          component={'span'}
          fullWidth
          variant={'contained'}
        >
          {label || `Upload Image ${required && '*'}`}
        </Button>
      </label>
      {required && error && emptyProp && (
        <>
          <Typography variant={'subtitle2'} color={'error'}>
            {targetProp === 'image'
              ? 'Product image is a required field.'
              : 'Payment proof image is a required field.'}
          </Typography>
        </>
      )}
      <Typography sx={{ marginTop: 2 }} variant={'h5'}>
        {'Image Preview:'}
      </Typography>
      <Box sx={{ border: 1, color: '#DDDDDD', height: 220, marginTop: 1 }}>
        {imageUrl && <img src={imageUrl} alt={alt} height={'200px'} />}
      </Box>
    </Box>
  )
}

export default ImageUploader
