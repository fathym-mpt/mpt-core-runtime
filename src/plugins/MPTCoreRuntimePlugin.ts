import { EaCNPMDistributedFileSystem } from '@fathym/eac';
import { EaCDFSProcessor } from '@fathym/eac';
import {
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
  FathymAzureContainerCheckPlugin,
} from '@fathym/eac/runtime';
import { IoCContainer } from '@fathym/ioc';

export default class MPTCoreRuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: 'MPTCoreRuntimePlugin',
      IoC: new IoCContainer(),
      Plugins: [
        new FathymAzureContainerCheckPlugin(),
      ],
      EaC: {
        Projects: {
          mpt: {
            Details: {
              Name: 'MPT Micro Applications',
              Description: 'The Demo Micro Applications to use.',
              Priority: 100,
            },
            ResolverConfigs: {
              localhost: {
                Hostname: 'localhost',
                Port: config.Server.port || 8000,
              },
              '127.0.0.1': {
                Hostname: '127.0.0.1',
                Port: config.Server.port || 8000,
              },
            },
            ModifierResolvers: {
              keepAlive: {
                Priority: 1000,
              },
            },
            ApplicationResolvers: {
              marketing: {
                PathPattern: '*',
                Priority: 100,
              },
            },
          },
        },
        Applications: {
          marketing: {
            Details: {
              Name: 'Marketing',
              Description: 'Marketing site - Plasmic',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'DFS',
              DFSLookup: '@fathym-mpt/v1-mpt-landing-page',
            } as EaCDFSProcessor,
          },
        },
        DFS: {
          '@fathym-mpt/v1-mpt-landing-page': {
            Type: 'NPM',
            Package: '@fathym-mpt/v1-mpt-landing-page',
            Version: 'latest',
            DefaultFile: 'index.html',
          } as EaCNPMDistributedFileSystem,
        },
      },
    };

    return Promise.resolve(pluginConfig);
  }
}
