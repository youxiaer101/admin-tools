/**
  引用该文件后, 会在window对象上增加一个nc3envs对象.
  该对象包含了预置的所有环境的变量信息, 及匹配当前环境的方法.
 */
window.nc3envs = {
  envs: [
    { 
      name: 'jockdev',
      hosts: [
      ],
      euf: 'https://dev-euf-idp.newegg.org/dev-platform/euf.js?microApp=order-management-p40514',
      baseApiUrl: 'https://apis-gdev.newegg.org', 
      basePortalUrl: 'http://central3-dev.newegg.org',
      basePigeonUrl: 'https://pigeon.newegg.dev',
      isDefault: true
    },
    { 
      name: 'dev',
      hosts: [
        'central3-dev.newegg.org', 
        'cs-order-process-desk.newegg.lt' 
      ],
      euf: 'https://dev-euf-idp.newegg.org/newegg-central/euf.js?microApp=order-management',
      baseApiUrl: 'https://apis-gdev.newegg.org', 
      basePortalUrl: 'http://central3-dev.newegg.org',
      basePigeonUrl: 'https://pigeon.newegg.dev'
    },
    { 
      name: 'staging', 
      hosts: [
        'central3-staging.newegg.org', 
        'cs-order-process-desk.newegg.qt',
      ], 
      euf: 'https://staging-euf-idp.newegg.org/newegg-central/euf.js?microApp=order-management',
      baseApiUrl: 'https://apis-staging.newegg.org', 
      basePortalUrl: 'https://central3-staging.newegg.org',
      basePigeonUrl: 'https://pigeon.newegg.dev',
    },
    { 
      name: 'prd', 
      hosts: [
        'central3.newegg.org', 
        'cs-order-process-desk.newegg.dev',
      ],
      euf: 'https://euf-idp.newegg.org/newegg-central/euf.js?microApp=order-management',
      baseApiUrl: 'https://apis.newegg.org', 
      basePortalUrl: 'https://central3.newegg.org',
      basePigeonUrl: 'https://pigeon.newegg.dev',
    }
  ],
  getCurrentEnv() {
    const host = window.location.host.toLowerCase();
    const env = this.envs.find(c => c.hosts.some(h => h.toLowerCase() === host))
      || this.envs.find(c => c.isDefault) 
      || this.envs[0];
    return env;
  }
}