const envConfig = {
  TEST_VAR: import.meta.env.VITE_TEST_VAR,
}

export const config = {
  get TEST_VAR() {
    return getVal('TEST_VAR')
  },
  get MODE() {
    return import.meta.env.MODE
  },
  get BASE_URL() {
    return '/'
  },
}

const getVal = <T = string>(
  key: keyof typeof envConfig,
  transform?: (val: string) => T,
): T | undefined => {
  const val = envConfig[key]
  if (!val) {
    configWarning(key)
    return
  }
  if (transform) return transform(val)
  return val as T
}

const configWarning = (configKey: keyof typeof envConfig) => {
  if (config.MODE !== 'production') {
    console.warn(`Unable to retrieve ${configKey} configuration value`)
  }
}
