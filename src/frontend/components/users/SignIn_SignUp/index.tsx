import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useMutation } from '@apollo/client'
import { SignInMutation, SignUpMutation } from './mutation'
import { Button, Box, Grid, Typography } from '@mui/material'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { generateAdminUrl } from '../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const SignInUser = ({
  type,
  signUp
}: {
  type: UserType
  signUp: boolean
}): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    phoneNumber: null,
    type
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [signInMutation, signInMutationState] = useMutation(SignInMutation, {
    variables: correctArgs(args),
    onCompleted: (data) => {
      globalAny.setNotification(true, 'You are signed-in!')
      Cookies.set('accessToken', data.sign_in_user)
      router.push(`${generateAdminUrl(type)}/`)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  const [signUpMutation, signUpMutationState] = useMutation(SignUpMutation, {
    variables: correctArgs(args),
    onCompleted: (data) => {
      globalAny.setNotification(true, 'Account successfully created!')
      Cookies.set('accessToken', data.create_user)
      router.push('/')
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Grid container sx={{ height: '100vh', justifyContent: 'center' }}>
      <Grid item sx={{ background: '#ffffff' }} xs={12} sm={12} lg={6}>
        <Box sx={{ position: 'relative' }}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              position: { xs: 'relative', lg: 'absolute' },
              height: { xs: 'auto', lg: '100vh' },
              right: { xs: 'auto', lg: '-50px' },
              margin: '0 auto'
            }}
          >
            <Box
              alt={'background'}
              component={'img'}
              src={
                'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg'
              }
              sx={{ maxWidth: 812 }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} lg={6} alignItems={'center'} display={'flex'}>
        <Grid container spacing={0} display={'flex'} justifyContent={'center'}>
          <Grid item xs={12} lg={9} xl={6}>
            <Box sx={{ p: 4 }}>
              <Typography fontWeight={'700'} variant={'h2'}>
                {'Welcome to EStoree'}
              </Typography>
              {type === UserType.CUSTOMER && (
                <Box display={'flex'} alignItems={'center'}>
                  <Typography
                    color='textSecondary'
                    fontWeight={'400'}
                    sx={{ mr: 1 }}
                    variant='h6'
                  >
                    {signUp ? 'Already have an Account?' : 'New to EStoree?'}
                  </Typography>
                  <NextLink href={`/user/${signUp ? 'sign-in' : 'sign-up'}`}>
                    <Typography
                      fontWeight={'500'}
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'primary.main',
                        cursor: 'pointer'
                      }}
                    >
                      {signUp ? 'Sign In' : 'Create an Account'}
                    </Typography>
                  </NextLink>
                </Box>
              )}
              <Box sx={{ mt: 4 }}>
                {signUp && (
                  <>
                    <Text
                      args={args}
                      error={validateFields}
                      required={true}
                      setArgs={setArgs}
                      targetProp={'firstName'}
                    />
                    <Text
                      args={args}
                      error={validateFields}
                      required={true}
                      setArgs={setArgs}
                      targetProp={'lastName'}
                    />
                    <Text
                      args={args}
                      error={validateFields}
                      required={true}
                      setArgs={setArgs}
                      targetProp={'phoneNumber'}
                    />
                  </>
                )}
                <Text
                  args={args}
                  error={validateFields}
                  required={true}
                  setArgs={setArgs}
                  targetProp={'email'}
                />
                <PasswordField
                  args={args}
                  error={validateFields}
                  required={true}
                  setArgs={setArgs}
                  targetProp={'password'}
                />
                {signUp && (
                  <Button
                    color={'secondary'}
                    disabled={signUpMutationState.loading}
                    fullWidth
                    onClick={(): void => {
                      setValidateFields(true)
                      signUpMutation()
                    }}
                    size={'large'}
                    sx={{ pt: '10px', pb: '10px', marginTop: 3 }}
                    variant={'contained'}
                  >
                    {'Sign Up'}
                  </Button>
                )}
                {!signUp && (
                  <>
                    <Box sx={{ ml: 'auto' }}>
                      <NextLink
                        href={`${generateAdminUrl(type)}/user/forgot-password`}
                      >
                        <Typography
                          fontWeight={'500'}
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            mb: '16px',
                            color: 'primary.main',
                            cursor: 'pointer'
                          }}
                        >
                          {'Forgot Password?'}
                        </Typography>
                      </NextLink>
                    </Box>
                    <Button
                      color={'secondary'}
                      disabled={signInMutationState.loading}
                      fullWidth
                      onClick={(): void => {
                        setValidateFields(true)
                        signInMutation()
                      }}
                      size={'large'}
                      sx={{ pt: '10px', pb: '10px', marginTop: 3 }}
                      variant={'contained'}
                    >
                      {'Sign In'}
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SignInUser
