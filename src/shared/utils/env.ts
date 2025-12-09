export function getEnv(key: keyof ImportMetaEnv, defaultValue?: string): string {
  const value = import.meta.env[key];

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

export function hasEnv(key: keyof ImportMetaEnv): boolean {
  return import.meta.env[key] !== undefined;
}

export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

export function isProduction(): boolean {
  return import.meta.env.PROD;
}
