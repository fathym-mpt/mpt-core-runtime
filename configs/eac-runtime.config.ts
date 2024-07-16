import { DefaultEaCConfig, defineEaCConfig, EaCRuntime } from '@fathym/eac/runtime';
import MPTCoreRuntimePlugin from '../src/plugins/MPTCoreRuntimePlugin.ts';

export const config = defineEaCConfig({
  Plugins: [...(DefaultEaCConfig.Plugins || []), new MPTCoreRuntimePlugin()],
});

export function configure(_rt: EaCRuntime): Promise<void> {
  return Promise.resolve();
}
