import { ConfigModule } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Loads and validates a YAML configuration file for the application.
 *
 * @returns A JavaScript object representing the parsed YAML configuration.
 * @throws Will throw an error if the HTTP port in the configuration is not within the valid range of 1024 to 49151.
 * @remarks
 * This function reads the YAML configuration file located at `join(__dirname, YAML_CONFIG_FILENAME)` and parses it using the `js-yaml` library.
 * It then validates the HTTP port in the configuration to ensure it falls within the specified range.
 * If the validation fails, an error is thrown.
 * @example
 * ```typescript
 * const config = loadYamlConfig();
 * console.log(config.http.port); // Output: 3000
 * ```
 */
export default async(): Promise<Record<string, any>> => {

  await ConfigModule.envVariablesLoaded;
  
  const config = yaml.load(
    readFileSync(resolve("./src/config", String(process.env.DEFAULT_YAML_CONFIG)), 'utf8'),
  ) as Record<string, any>;

  if (config.http.port < 1024 || config.http.port > 49151) {
    throw new Error('HTTP port must be between 1024 and 49151');
  }

  return config;
};
