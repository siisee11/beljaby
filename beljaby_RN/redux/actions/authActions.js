export const setFittableToken = ({accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt}) => {
  return {
    type: 'SET_FITTABLE_TOKEN',
    fittable: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenExpiresAt: accessTokenExpiresAt,
      refreshTokenExpiresAt: refreshTokenExpiresAt,
    },
    loginType: 'email',
    error: null,
    loading: false,
    value: true,
  }
}

export const setKakaoToken= ({accessToken, refreshToken}) => {
  return {
    type: 'SET_KAKAO_TOKEN',
    kakao: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    loginType: 'kakao',
    error: null,
    loading: false,
    value: true,
  }
}

export const setNaverToken= ({accessToken, refreshToken}) => {
  return {
    type: 'SET_NAVER_TOKEN',
    naver: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    loginType: 'naver',
    error: null,
    loading: false,
    value: true,
  }
}

export const setAppleToken= ({accessToken, refreshToken}) => {
  return {
    type: 'SET_APPLE_TOKEN',
    apple: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    loginType: 'apple',
    error: null,
    loading: false,
    value: true,
  }
}

export const setDeviceToken = ({deviceToken}) => {
  return {
    type: 'SET_DEVICE_TOKEN',
    deviceToken: deviceToken
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    empty: {
      accessToken: undefined,
      refreshToken: undefined,
    },
    fittableEmpty: {
      accessToken: undefined,
      refreshToken: undefined,
      accessTokenExpiresAt: undefined,
      refreshTokenExpiresAt: undefined,
    },
    loginType: undefined,
    loading: false,
  }
}

export const oauthStart = () => ({
  type: 'OAUTH_START',
  error: null,
  loading: true,
})

export const oauthError = (errorMsg) => ({
  type: 'OAUTH_ERROR',
  error: errorMsg,
  loading: false,
})